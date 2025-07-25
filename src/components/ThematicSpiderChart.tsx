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
        backgroundColor: 'rgba(34, 202, 236, 0.1)',
        borderColor: 'hsl(var(--accent))',
        borderWidth: 2,
        pointBackgroundColor: 'hsl(var(--accent))',
        pointBorderColor: 'hsl(var(--accent))',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'hsl(var(--ocean-light) / 0.3)'
        },
        grid: {
          color: 'hsl(var(--ocean-light) / 0.2)'
        },
        pointLabels: {
          font: {
            size: 12,
            family: 'inherit'
          },
          color: 'hsl(var(--wave-foam) / 0.8)'
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
          color: 'hsl(var(--wave-foam) / 0.6)',
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
        backgroundColor: 'hsl(var(--ocean-deep) / 0.95)',
        titleColor: 'hsl(var(--wave-foam))',
        bodyColor: 'hsl(var(--card-foreground) / 0.8)',
        borderColor: 'hsl(var(--accent))',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            const theme = context.label;
            const score = context.parsed.r;
            const level = getLevel(score);
            
            if (spiderMap[theme] && spiderMap[theme][level]) {
              return `${level}: ${spiderMap[theme][level]}`;
            }
            return `Score: ${score}`;
          }
        }
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