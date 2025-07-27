import { useEffect, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

interface ThematicSpiderChartProps {
  className?: string;
}

export default function ThematicSpiderChart({ className }: ThematicSpiderChartProps) {
  const [playerChoices, setPlayerChoices] = useState<any[]>([]);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const getLevelColor = (level: string): string => {
    if (level === 'LOW') return 'border-red-500 bg-red-500/10 text-red-300';
    if (level === 'MED') return 'border-yellow-500 bg-yellow-500/10 text-yellow-300';
    return 'border-green-500 bg-green-500/10 text-green-300';
  };

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
      <div className={`${className} font-inter space-y-8`}>
        {/* Chart Container */}
        <div className="w-full h-[600px] max-w-7xl mx-auto">
          <Radar 
            data={data} 
            options={options}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Static Theme Cards */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Your Blue Pacific 2050 Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(themeMapping).map(([fullTheme, shortTheme]) => {
              const count = themeCounts[fullTheme] || 0;
              const level = getLevel(count);
              const colorClass = getLevelColor(level);
              const description = spiderMap?.[fullTheme]?.[level] || 'Progress toward Blue Pacific 2050 vision';
              
              return (
                <div 
                  key={fullTheme}
                  className={`p-4 rounded-lg border-2 ${colorClass} backdrop-blur-sm`}
                >
                  <h4 className="font-bold text-lg mb-2">
                    {shortTheme}
                  </h4>
                  <div className="text-sm opacity-90 mb-3">
                    {description}
                  </div>
                  <div className="text-xs font-bold">
                    {level} Impact • {count} choices
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}