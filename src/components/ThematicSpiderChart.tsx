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
    
    if (selectedCodes.length === 0) {
      setLoading(false);
      return;
    }

    // Load mapping CSV and spider map data
    Promise.all([
      fetch('/data/Mapping - Question BPC - Sheet1.csv').then(res => res.text()),
      fetch('/data/SpiderMap.json').then(res => res.json())
    ])
    .then(([csvText, spiderMapData]) => {
      // Parse CSV
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          // Find matching answers for selected codes
          const matchedAnswers = selectedCodes.map((code: string) => 
            results.data.find((row: any) => row.code === code)
          ).filter(Boolean);
          
          setPlayerChoices(matchedAnswers);
          setSpiderMap(spiderMapData);
          setLoading(false);
        }
      });
    })
    .catch(err => {
      console.error('Failed to load data:', err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading your thematic impact...</div>
      </div>
    );
  }

  if (playerChoices.length === 0 || !spiderMap) {
    // Provide fallback data for demonstration
    const fallbackThemeLabels = [
      "Political Leadership and Regionalism",
      "People Centered Development", 
      "Peace and Security",
      "Resource and Economic Development",
      "Climate Change and Disasters",
      "Ocean and Environment",
      "Technology and Connectivity"
    ];
    
    const fallbackData = [2, 3, 1, 2, 3, 2, 1]; // Sample data showing moderate progress
    
    const data = {
      labels: fallbackThemeLabels,
      datasets: [
        {
          label: 'Blue Pacific 2050 Progress',
          data: fallbackData,
          backgroundColor: 'rgba(53, 197, 242, 0.3)',
          borderColor: '#35c5f2',
          borderWidth: 3,
          pointBackgroundColor: '#35c5f2',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 10,
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.15)'
          },
          pointLabels: {
            font: {
              size: 14,
              family: 'inherit'
            },
            color: '#ffffff',
            padding: 25
          },
          ticks: {
            stepSize: 1,
            min: 0,
            max: 3,
            callback: function(value: any) {
              if (value === 0) return '';
              if (value === 1) return 'LOW';
              if (value === 2) return 'MED';
              if (value === 3) return 'HIGH';
              return '';
            },
            color: '#e5e7eb',
            backdropColor: 'transparent',
            font: {
              size: 12
            }
          },
          suggestedMin: 0,
          suggestedMax: 3
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
        <div className="w-full h-[500px] mx-auto">
          <Radar data={data} options={options} />
        </div>
        <div className="mt-8 p-6 bg-black/40 rounded-lg border border-white/20 text-center">
          <p className="text-white/80">
            This chart shows potential outcomes across key themes of the Blue Pacific 2050 strategy.
          </p>
        </div>
      </div>
    );
  }

  // Calculate theme counts from player choices
  const themeCounts: Record<string, number> = {};
  playerChoices.forEach(choice => {
    const theme = choice.theme; // Use 'theme' field, not 'themecode'
    themeCounts[theme] = (themeCounts[theme] || 0) + 1;
  });


  const themeLabels = [
    "Political Leadership and Regionalism",
    "People Centered Development", 
    "Peace and Security",
    "Resource and Economic Development",
    "Climate Change and Disasters",
    "Ocean and Environment",
    "Technology and Connectivity"
  ];

  // Helper function to map scores to level
  const getLevel = (score: number): string => {
    if (score >= 3) return 'HIGH';
    if (score === 2) return 'MEDIUM';
    return 'LOW';
  };

  // Convert theme counts to chart data
  const chartData = themeLabels.map(theme => {
    return themeCounts[theme] || 0;
  });

  const data = {
    labels: themeLabels,
    datasets: [
      {
        label: 'Your Impact on Blue Pacific 2050',
        data: chartData,
        backgroundColor: 'rgba(53, 197, 242, 0.3)',
        borderColor: '#35c5f2',
        borderWidth: 3,
        pointBackgroundColor: '#35c5f2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onHover: (event: any, chartElements: any) => {
      if (chartElements.length) {
        const index = chartElements[0].index;
        setHoveredTheme(themeLabels[index]);
      } else {
        setHoveredTheme(null);
      }
    },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.15)'
          },
          pointLabels: {
            font: {
              size: 14,
              family: 'inherit'
            },
            color: '#ffffff',
            padding: 25
          },
          ticks: {
            stepSize: 1,
            min: 0,
            max: 3,
            callback: function(value: any) {
              if (value === 0) return '';
              if (value === 1) return 'LOW';
              if (value === 2) return 'MED';
              if (value === 3) return 'HIGH';
              return '';
            },
            color: '#e5e7eb',
            backdropColor: 'transparent',
            font: {
              size: 12
            }
          },
          suggestedMin: 0,
          suggestedMax: 3
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
      <div className="w-full h-[500px] mx-auto">
        <Radar data={data} options={options} />
      </div>
      
      {/* Hover Info Box */}
      <div className="mt-8 p-6 bg-black/40 rounded-lg border border-white/20 text-center min-h-[120px] flex flex-col justify-center">
        {hoveredTheme ? (
          <>
            <h3 className="text-xl font-semibold text-white mb-3">
              {hoveredTheme} ({getLevel(themeCounts[hoveredTheme] || 0)} Impact)
            </h3>
            <p className="text-base text-gray-200 leading-relaxed">
              {spiderMap[hoveredTheme] && spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme] || 0)]
                ? spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme] || 0)]
                : 'This theme represents progress toward achieving the Blue Pacific 2050 vision.'}
            </p>
          </>
        ) : (
          <p className="text-base text-gray-300">
            Hover over a theme in the chart to see your detailed impact.
          </p>
        )}
      </div>

      {/* Choice Narratives Section */}
      {playerChoices.length > 0 && (
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-extralight text-coral-warm mb-3 tracking-wide">
              Your Journey Through the Pacific Future
            </h3>
            <p className="text-base text-card-foreground/60">
              Each choice you made shapes the Blue Pacific 2050
            </p>
          </div>
          
          <div className="space-y-0">
            {playerChoices.map((choice: any, index: number) => (
              <div 
                key={`${choice.code}-${index}`}
                className="h-screen flex flex-col justify-center items-center px-8 py-16 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                  <div className="max-w-4xl text-center space-y-12">
                  {/* User's Choice */}
                  <div className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 leading-relaxed">
                      You chose to {choice.answer}
                    </h4>
                  </div>

                  {/* Narrative */}
                  <div className="animate-fade-in" style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                    <div className="text-lg md:text-xl lg:text-2xl text-card-foreground/90 leading-relaxed mb-8 font-light">
                      → {choice.narrative}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="animate-fade-in" style={{ animationDelay: `${index * 0.2 + 0.6}s` }}>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-6">
                      → {choice.impact}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="animate-fade-in" style={{ animationDelay: `${index * 0.2 + 0.9}s` }}>
                    <div className="text-lg md:text-xl italic text-card-foreground/80 font-light">
                      Outcome: {choice.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}