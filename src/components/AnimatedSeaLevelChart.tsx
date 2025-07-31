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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Load and process sea level data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/sea-level-data.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results: any) => {
            // Filter data for the selected scenario
            const scenarioData = results.data.filter((row: any) => 
              row.scenario === scenario && row.process === 'total' && row.confidence === 'medium'
            );

            // Group by quantile and process years
            const quantile5Data = scenarioData.find((row: any) => row.quantile === '5');
            const quantile50Data = scenarioData.find((row: any) => row.quantile === '50');
            const quantile95Data = scenarioData.find((row: any) => row.quantile === '95');

            if (quantile5Data && quantile50Data && quantile95Data) {
              const processedData: SeaLevelDataPoint[] = [];
              
              // Extract years from 2020 to 2150
              for (let year = 2020; year <= 2150; year += 10) {
                const yearKey = year.toString();
                if (quantile5Data[yearKey] !== undefined) {
                  processedData.push({
                    year,
                    quantile5: parseFloat(quantile5Data[yearKey]) * 100, // Convert to cm
                    quantile50: parseFloat(quantile50Data[yearKey]) * 100,
                    quantile95: parseFloat(quantile95Data[yearKey]) * 100,
                  });
                }
              }
              
              setData(processedData);
            }
          }
        });
      } catch (error) {
        console.error('Failed to load sea level data:', error);
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
    const duration = 12000; // 12 seconds
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
      return beforePoint.quantile50;
    }

    // Linear interpolation
    const ratio = (year - beforePoint.year) / (afterPoint.year - beforePoint.year);
    return beforePoint.quantile50 + ratio * (afterPoint.quantile50 - beforePoint.quantile50);
  };

  // Draw the chart on canvas
  const drawChart = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
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

  // Canvas resize effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      
      if (animationComplete) {
        drawChart(1);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [data, animationComplete]);

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
    <div className="w-full h-screen flex flex-col bg-black text-white p-8">
      <div className="flex-shrink-0 mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Sea-Level Rise Projection: {getScenarioTitle(scenario)}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl">
          This animated chart shows projected sea-level rise from 2020 to 2150. The blue area represents the range of uncertainty, while the line shows the most likely outcome.
        </p>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row gap-8">
        {/* Chart Area */}
        <div className="flex-grow relative bg-gray-900/50 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ maxHeight: '600px' }}
          />
        </div>

        {/* Controls and Data Display */}
        <div className="lg:w-80 flex flex-col gap-6">
          {/* Play Button */}
          <div className="text-center">
            <Button
              onClick={startAnimation}
              disabled={isPlaying || data.length === 0}
              variant="pacific"
              size="pacific"
              className="text-lg px-8 py-4"
            >
              {isPlaying ? 'Playing...' : '▶ Play 2020-2150 Projection'}
            </Button>
          </div>

          {/* Data Readouts */}
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                Current Year
              </div>
              <div className="text-4xl font-mono font-bold text-white">
                {currentYear}
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                Sea-Level Rise
              </div>
              <div className="text-4xl font-mono font-bold text-blue-400">
                {currentHeight.toFixed(1)} cm
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Legend</h3>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-300">Median Projection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-600/30 rounded"></div>
              <span className="text-sm text-gray-300">Confidence Range (5-95%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}