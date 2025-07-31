import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import * as Papa from 'papaparse';

interface SeaLevelDataPoint {
  year: number;
  quantile5: number;
  quantile50: number;
  quantile95: number;
}

interface AnimatedSeaLevelChartProps {
  scenario: string; // e.g., "tlim1.5win0.25", "tlim3.0win0.25", "tlim5.0win0.25"
}

export default function AnimatedSeaLevelChart({ scenario }: AnimatedSeaLevelChartProps) {
  const [data, setData] = useState<SeaLevelDataPoint[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentYear, setCurrentYear] = useState(2020);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedQuantile, setSelectedQuantile] = useState<'5' | '50' | '95'>('50');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Load and process sea level data
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔍 Loading data for scenario:', scenario);
        const response = await fetch('/data/sea-level-data.csv');
        
        if (!response.ok) {
          console.error('❌ Failed to fetch CSV:', response.status);
          return;
        }
        
        const csvText = await response.text();
        console.log('📄 CSV loaded, length:', csvText.length);
        
        Papa.parse(csvText, {
          header: true,
          complete: (results: any) => {
            console.log('📊 Total CSV rows:', results.data.length);
            console.log('🎯 Sample row:', results.data[0]);
            
            // Filter data for the selected scenario
            const scenarioData = results.data.filter((row: any) => 
              row.scenario === scenario && 
              row.process === 'total' && 
              row.confidence === 'medium'
            );
            
            console.log('🎯 Filtered scenario data:', scenarioData.length, 'rows');
            
            if (scenarioData.length === 0) {
              console.error('❌ No data found for scenario:', scenario);
              return;
            }

            // Find quantile rows
            const quantile5Data = scenarioData.find((row: any) => row.quantile === '5');
            const quantile50Data = scenarioData.find((row: any) => row.quantile === '50');
            const quantile95Data = scenarioData.find((row: any) => row.quantile === '95');

            console.log('📊 Quantile data found:', {
              q5: !!quantile5Data,
              q50: !!quantile50Data, 
              q95: !!quantile95Data
            });

            if (!quantile5Data || !quantile50Data || !quantile95Data) {
              console.error('❌ Missing quantile data');
              return;
            }

            const processedData: SeaLevelDataPoint[] = [];
            
            // Process years from 2020 to 2150 in 10-year steps
            for (let year = 2020; year <= 2150; year += 10) {
              const yearKey = year.toString();
              
              // Check if year column exists and has valid data
              if (quantile5Data[yearKey] !== undefined && 
                  quantile50Data[yearKey] !== undefined && 
                  quantile95Data[yearKey] !== undefined) {
                
                const q5Value = parseFloat(quantile5Data[yearKey]) * 100; // Convert to cm
                const q50Value = parseFloat(quantile50Data[yearKey]) * 100;
                const q95Value = parseFloat(quantile95Data[yearKey]) * 100;
                
                // Validate numeric values
                if (!isNaN(q5Value) && !isNaN(q50Value) && !isNaN(q95Value)) {
                  console.log(`📈 Year ${year}:`, { q5: q5Value, q50: q50Value, q95: q95Value });
                  
                  processedData.push({
                    year,
                    quantile5: q5Value,
                    quantile50: q50Value,
                    quantile95: q95Value,
                  });
                } else {
                  console.warn(`⚠️ Invalid numeric data for year ${year}`);
                }
              } else {
                console.warn(`⚠️ Missing data for year ${year}`);
              }
            }
            
            console.log('✅ Final processed data:', processedData.length, 'points');
            console.log('🎯 Sample processed point:', processedData[0]);
            
            if (processedData.length === 0) {
              console.error('❌ No valid data points processed');
              return;
            }
            
            setData(processedData);
          },
          error: (error: any) => {
            console.error('💥 CSV parsing error:', error);
          }
        });
      } catch (error) {
        console.error('💥 Data loading error:', error);
      }
    };

    loadData();
  }, [scenario]);

  // Animation logic
  const startAnimation = () => {
    if (data.length === 0) return;
    
    setIsPlaying(true);
    setAnimationComplete(false);
    setCurrentYear(2020);
    setCurrentHeight(0);

    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds - much faster
    const endYear = 2150;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate current year
      const year = 2020 + (endYear - 2020) * progress;
      setCurrentYear(Math.round(year));

      // Interpolate height at current year
      const height = interpolateHeight(year);
      setCurrentHeight(height);

      // Draw chart
      drawChart(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        setAnimationComplete(true);
        drawChart(1); // Final state
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Interpolate height for any year
  const interpolateHeight = (year: number): number => {
    if (data.length === 0) return 0;

    // Find surrounding data points
    let beforePoint = data[0];
    let afterPoint = data[data.length - 1];

    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].year <= year && data[i + 1].year >= year) {
        beforePoint = data[i];
        afterPoint = data[i + 1];
        break;
      }
    }

    if (beforePoint.year === afterPoint.year) {
      const key = `quantile${selectedQuantile}` as keyof SeaLevelDataPoint;
      return beforePoint[key] as number;
    }

    // Linear interpolation
    const ratio = (year - beforePoint.year) / (afterPoint.year - beforePoint.year);
    const key = `quantile${selectedQuantile}` as keyof SeaLevelDataPoint;
    return (beforePoint[key] as number) + ratio * ((afterPoint[key] as number) - (beforePoint[key] as number));
  };

  // Draw the chart on canvas
  const drawChart = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('❌ No canvas ref');
      return;
    }
    
    if (data.length === 0) {
      console.warn('⚠️ No data to draw');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('❌ No canvas context');
      return;
    }

    const { width, height } = canvas;
    if (width === 0 || height === 0) {
      console.warn('⚠️ Canvas has zero dimensions');
      return;
    }
    
    ctx.clearRect(0, 0, width, height);

    // Set up chart dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Define scales
    const maxHeight = Math.max(...data.map(d => d.quantile95));
    const yearRange = 2150 - 2020;
    const currentDataYear = 2020 + yearRange * progress;

    // Helper functions
    const xScale = (year: number) => margin.left + ((year - 2020) / yearRange) * chartWidth;
    const yScale = (value: number) => margin.top + chartHeight - (value / maxHeight) * chartHeight;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const value = (maxHeight / 5) * i;
      const y = yScale(value);
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let year = 2020; year <= 2150; year += 20) {
      const x = xScale(year);
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + chartHeight);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();

    // Draw confidence area (animated)
    const filteredData = data.filter(d => d.year <= currentDataYear);
    
    if (filteredData.length > 1) {
      // Create path for confidence area
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'; // Blue with transparency
      ctx.beginPath();
      
      // Top boundary (95th quantile)
      ctx.moveTo(xScale(filteredData[0].year), yScale(filteredData[0].quantile95));
      for (let i = 1; i < filteredData.length; i++) {
        ctx.lineTo(xScale(filteredData[i].year), yScale(filteredData[i].quantile95));
      }
      
      // Bottom boundary (5th quantile) - reverse order
      for (let i = filteredData.length - 1; i >= 0; i--) {
        ctx.lineTo(xScale(filteredData[i].year), yScale(filteredData[i].quantile5));
      }
      
      ctx.closePath();
      ctx.fill();
    }

    // Draw median line (animated)
    if (filteredData.length > 1) {
      ctx.strokeStyle = '#3b82f6'; // Bright blue
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(xScale(filteredData[0].year), yScale(filteredData[0].quantile50));
      for (let i = 1; i < filteredData.length; i++) {
        ctx.lineTo(xScale(filteredData[i].year), yScale(filteredData[i].quantile50));
      }
      ctx.stroke();
    }

    // Draw current year indicator
    if (isPlaying) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const currentX = xScale(currentDataYear);
      ctx.beginPath();
      ctx.moveTo(currentX, margin.top);
      ctx.lineTo(currentX, margin.top + chartHeight);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw labels
    ctx.fillStyle = 'white';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, margin.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Sea-Level Rise (cm)', 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.fillText('Year', margin.left + chartWidth / 2, height - 20);
  };

  // Canvas resize and initial draw effect - Fixed to prevent infinite loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      
      // Set actual canvas size (only if different to prevent infinite loops)
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Set CSS size to match
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        console.log('🎨 Canvas resized to:', canvas.width, 'x', canvas.height);
        
        // Redraw after resize
        if (data.length > 0) {
          drawChart(animationComplete ? 1 : 0);
        }
      }
    };

    // Initial setup with multiple attempts
    const initCanvas = () => {
      setTimeout(resizeCanvas, 50);
      setTimeout(resizeCanvas, 200);
    };
    
    initCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [data.length > 0]); // Only depend on whether we have data, not the data itself

  // Initial draw when data loads - Fixed to prevent continuous redraws
  useEffect(() => {
    if (data.length > 0 && canvasRef.current && !isPlaying) {
      setTimeout(() => {
        console.log('🎨 Initial draw with', data.length, 'data points');
        drawChart(0);
      }, 100);
    }
  }, [data.length > 0]); // Only redraw when data availability changes

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getScenarioTitle = (scenario: string) => {
    switch (scenario) {
      case 'tlim1.5win0.25': return 'Managed Transition (1.5°C)';
      case 'tlim3.0win0.25': return 'Dangerous Warming (3°C)';
      case 'tlim5.0win0.25': return 'Extreme Emissions (5°C)';
      default: return 'Climate Scenario';
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white p-4 md:p-8">
      <div className="flex-shrink-0 mb-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Sea-Level Rise Projection: {getScenarioTitle(scenario)}
        </h2>
        
        {/* Play Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button
            onClick={() => {
              setSelectedQuantile('5');
              startAnimation();
            }}
            disabled={isPlaying || data.length === 0}
            variant={selectedQuantile === '5' ? 'default' : 'outline'}
            size="lg"
            className="text-base px-6 py-3"
          >
            {isPlaying && selectedQuantile === '5' ? 'Playing...' : '▶ Play Low Quantile (5%)'}
          </Button>
          <Button
            onClick={() => {
              setSelectedQuantile('50');
              startAnimation();
            }}
            disabled={isPlaying || data.length === 0}
            variant={selectedQuantile === '50' ? 'default' : 'outline'}
            size="lg"
            className="text-base px-6 py-3"
          >
            {isPlaying && selectedQuantile === '50' ? 'Playing...' : '▶ Play Medium Quantile (50%)'}
          </Button>
          <Button
            onClick={() => {
              setSelectedQuantile('95');
              startAnimation();
            }}
            disabled={isPlaying || data.length === 0}
            variant={selectedQuantile === '95' ? 'default' : 'outline'}
            size="lg"
            className="text-base px-6 py-3"
          >
            {isPlaying && selectedQuantile === '95' ? 'Playing...' : '▶ Play High Quantile (95%)'}
          </Button>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-6">
        {/* Chart Area - Centered */}
        <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-900/50 rounded-lg p-4 border border-blue-500/30" style={{ height: '500px', minHeight: '500px' }}>
            <canvas
              ref={canvasRef}
              className="w-full h-full border border-red-500/20"
              width={800}
              height={400}
            />
          </div>
        </div>

        {/* Data Display - Side panel or below on mobile */}
        <div className="lg:w-80 flex flex-col gap-4">
          {/* Data Readouts */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Current Year
              </div>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-white">
                {currentYear}
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Sea-Level Rise
              </div>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-blue-400">
                {currentHeight.toFixed(1)} cm
              </div>
            </div>
          </div>

          {/* Current Selection */}
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Selected Quantile
            </div>
            <div className="text-lg font-bold text-white">
              {selectedQuantile === '5' ? 'Low (5%)' : 
               selectedQuantile === '50' ? 'Medium (50%)' : 
               'High (95%)'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status info */}
      <div className="text-center mt-4">
        {data.length === 0 ? (
          <div className="text-yellow-400">
            Loading data for scenario: {scenario}...
          </div>
        ) : (
          <div className="text-green-400 text-sm">
            ✅ Loaded {data.length} data points for {getScenarioTitle(scenario)}
          </div>
        )}
      </div>
    </div>
  );
}