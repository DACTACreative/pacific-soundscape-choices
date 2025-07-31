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
  const [thematicScores, setThematicScores] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load thematic scores from sessionStorage
    const scores = sessionStorage.getItem('thematicScores');
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    
    console.log('🕷️ ThematicSpiderChart: Selected codes from storage:', selectedCodes);
    console.log('🕷️ Thematic scores from storage:', scores);
    
    if (scores) {
      setThematicScores(JSON.parse(scores));
    }
    
    if (selectedCodes.length === 0) {
      console.log('🕷️ No selected codes found, using fallback data');
      setLoading(false);
      return;
    }

    // Load mapping CSV and spider map data with retry logic
    let retryCount = 0;
    const maxRetries = 3;
    const loadDataWithRetry = async () => {
      try {
        console.log('🕷️ Loading data files...');
        const [answerMappingResponse, spiderMapResponse] = await Promise.all([fetch('/data/ANSWERSMAPPING.6.json', {
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
        
        console.log('🕷️ AnswerMapping Response status:', answerMappingResponse.status);
        console.log('🕷️ SpiderMap Response status:', spiderMapResponse.status);
        
        if (!answerMappingResponse.ok || !spiderMapResponse.ok) {
          throw new Error(`HTTP Error: AnswerMapping ${answerMappingResponse.status}, SpiderMap ${spiderMapResponse.status}`);
        }
        const [answerMappingData, spiderMapData] = await Promise.all([answerMappingResponse.json(), spiderMapResponse.json()]);
        if (!answerMappingData || Object.keys(answerMappingData).length === 0) {
          throw new Error('Answer mapping data appears corrupted');
        }

        // Find matching answers for selected codes
        const matchedAnswers = selectedCodes.map((code: string) => answerMappingData[code]).filter(Boolean);
        console.log('🕷️ Spider chart data loaded:', {
          selectedCodes: selectedCodes.length,
          matchedAnswers: matchedAnswers.length,
          spiderMapKeys: Object.keys(spiderMapData).length
        });
        setPlayerChoices(matchedAnswers);
        setSpiderMap(spiderMapData);
        setLoading(false);
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
  console.log('Rendering spider chart - playerChoices:', playerChoices.length, 'spiderMap:', !!spiderMap, 'thematicScores:', !!thematicScores);
  if (!thematicScores || !spiderMap) {
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
          max: 7,
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
              if (value === 2) return 'LOW';
              if (value === 4) return 'MED';
              if (value === 6) return 'HIGH';
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

  // Use thematic scores instead of simple counts
  console.log('🕷️ Using thematic scores for spider chart:', thematicScores);

  // Map thematic scores to chart labels
  const themeMapping: Record<string, string> = {
    "Political_Leadership_and_Regionalism": "Political Leadership",
    "People_Centered_Development": "People Development", 
    "Peace_and_Security": "Peace & Security",
    "Resource_and_Economic_Development": "Economic Development",
    "Climate_Change_and_Disasters": "Climate & Disasters",
    "Ocean_and_Environment": "Ocean & Environment",
    "Technology_and_Connectivity": "Technology"
  };
  const themeLabels = ["Political Leadership", "People Development", "Peace & Security", "Economic Development", "Climate & Disasters", "Ocean & Environment", "Technology"];

  // Helper function to map scores to level (0-2=LOW, 2.5-4=MEDIUM, 4.5+=HIGH)
  const getLevel = (score: number): string => {
    if (score >= 4.5) return 'HIGH';
    if (score >= 2.5) return 'MEDIUM';
    return 'LOW';
  };

  // Convert thematic scores to chart data
  const chartData = themeLabels.map(shortLabel => {
    // Find the full theme name that maps to this short label
    const fullThemeName = Object.keys(themeMapping).find(fullName => themeMapping[fullName] === shortLabel);
    const score = fullThemeName ? thematicScores[fullThemeName] || 0 : 0;
    console.log(`🕷️ ${shortLabel} -> ${fullThemeName} = ${score}`);
    return score;
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
        max: 7,
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
            stepSize: 1,
            beginAtZero: true,
            max: 7,
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
      <div className={`relative ${className}`}>
        {/* Chart Container - Full Size Block */}
        <div className="w-full h-[80vh] relative bg-black/20 rounded-lg p-6 border border-white/10 mb-8">
          <Radar data={data} options={options} />
        </div>
        
        {/* Theme Cards Block - Below Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themeLabels.map((shortLabel, index) => {
            // Find the full theme name for this short label
            const fullThemeName = Object.keys(themeMapping).find(fullName => 
              themeMapping[fullName] === shortLabel
            );
            const score = fullThemeName ? thematicScores[fullThemeName] || 0 : 0;
            const level = getLevel(score);
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
                    {score.toFixed(1)} points
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