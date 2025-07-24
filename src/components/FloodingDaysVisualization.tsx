import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FloodingData {
  threshold: string;
  scenario: string;
  seaRiseLevel: number;
  floodDaysLow: number;
  floodDaysHigh: number;
  yearMin: number;
  yearMax: number;
}

const scenarioLabels = {
  'tlim1.5win0.25': '1.5°C warming',
  'tlim3.0win0.25': '3.0°C warming', 
  'tlim5.0win0.25': '5.0°C warming'
};

export default function FloodingDaysVisualization() {
  const [data, setData] = useState<FloodingData[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string>('tlim1.5win0.25');
  const [selectedThreshold, setSelectedThreshold] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/Projected flooding days  - Sheet1.csv');
        const csvText = await response.text();
        
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        const parsed: FloodingData[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          
          parsed.push({
            threshold: values[0],
            scenario: values[1],
            seaRiseLevel: parseFloat(values[2]),
            floodDaysLow: parseInt(values[3]),
            floodDaysHigh: parseInt(values[4]),
            yearMin: parseInt(values[5]),
            yearMax: parseInt(values[6])
          });
        }
        
        setData(parsed);
        
        // Set default threshold
        const thresholds = [...new Set(parsed.map(d => d.threshold))];
        if (thresholds.length > 0) {
          setSelectedThreshold(thresholds[0]);
        }
      } catch (error) {
        console.error('Error loading flooding data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredData = data.filter(d => 
    d.scenario === selectedScenario && d.threshold === selectedThreshold
  ).sort((a, b) => a.seaRiseLevel - b.seaRiseLevel);

  const chartData = filteredData.map(d => ({
    seaLevel: d.seaRiseLevel,
    floodDaysLow: d.floodDaysLow,
    floodDaysHigh: d.floodDaysHigh,
    floodDaysMean: (d.floodDaysLow + d.floodDaysHigh) / 2,
    yearRange: `${d.yearMin}-${d.yearMax}`,
    yearMin: d.yearMin,
    yearMax: d.yearMax
  }));

  const thresholds = [...new Set(data.map(d => d.threshold))];
  const scenarios = [...new Set(data.map(d => d.scenario))];

  if (loading) {
    return (
      <div className="w-full h-64 bg-ocean-deep/10 border border-ocean-light/20 flex items-center justify-center">
        <div className="text-wave-foam/60 font-light">Loading flooding data...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-light text-wave-foam mb-2">
            Projected Flooding Days vs Sea Level Rise
          </h3>
          <p className="text-sm text-card-foreground/60">
            Annual flooding days by sea level rise scenario
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="space-y-2">
            <label className="text-xs text-card-foreground/60 font-light">Warming Scenario</label>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map(scenario => (
                  <SelectItem key={scenario} value={scenario}>
                    {scenarioLabels[scenario as keyof typeof scenarioLabels]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-card-foreground/60 font-light">Flooding Threshold</label>
            <Select value={selectedThreshold} onValueChange={setSelectedThreshold}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {thresholds.map(threshold => (
                  <SelectItem key={threshold} value={threshold}>
                    {threshold}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-96 bg-ocean-deep/5 border border-ocean-light/20 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="seaLevel" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => `${value}m`}
            />
            
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => `${value} days`}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '12px'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'floodDaysLow') return [`${value} days`, 'Low estimate'];
                if (name === 'floodDaysHigh') return [`${value} days`, 'High estimate'];
                if (name === 'floodDaysMean') return [`${value} days`, 'Mean estimate'];
                return [value, name];
              }}
              labelFormatter={(seaLevel) => `Sea Level Rise: ${seaLevel}m`}
            />
            
            {/* Ribbon area for uncertainty range */}
            <Area
              type="monotone"
              dataKey="floodDaysHigh"
              stroke="none"
              fill="hsl(var(--accent))"
              fillOpacity={0.2}
              stackId="1"
            />
            
            <Area
              type="monotone"
              dataKey="floodDaysLow"
              stroke="none"
              fill="hsl(var(--background))"
              fillOpacity={1}
              stackId="1"
            />
            
            {/* Mean line */}
            <Line
              type="monotone"
              dataKey="floodDaysMean"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--coral-warm))" }}
            />
            
            {/* Low and high boundary lines */}
            <Line
              type="monotone"
              dataKey="floodDaysLow"
              stroke="hsl(var(--accent))"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />
            
            <Line
              type="monotone"
              dataKey="floodDaysHigh"
              stroke="hsl(var(--accent))"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-accent"></div>
          <span className="text-card-foreground/80 font-medium">Mean projection</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 border border-accent border-dashed"></div>
          <span className="text-card-foreground/60">Uncertainty range</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-accent/20 border border-accent/40"></div>
          <span className="text-card-foreground/60">Projection band</span>
        </div>
      </div>

      {/* Data info */}
      <div className="text-center space-y-2">
        <p className="text-xs text-card-foreground/50 font-light">
          Scenario: {scenarioLabels[selectedScenario as keyof typeof scenarioLabels]}
        </p>
        <p className="text-xs text-card-foreground/50 font-light">
          Data: Pacific Climate Projections, IPCC AR6 Regional Assessment
        </p>
      </div>
    </div>
  );
}