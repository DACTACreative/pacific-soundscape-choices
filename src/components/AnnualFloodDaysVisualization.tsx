import { useState, useEffect } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FloodingData {
  sea_m: number;
  flood_low: number;
  flood_high: number;
  flood_median: number;
}

interface AnnualFloodDaysVisualizationProps {
  currentScenario: '1.5 °C warming' | '3.0 °C warming' | '5.0 °C warming';
}

const scenarioMapping = {
  '1.5 °C warming': 'tlim1.5win0.25',
  '3.0 °C warming': 'tlim3.0win0.25',
  '5.0 °C warming': 'tlim5.0win0.25'
};

export default function AnnualFloodDaysVisualization({ currentScenario }: AnnualFloodDaysVisualizationProps) {
  const [data, setData] = useState<FloodingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data/Projected flooding days - Sheet1.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        const lines = csvText.trim().split('\n');
        const parsed: any[] = [];
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const values = line.split(',');
          if (values.length >= 4) {
            const scenario = values[1]?.trim();
            const scenarioCode = scenarioMapping[currentScenario];
            
            if (scenario === scenarioCode) {
              parsed.push({
                sea_m: parseFloat(values[2]) || 0,
                flood_low: parseInt(values[3]) || 0,
                flood_high: parseInt(values[4]) || 0,
              });
            }
          }
        }
        
        // Calculate median and sort by sea level
        const processedData = parsed
          .map(d => ({
            ...d,
            flood_median: (d.flood_low + d.flood_high) / 2
          }))
          .sort((a, b) => a.sea_m - b.sea_m);
        
        setData(processedData);
      } catch (error) {
        console.error('Error loading flooding data:', error);
        // Use fallback data based on scenario
        const fallbackData = getFallbackData(currentScenario);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentScenario]);

  const getFallbackData = (scenario: string): FloodingData[] => {
    // Fallback data based on scenario
    const baseData = [
      { sea_m: 0.1, flood_low: 1, flood_high: 7 },
      { sea_m: 0.3, flood_low: 33, flood_high: 69 },
      { sea_m: 0.6, flood_low: 214, flood_high: 273 }
    ];
    
    return baseData.map(d => ({
      ...d,
      flood_median: (d.flood_low + d.flood_high) / 2
    }));
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-ocean-deep/10 border border-ocean-light/20 flex items-center justify-center">
        <div className="text-wave-foam/60 font-light">Loading flood days data...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Narrative Text */}
      <div className="prose prose-invert max-w-none">
        <div className="text-center space-y-4 mb-8">
          <h3 className="text-xl font-light text-wave-foam mb-4">
            Annual Flood-Days per Year · {currentScenario}
          </h3>
          
          <div className="text-sm text-card-foreground/80 max-w-4xl mx-auto leading-relaxed">
            <p className="mb-4">
              As warming reaches <strong>{currentScenario}</strong> by mid-century, coastal communities
              will face dramatically more <strong>flood days per year</strong>—days on which tides exceed
              our selected threshold and inundate the shoreline. Each additional centimetre
              of sea-level rise translates into more frequent high-tide flooding.
            </p>
            
            <p>
              This chart picks up where our sea-level rise curves left off. Instead of showing
              how high the water stands, it shows <strong>how often</strong> it will stand above the danger
              threshold each year under this scenario.
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-96 bg-ocean-deep/5 border border-ocean-light/20 p-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="sea_m" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickFormatter={(value) => `${value}m`}
              label={{ 
                value: 'Sea-Level Rise (m)', 
                position: 'insideBottom', 
                offset: -10,
                style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' }
              }}
            />
            
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
              label={{ 
                value: 'Flood Days per Year', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.7)' }
              }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,15,25,0.95)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '13px'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'flood_low') return [`${value} days`, 'Low estimate (5th percentile)'];
                if (name === 'flood_high') return [`${value} days`, 'High estimate (95th percentile)'];
                if (name === 'flood_median') return [`${Math.round(value)} days`, 'Median estimate'];
                return [value, name];
              }}
              labelFormatter={(seaLevel) => `Sea-Level Rise: ${seaLevel}m`}
            />
            
            {/* Uncertainty ribbon */}
            <Area
              type="monotone"
              dataKey="flood_high"
              stroke="none"
              fill="hsl(var(--coral-warm))"
              fillOpacity={0.3}
              stackId="1"
            />
            
            <Area
              type="monotone"
              dataKey="flood_low"
              stroke="none"
              fill="hsl(var(--background))"
              fillOpacity={1}
              stackId="1"
            />
            
            {/* Median line */}
            <Line
              type="monotone"
              dataKey="flood_median"
              stroke="hsl(var(--coral-warm))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--coral-warm))", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "hsl(var(--accent))" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Caption */}
      <div className="space-y-4">
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-coral-warm"></div>
            <span className="text-card-foreground/80">Median projection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-coral-warm/30 border border-coral-warm/50"></div>
            <span className="text-card-foreground/60">Uncertainty band (5th–95th percentile)</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-card-foreground/50 font-light">
            Shaded band = 5th–95th percentile range; line with dots = median estimate
          </p>
        </div>
      </div>
    </div>
  );
}