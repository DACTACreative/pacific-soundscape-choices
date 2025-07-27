import { useEffect, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Register Chart.js components - REMOVED Tooltip to prevent conflicts
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

interface ThematicSpiderChartProps {
  className?: string;
}
export default function ThematicSpiderChart({
  className
}: ThematicSpiderChartProps) {
  const [playerChoices, setPlayerChoices] = useState<any[]>([]);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        const [csvResponse, spiderMapResponse] = await Promise.all([fetch('/data/Mapping - Question BPC - Sheet1.csv', {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache'
          }
        }), fetch('/data/SpiderMap.json', {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })]);
        if (!csvResponse.ok || !spiderMapResponse.ok) {
          throw new Error(`HTTP Error: CSV ${csvResponse.status}, SpiderMap ${spiderMapResponse.status}`);
        }
        const [csvText, spiderMapData] = await Promise.all([csvResponse.text(), spiderMapResponse.json()]);
        if (!csvText || csvText.length < 100) {
          throw new Error('CSV data appears corrupted');
        }

        // Parse CSV with error handling
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            if (results.errors.length > 0) {
              console.warn('🕷️ CSV parsing warnings:', results.errors);
            }

            // Find matching answers for selected codes
            const matchedAnswers = selectedCodes.map((code: string) => results.data.find((row: any) => row.code === code)).filter(Boolean);
            console.log('🕷️ Spider chart data loaded:', {
              selectedCodes: selectedCodes.length,
              matchedAnswers: matchedAnswers.length,
              spiderMapKeys: Object.keys(spiderMapData).length
            });
            setPlayerChoices(matchedAnswers);
            setSpiderMap(spiderMapData);
            setLoading(false);
          },
          error: parseError => {
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
    return <div className="flex items-center justify-center h-64">
        <LoadingSpinner message="Loading your thematic impact..." />
      </div>;
  }
  console.log('Rendering spider chart - playerChoices:', playerChoices.length, 'spiderMap:', !!spiderMap);
  if (playerChoices.length === 0 || !spiderMap) {
    console.log('Using fallback chart data');
    // Provide fallback data showing a balanced Pacific 2050 scenario
    const fallbackData = {
      labels: ["Political Leadership", "People Development", "Peace & Security", "Economic Development", "Climate & Disasters", "Ocean & Environment", "Technology"],
      datasets: [{
        label: 'Blue Pacific 2050 Progress',
        data: [2.5, 2.8, 2.2, 2.6, 3.0, 2.4, 2.1],
        backgroundColor: 'rgba(53, 197, 242, 0.2)',
        borderColor: '#35c5f2',
        borderWidth: 2,
        pointBackgroundColor: '#35c5f2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
    const fallbackOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'nearest' as const,
        intersect: false
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
            callback: function (value: any) {
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
    return <div className={`relative ${className}`}>
        <div className="w-full h-[500px] mx-auto relative z-20 bg-black/20 rounded-lg p-4">
          <Radar data={fallbackData} options={fallbackOptions} />
        </div>
        <div className="mt-8 p-6 bg-black/40 rounded-lg border border-white/20 text-center">
          <p className="text-white/80">
            This chart visualizes progress across key themes of the Blue Pacific 2050 strategy.
          </p>
        </div>
      </div>;
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
  const themeLabels = ["Political Leadership", "People Development", "Peace & Security", "Economic Development", "Climate & Disasters", "Ocean & Environment", "Technology"];

  // Helper function to map scores to level (0-1=LOW, 2=MEDIUM, 3+=HIGH)
  const getLevel = (score: number): string => {
    if (score >= 3) return 'HIGH';
    if (score === 2) return 'MEDIUM';
    return 'LOW';
  };

  // Convert theme counts to chart data using mapping and scale to 6-point system
  const chartData = themeLabels.map(shortLabel => {
    // Find the full theme name that maps to this short label
    const fullThemeName = Object.keys(themeMapping).find(fullName => themeMapping[fullName] === shortLabel);
    const count = fullThemeName ? themeCounts[fullThemeName] || 0 : 0;
    // Scale to 6-point system: 0-1=2, 2=4, 3+=6
    const scaledCount = count === 0 ? 0 : count === 1 ? 2 : count === 2 ? 4 : 6;
    console.log(`🕷️ ${shortLabel} -> ${fullThemeName} = ${count} (scaled: ${scaledCount})`);
    return scaledCount;
  });
  console.log('🕷️ Final chart data:', chartData);
  const data = {
    labels: themeLabels,
    datasets: [{
      label: 'Your Pacific Impact',
      data: chartData,
      fill: true,
      backgroundColor: 'rgba(53, 197, 242, 0.2)',
      borderColor: '#35c5f2',
      borderWidth: 2,
      pointBackgroundColor: '#35c5f2',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#35c5f2',
      pointRadius: 10,
      pointHoverRadius: 14,
      pointStyle: 'circle',
      pointBorderWidth: 3
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 6,
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
          lineWidth: 3
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)',
          lineWidth: 2
        },
        pointLabels: {
          font: {
            size: 20,
            family: '"Inter", system-ui, sans-serif',
            weight: 700
          },
          color: '#ffffff',
          padding: 35
        },
        ticks: {
          stepSize: 0.5,
          beginAtZero: true,
          max: 6,
          display: true,
          callback: function (value: any) {
            if (value === 2) return 'LOW';
            if (value === 4) return 'MED';
            if (value === 6) return 'HIGH';
            return '';
          },
          color: 'rgba(255, 255, 255, 0.8)',
          backdropColor: 'rgba(0, 0, 0, 0.6)',
          backdropPadding: 4,
          font: {
            size: 18,
            weight: 700,
            family: '"Inter", system-ui, sans-serif'
          },
          padding: 20
        }
      }
    },
  };
  // Get badge variant based on impact level
  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'HIGH': return 'default';
      case 'MEDIUM': return 'secondary';
      case 'LOW': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <ErrorBoundary>
      <div className={`relative ${className} space-y-8`}>
        {/* Chart Container */}
        <div className="w-full h-[700px] mx-auto relative bg-black/20 rounded-lg p-6 border border-white/10">
          <Radar data={data} options={options} />
        </div>
        
        {/* Static Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeLabels.map((shortLabel, index) => {
            // Find the full theme name for this short label
            const fullThemeName = Object.keys(themeMapping).find(fullName => 
              themeMapping[fullName] === shortLabel
            );
            const rawCount = fullThemeName ? themeCounts[fullThemeName] || 0 : 0;
            const level = getLevel(rawCount);
            const description = fullThemeName && spiderMap[fullThemeName] && spiderMap[fullThemeName][level] 
              ? spiderMap[fullThemeName][level] 
              : 'This theme represents progress toward achieving the Blue Pacific 2050 vision.';

            return (
              <Card key={shortLabel} className="bg-black/40 border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{shortLabel}</CardTitle>
                    <Badge variant={getBadgeVariant(level)} className="ml-2">
                      {level}
                    </Badge>
                  </div>
                  <div className="text-sm text-white/60">
                    {rawCount} {rawCount === 1 ? 'choice' : 'choices'}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white/80 leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}