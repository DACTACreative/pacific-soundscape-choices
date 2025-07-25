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
            size: 14,
            family: 'inherit'
          },
          color: '#ffffff'
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
            size: 10
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
      <div className="mb-6 text-center">
        <h3 className="text-xl font-extralight text-coral-warm mb-2 tracking-wide">
          Your Thematic Impact
        </h3>
        <p className="text-sm text-card-foreground/60">
          Hover over each point to see your influence across Blue Pacific 2050 themes
        </p>
      </div>
      
      <div className="h-80 w-full">
        <Radar data={data} options={options} />
      </div>
      
      {/* Hover Info Box */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-ocean-light/20 text-center min-h-[80px] flex flex-col justify-center">
        {hoveredTheme ? (
          <>
            <h3 className="text-lg font-medium text-accent mb-2">
              {hoveredTheme} ({getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)} Impact)
            </h3>
            <p className="text-card-foreground/90 leading-relaxed">
              {spiderMap[hoveredTheme] && spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)]
                ? spiderMap[hoveredTheme][getLevel(themeCounts[hoveredTheme.replace(/\s+/g, '_').replace(/&/g, 'and')] || 0)]
                : 'No narrative available for this theme.'}
            </p>
          </>
        ) : (
          <p className="text-card-foreground/60">
            Hover over a theme in the chart to see your detailed impact.
          </p>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {themeLabels.map((theme, index) => {
          const themeKey = theme.replace(/\s+/g, '_').replace(/&/g, 'and');
          const score = themeCounts[themeKey] || 0;
          const level = getLevel(score);
          
          return (
            <div key={theme} className="p-3 border border-ocean-light/20 bg-transparent backdrop-blur-sm">
              <div className="font-medium text-accent mb-1">{theme}</div>
              <div className="text-card-foreground/70">
                {score} choice{score !== 1 ? 's' : ''} • {level} impact
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}