import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ThematicSpiderChartProps {
  className?: string;
}

export default function ThematicSpiderChart({ className }: ThematicSpiderChartProps) {
  const [playerChoices, setPlayerChoices] = useState<any[]>([]);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  useEffect(() => {
    // Load selected answer codes from sessionStorage
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    
    console.log('Selected codes from storage:', selectedCodes);
    
    if (selectedCodes.length === 0) {
      console.log('No selected codes found, using fallback data');
      setLoading(false);
      return;
    }

    // Load mapping CSV and spider map data with retry logic
    let retryCount = 0;
    const maxRetries = 3;
    
    const loadDataWithRetry = async () => {
      try {
        const [csvResponse, spiderMapResponse] = await Promise.all([
          fetch('/data/Mapping - Question BPC - Sheet1.csv', {
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache' }
          }),
          fetch('/data/SpiderMap.json', {
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache' }
          })
        ]);
        
        if (!csvResponse.ok || !spiderMapResponse.ok) {
          throw new Error(`HTTP Error: CSV ${csvResponse.status}, SpiderMap ${spiderMapResponse.status}`);
        }
        
        const [csvText, spiderMapData] = await Promise.all([
          csvResponse.text(),
          spiderMapResponse.json()
        ]);
        
        if (!csvText || csvText.length < 100) {
          throw new Error('CSV data appears corrupted');
        }
        
        // Parse CSV with error handling
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('🕷️ CSV parsing warnings:', results.errors);
            }
            
            // Find matching answers for selected codes
            const matchedAnswers = selectedCodes.map((code: string) => 
              results.data.find((row: any) => row.code === code)
            ).filter(Boolean);
            
            console.log('🕷️ Spider chart data loaded:', {
              selectedCodes: selectedCodes.length,
              matchedAnswers: matchedAnswers.length,
              spiderMapKeys: Object.keys(spiderMapData).length
            });
            
            setPlayerChoices(matchedAnswers);
            setSpiderMap(spiderMapData);
            setLoading(false);
          },
          error: (parseError) => {
            throw new Error(`CSV parsing failed: ${parseError.message}`);
          }
        });
        
      } catch (error) {
        console.error(`🕷️ Data load attempt ${retryCount + 1} failed:`, error);
        
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`🔄 Retrying spider chart data load in ${retryCount * 1000}ms...`);
          setTimeout(loadDataWithRetry, retryCount * 1000);
        } else {
          console.error('🕷️ All data load attempts failed for spider chart');
          setLoading(false);
        }
      }
    };
    
    loadDataWithRetry();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner message="Loading your thematic impact..." />
      </div>
    );
  }

  console.log('Rendering spider chart - playerChoices:', playerChoices.length, 'spiderMap:', !!spiderMap);

  if (playerChoices.length === 0 || !spiderMap) {
    console.log('Using fallback chart data');
    // Provide fallback data showing a balanced Pacific 2050 scenario
    const fallbackData = {
      labels: [
        "Political Leadership",
        "People Development", 
        "Peace & Security",
        "Economic Development",
        "Climate & Disasters",
        "Ocean & Environment",
        "Technology"
      ],
      datasets: [
        {
          label: 'Blue Pacific 2050 Progress',
          data: [2.5, 2.8, 2.2, 2.6, 3.0, 2.4, 2.1],
          backgroundColor: 'rgba(53, 197, 242, 0.2)',
          borderColor: '#35c5f2',
          borderWidth: 2,
          pointBackgroundColor: '#35c5f2',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };

    const fallbackOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest' as const,
        intersect: false,
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 3,
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            font: {
              size: 12,
              family: 'inherit'
            },
            color: '#ffffff'
          },
          ticks: {
            stepSize: 1,
            callback: function(value: any) {
              if (value === 1) return 'LOW';
              if (value === 2) return 'MED';
              if (value === 3) return 'HIGH';
              return '';
            },
            color: '#e5e7eb',
            backdropColor: 'transparent',
            font: {
              size: 10
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    };

    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-[500px] mx-auto relative z-20 bg-black/20 rounded-lg p-4">
          <Radar data={fallbackData} options={fallbackOptions} />
        </div>
        <div className="mt-8 p-6 bg-black/40 rounded-lg border border-white/20 text-center">
          <p className="text-white/80">
            This chart visualizes progress across key themes of the Blue Pacific 2050 strategy.
          </p>
        </div>
      </div>
    );
  }

  // Calculate theme counts from player choices
  const themeCounts: Record<string, number> = {};
  
  console.log('🕷️ Processing player choices for spider chart:', playerChoices.length);
  
  playerChoices.forEach((choice, index) => {
    const theme = choice.theme;
    console.log(`🕷️ Choice ${index + 1}:`, {
      code: choice.code,
      theme: theme,
      answer: choice.answer?.substring(0, 50) + '...'
    });
    
    if (theme) {
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    }
  });

  console.log('🕷️ Theme counts calculated:', themeCounts);

  // Map CSV themes to chart labels
  const themeMapping: Record<string, string> = {
    "Political Leadership and Regionalism": "Political Leadership",
    "People Centered Development": "People Development", 
    "Peace and Security": "Peace & Security",
    "Resource and Economic Development": "Economic Development",
    "Climate Change and Disasters": "Climate & Disasters",
    "Ocean and Environment": "Ocean & Environment",
    "Technology and Connectivity": "Technology"
  };

  const themeLabels = [
    "Political Leadership",
    "People Development", 
    "Peace & Security",
    "Economic Development",
    "Climate & Disasters",
    "Ocean & Environment",
    "Technology"
  ];

  // Helper function to map scores to level (0-1=LOW, 2=MEDIUM, 3+=HIGH)
  const getLevel = (score: number): string => {
    if (score >= 3) return 'HIGH';
    if (score === 2) return 'MEDIUM';
    return 'LOW';
  };

  // Convert theme counts to chart data using mapping and cap at 3
  const chartData = themeLabels.map(shortLabel => {
    // Find the full theme name that maps to this short label
    const fullThemeName = Object.keys(themeMapping).find(
      fullName => themeMapping[fullName] === shortLabel
    );
    
    const count = fullThemeName ? (themeCounts[fullThemeName] || 0) : 0;
    const cappedCount = Math.min(count, 3); // Cap at 3 for chart display
    console.log(`🕷️ ${shortLabel} -> ${fullThemeName} = ${count} (capped: ${cappedCount})`);
    return cappedCount;
  });

  console.log('🕷️ Final chart data:', chartData);

  const data = {
    labels: themeLabels,
    datasets: [
      {
        label: 'Your Pacific Impact',
        data: chartData,
        backgroundColor: 'rgba(53, 197, 242, 0.2)',
        borderColor: '#35c5f2',
        borderWidth: 2,
        pointBackgroundColor: '#35c5f2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onHover: (event: any, chartElements: any) => {
      if (chartElements && chartElements.length > 0) {
        const index = chartElements[0].index;
        const theme = themeLabels[index];
        console.log('🕷️ Setting hovered theme:', theme);
        setHoveredTheme(theme);
      } else {
        setHoveredTheme(null);
      }
    },
    onClick: (event: any, chartElements: any) => {
      // Add click support for mobile/touch devices
      if (chartElements && chartElements.length > 0) {
        const index = chartElements[0].index;
        const theme = themeLabels[index];
        setHoveredTheme(theme);
      }
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 3,
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12,
            family: '"Inter", system-ui, sans-serif'
          },
          color: '#ffffff'
        },
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            if (value === 1) return 'LOW';
            if (value === 2) return 'MED';
            if (value === 3) return 'HIGH';
            return '';
          },
          color: '#e5e7eb',
          backdropColor: 'transparent',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className={`relative ${className} font-inter`}>
        <div className="w-full h-[400px] sm:h-[500px] mx-auto relative z-20">
          <Radar data={data} options={options} />
        </div>
      
      {/* Hover Info Box */}
      <div className="mt-6 p-4 sm:p-6 bg-black/40 rounded-lg border border-white/20 text-center min-h-[120px] flex flex-col justify-center font-inter">
        {hoveredTheme ? (
          <>
             {(() => {
               // Find the full theme name for this short label
               const fullThemeName = Object.keys(themeMapping).find(
                 fullName => themeMapping[fullName] === hoveredTheme
               );
               const rawCount = fullThemeName ? (themeCounts[fullThemeName] || 0) : 0;
               const level = getLevel(rawCount);
               
               console.log(`🕷️ Hover: ${hoveredTheme} -> ${fullThemeName} -> ${level} (${rawCount} choices)`);
               console.log(`🕷️ SpiderMap lookup:`, spiderMap[fullThemeName]?.[level]);
               
               return (
                 <>
                   <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 font-inter">
                     {hoveredTheme} ({level} Impact - {rawCount} choices)
                   </h3>
                   <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-inter">
                     {fullThemeName && spiderMap[fullThemeName] && spiderMap[fullThemeName][level]
                       ? spiderMap[fullThemeName][level]
                       : 'This theme represents progress toward achieving the Blue Pacific 2050 vision.'}
                   </p>
                 </>
               );
             })()}
          </>
        ) : (
          <p className="text-sm sm:text-base text-gray-300 font-inter">
            Hover over a theme in the chart to see your detailed impact.
          </p>
        )}
      </div>

      </div>
    </ErrorBoundary>
  );
}