import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SeaLevelData {
  year: number;
  scenario: string;
  quantile: number;
  rise_m: number;
}

interface SeaLevelVisualizationProps {
  scenario: 'tlim1.5win0.25' | 'tlim3.0win0.25' | 'tlim5.0win0.25';
}

const scenarioLabels = {
  'tlim1.5win0.25': '1.5°C warming',
  'tlim3.0win0.25': '3.0°C warming', 
  'tlim5.0win0.25': '5.0°C warming'
};

const quantileLabels = {
  5: '5th percentile',
  50: '50th percentile (median)',
  95: '95th percentile'
};

const quantileColors = {
  5: 'hsl(180, 60%, 40%)',   // accent color for low scenario
  50: 'hsl(15, 80%, 60%)',   // coral-warm for median
  95: 'hsl(15, 90%, 55%)'    // coral-urgent for high scenario
};

export default function SeaLevelVisualization({ scenario }: SeaLevelVisualizationProps) {
  const [data, setData] = useState<SeaLevelData[]>([]);
  const [visibleQuantiles, setVisibleQuantiles] = useState<number[]>([5, 50, 95]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/sea-level-data.csv');
        const csvText = await response.text();
        
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        const yearColumns = headers.filter(h => h.match(/^20\d{2}$/));
        const parsed: SeaLevelData[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          const scenarioValue = values[3];
          const quantileValue = parseInt(values[4]);
          
          if (scenarioValue === scenario) {
            yearColumns.forEach((yearCol, yearIndex) => {
              const yearHeaderIndex = headers.indexOf(yearCol);
              const year = parseInt(yearCol);
              const rise_m = parseFloat(values[yearHeaderIndex]);
              
              if (!isNaN(rise_m)) {
                parsed.push({
                  year,
                  scenario: scenarioValue,
                  quantile: quantileValue,
                  rise_m
                });
              }
            });
          }
        }
        
        setData(parsed);
      } catch (error) {
        console.error('Error loading sea level data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [scenario]);

  const chartData = () => {
    const years = [...new Set(data.map(d => d.year))].sort();
    
    return years.map(year => {
      const yearData = data.filter(d => d.year === year);
      const entry: any = { year };
      
      visibleQuantiles.forEach(q => {
        const point = yearData.find(d => d.quantile === q);
        if (point) {
          entry[`q${q}`] = point.rise_m;
        }
      });
      
      return entry;
    });
  };

  const toggleQuantile = (quantile: number) => {
    setVisibleQuantiles(prev => 
      prev.includes(quantile) 
        ? prev.filter(q => q !== quantile)
        : [...prev, quantile]
    );
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-ocean-deep/10 border border-ocean-light/20 flex items-center justify-center">
        <div className="text-wave-foam/60 font-light">Loading sea level data...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-light text-wave-foam mb-2">
            Sea Level Rise Projections: {scenarioLabels[scenario]}
          </h3>
          <p className="text-sm text-card-foreground/60">
            Relative to 2020 baseline (meters)
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {[5, 50, 95].map(quantile => (
            <button
              key={quantile}
              onClick={() => toggleQuantile(quantile)}
              className={`px-4 py-2 text-xs font-light tracking-wide border transition-all duration-300
                ${visibleQuantiles.includes(quantile)
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-ocean-light/20 text-card-foreground/60 hover:border-accent/40'
                }`}
            >
              {quantileLabels[quantile as keyof typeof quantileLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-96 bg-ocean-deep/5 border border-ocean-light/20 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData()} 
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="year" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => value === 2050 ? `${value}` : `${value}`}
              tick={(props) => {
                const { x, y, payload } = props;
                const is2050 = payload.value === 2050;
                return (
                  <text 
                    x={x} 
                    y={y} 
                    textAnchor="middle" 
                    fill={is2050 ? "hsl(15, 80%, 60%)" : "rgba(255,255,255,0.6)"} 
                    fontSize={is2050 ? 16 : 12}
                    fontWeight={is2050 ? "bold" : "normal"}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => `${value}m`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '12px'
              }}
              formatter={(value: any, name: string) => [
                `${value}m`, 
                quantileLabels[parseInt(name.slice(1)) as keyof typeof quantileLabels]
              ]}
              labelFormatter={(year) => `Year: ${year}`}
            />
            <Legend 
              wrapperStyle={{ 
                fontSize: '16px', 
                fontWeight: 'bold',
                paddingTop: '20px'
              }}
              formatter={(value) => quantileLabels[parseInt(value.slice(1)) as keyof typeof quantileLabels]}
            />
            
            {visibleQuantiles.map(quantile => (
              <Line
                key={quantile}
                type="monotone"
                dataKey={`q${quantile}`}
                stroke={quantileColors[quantile as keyof typeof quantileColors]}
                strokeWidth={2}
                dot={{ fill: quantileColors[quantile as keyof typeof quantileColors], strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data source */}
      <div className="text-center">
        <p className="text-xs text-card-foreground/50 font-light">
          Data: NASA Sea Level Change Team, IPCC AR6 Regional Atlas
        </p>
      </div>
    </div>
  );
}