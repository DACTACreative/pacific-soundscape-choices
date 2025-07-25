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
  const [gameData, setGameData] = useState<any>(null);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  useEffect(() => {
    // Load game data from sessionStorage
    const storedData = sessionStorage.getItem('gameResults');
    if (storedData) {
      setGameData(JSON.parse(storedData));
    }

    // Load SpiderMap data
    fetch('/data/SpiderMap.json')
      .then(res => res.json())
      .then(data => {
        setSpiderMap(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load SpiderMap:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-wave-foam">Loading your thematic impact...</div>
      </div>
    );
  }

  if (!gameData || !spiderMap) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-wave-foam">No thematic data available</div>
      </div>
    );
  }

  const { themeCounts } = gameData;

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
    const themeKey = theme.replace(/\s+/g, '_').replace(/&/g, 'and');
    return themeCounts[themeKey] || 0;
  });

  const data = {
    labels: themeLabels,
    datasets: [
      {
        label: 'Your Impact on Blue Pacific 2050',
        data: chartData,
        backgroundColor: 'rgba(34, 202, 236, 0.3)',
        borderColor: '#22CAEC',
        borderWidth: 2,
        pointBackgroundColor: '#22CAEC',
        pointBorderColor: '#22CAEC',
        pointRadius: 6,
        pointHoverRadius: 8,
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
          color: '#ffffff30'
        },
        grid: {
          color: '#ffffff20'
        },
        pointLabels: {
          font: {
            size: 18,
            family: 'inherit'
          },
          color: '#ffffff',
          padding: 20
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
          color: '#eeeeee',
          backdropColor: 'transparent',
          font: {
            size: 16
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
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-extralight text-coral-warm mb-3 tracking-wide">
          Your Thematic Impact
        </h3>
        <p className="text-base text-card-foreground/60">
          Hover over each point to see your influence across Blue Pacific 2050 themes
        </p>
      </div>
      
      <div className="w-full max-w-4xl h-[70vh] mx-auto px-4">
        <Radar data={data} options={options} />
      </div>
      
      {/* Hover Info Box */}
      <div className="mt-8 p-6 bg-white/5 rounded-lg border border-ocean-light/20 text-center min-h-[100px] flex flex-col justify-center">
        {hoveredTheme ? (
          <>
            <h3 className="text-xl font-medium text-accent mb-3">
              {hoveredTheme} ({getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)} Impact)
            </h3>
            <p className="text-base text-card-foreground/90 leading-relaxed">
              {spiderMap[hoveredTheme] && spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)]
                ? spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)]
                : 'No narrative available for this theme.'}
            </p>
          </>
        ) : (
          <p className="text-base text-card-foreground/60">
            Hover over a theme in the chart to see your detailed impact.
          </p>
        )}
      </div>

      {/* Choice Narratives Section */}
      {gameData.userJourney && gameData.userJourney.length > 0 && (
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
            {gameData.userJourney.map((choice: any, index: number) => (
              <div 
                key={`${choice.question_code}-${choice.answer_code}`}
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