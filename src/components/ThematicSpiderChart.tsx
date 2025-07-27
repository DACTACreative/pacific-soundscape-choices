import { useEffect, useState, useRef, useCallback } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

// Register Chart.js components - NO TOOLTIP
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

interface ThematicSpiderChartProps {
  className?: string;
}

export default function ThematicSpiderChart({ className }: ThematicSpiderChartProps) {
  const [playerChoices, setPlayerChoices] = useState<any[]>([]);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const chartRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Theme mapping
  const themeMapping: { [key: string]: string } = {
    'Political Leadership and Regionalism': 'Political Leadership',
    'People Centered Development': 'People Development', 
    'Peace and Security': 'Peace & Security',
    'Resource and Economic Development': 'Economic Development',
    'Climate Change and Disasters': 'Climate & Disasters',
    'Ocean and Environment': 'Ocean & Environment',
    'Technology and Connectivity': 'Technology'
  };

  const getLevel = (score: number): string => {
    if (score <= 1) return 'LOW';
    if (score === 2) return 'MED';
    return 'HIGH';
  };

  // Load data
  useEffect(() => {
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    console.log('🕷️ Loading spider chart data for codes:', selectedCodes);
    console.log('🕷️ Selected codes length:', selectedCodes.length);
    
    if (selectedCodes.length === 0) {
      console.log('❌ No selected codes, using fallback');
      setLoading(false);
      return;
    }

    const loadDataWithRetry = async () => {
      try {
        const [csvResponse, spiderMapResponse] = await Promise.all([
          fetch('/data/Mapping - Question BPC - Sheet1.csv'),
          fetch('/data/SpiderMap.json')
        ]);

        const csvText = await csvResponse.text();
        const spiderMapData = await spiderMapResponse.json();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            console.log('📊 CSV parsed, rows:', results.data.length);
            
            const matchedAnswers = results.data.filter((row: any) => 
              selectedCodes.includes(row.Code?.trim())
            );
            
            console.log('✅ Matched answers:', matchedAnswers.length);
            
            setPlayerChoices(matchedAnswers);
            setSpiderMap(spiderMapData);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('❌ Error loading data:', error);
        setLoading(false);
      }
    };

    loadDataWithRetry();
  }, []);

  // Calculate theme counts
  const themeCounts = playerChoices.reduce((acc, choice) => {
    const theme = choice.Theme?.trim();
    if (theme) {
      acc[theme] = (acc[theme] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  console.log('🕷️ Theme counts:', themeCounts);
  console.log('🕷️ Player choices length:', playerChoices.length);

  // Prepare chart data
  const themeLabels = Object.values(themeMapping);
  const chartData = themeLabels.map(shortLabel => {
    const fullTheme = Object.keys(themeMapping).find(key => themeMapping[key] === shortLabel);
    const count = fullTheme ? (themeCounts[fullTheme] || 0) : 0;
    console.log(`🕷️ ${shortLabel} -> ${fullTheme} = ${count}`);
    return Math.min(count, 3); // Cap at 3
  });

  console.log('🕷️ Final chart data:', chartData);

  const data = {
    labels: themeLabels,
    datasets: [{
      label: 'Your Impact',
      data: chartData,
      backgroundColor: 'rgba(53, 197, 242, 0.2)',
      borderColor: '#35c5f2',
      borderWidth: 3,
      pointBackgroundColor: '#35c5f2',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 3,
      pointRadius: 8,
      pointHoverRadius: 12,
    }]
  };

  // SIMPLE MOUSE TRACKING APPROACH
  const handleCanvasMouseMove = useCallback((event: MouseEvent) => {
    if (!chartRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Get chart instance
    const chart = chartRef.current;
    if (!chart) return;

    // Get elements at this position
    const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    
    console.log('🎯 Mouse move - elements found:', elements.length);
    
    if (elements.length > 0) {
      const element = elements[0];
      const index = element.index;
      const theme = themeLabels[index];
      console.log('✅ Found theme:', theme, 'at index:', index);
      setHoveredTheme(theme);
    } else {
      setHoveredTheme(null);
    }
  }, [themeLabels]);

  const handleCanvasMouseLeave = useCallback(() => {
    console.log('🎯 Mouse left canvas');
    setHoveredTheme(null);
  }, []);

  // Setup canvas event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseleave', handleCanvasMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('mouseleave', handleCanvasMouseLeave);
    };
  }, [handleCanvasMouseMove, handleCanvasMouseLeave]);

  // Get canvas ref after chart renders
  useEffect(() => {
    if (chartRef.current) {
      canvasRef.current = chartRef.current.canvas;
      console.log('📊 Canvas ref set:', !!canvasRef.current);
    }
  }, [loading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false } // Disable all Chart.js tooltips
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            if (value === 1) return 'LOW';
            if (value === 2) return 'MED';
            if (value === 3) return 'HIGH';
            return '';
          },
          color: '#ffffff',
          backdropColor: 'transparent',
          font: { size: 16, weight: 700 }
        },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
        pointLabels: {
          color: '#ffffff',
          font: { size: 14, weight: 600 }
        }
      }
    },
    elements: {
      point: {
        radius: 8,
        borderWidth: 3,
        backgroundColor: '#35c5f2',
        borderColor: '#ffffff'
      }
    }
  };

  if (loading) {
    console.log('🕷️ Still loading...');
    return <LoadingSpinner />;
  }

  if (playerChoices.length === 0) {
    console.log('🕷️ No player choices - showing fallback');
    // Show fallback chart with sample data
    const fallbackData = {
      labels: themeLabels,
      datasets: [{
        label: 'Balanced Blue Pacific 2050',
        data: [2, 2, 2, 2, 2, 2, 2], // Balanced scenario
        backgroundColor: 'rgba(53, 197, 242, 0.2)',
        borderColor: '#35c5f2',
        borderWidth: 3,
        pointBackgroundColor: '#35c5f2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
      }]
    };

    return (
      <ErrorBoundary>
        <div className={`relative ${className} font-inter`}>
          <div className="w-full h-[600px] max-w-7xl mx-auto relative">
            <Radar data={fallbackData} options={options} style={{ width: '100%', height: '100%' }} />
            <div className="absolute top-4 left-4 bg-red-500/80 text-white p-2 rounded text-xs z-20">
              No Data - Showing Fallback
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`relative ${className} font-inter`}>
        {/* Chart Container */}
        <div className="w-full h-[600px] max-w-7xl mx-auto relative">
          <Radar 
            ref={chartRef}
            data={data} 
            options={options}
            style={{ width: '100%', height: '100%' }}
          />
          
          {/* Debug Info */}
          <div className="absolute top-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-20">
            Hover: {hoveredTheme || 'None'}
          </div>
        </div>
        
        {/* Info Box */}
        {hoveredTheme && (
          <div className="fixed top-1/2 right-8 w-96 transform -translate-y-1/2 z-50 pointer-events-none">
            <div className="bg-black/90 backdrop-blur-lg shadow-2xl p-8 rounded-2xl border-2 border-blue-500/30">
              <h3 className="text-4xl font-bold text-white mb-3">
                {hoveredTheme}
              </h3>
              <p className="text-xl text-white/95 leading-relaxed mb-6">
                {(() => {
                  const fullThemeName = Object.keys(themeMapping).find(fullName => themeMapping[fullName] === hoveredTheme);
                  const rawCount = fullThemeName ? themeCounts[fullThemeName] || 0 : 0;
                  const level = getLevel(rawCount);
                  return fullThemeName && spiderMap?.[fullThemeName]?.[level] 
                    ? spiderMap[fullThemeName][level] 
                    : 'This theme represents progress toward achieving the Blue Pacific 2050 vision.';
                })()}
              </p>
              <div className="text-xl text-blue-300 font-bold">
                {(() => {
                  const fullThemeName = Object.keys(themeMapping).find(fullName => themeMapping[fullName] === hoveredTheme);
                  const rawCount = fullThemeName ? themeCounts[fullThemeName] || 0 : 0;
                  const level = getLevel(rawCount);
                  return `${level} Impact • ${rawCount} choices`;
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}