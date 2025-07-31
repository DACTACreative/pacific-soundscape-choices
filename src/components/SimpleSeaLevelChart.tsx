import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

interface SimpleSeaLevelChartProps {
  scenario?: string;
}

interface SeaLevelData {
  year: number;
  low: number;
  medium: number;
  high: number;
}

export default function SimpleSeaLevelChart({ scenario = 'tlim1.5win0.25' }: SimpleSeaLevelChartProps) {
  const [data, setData] = useState<SeaLevelData[]>([]);
  const [selectedScenario, setSelectedScenario] = useState(scenario);

  useEffect(() => {
    loadSeaLevelData();
  }, [selectedScenario]);

  const loadSeaLevelData = async () => {
    try {
      const response = await fetch('/data/sea-level-data.csv');
      const csvText = await response.text();
      const lines = csvText.split('\n').slice(1).filter(line => line.trim()); // Skip header and empty lines
      
      console.log('Loading scenario:', selectedScenario);
      console.log('Found lines:', lines.length);
      
      // Find the rows for our scenario
      const scenarioRows = lines.filter(line => line.includes(selectedScenario));
      console.log('Scenario rows found:', scenarioRows.length);
      
      if (scenarioRows.length >= 3) {
        const lowRow = scenarioRows.find(row => row.includes(',5,'));
        const mediumRow = scenarioRows.find(row => row.includes(',50,'));
        const highRow = scenarioRows.find(row => row.includes(',95,'));
        
        console.log('Rows found:', { lowRow: !!lowRow, mediumRow: !!mediumRow, highRow: !!highRow });
        
        if (lowRow && mediumRow && highRow) {
          const years = [2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
          const chartData: SeaLevelData[] = [];
          
          const lowValues = lowRow.split(',').slice(5, 14).map(Number);
          const mediumValues = mediumRow.split(',').slice(5, 14).map(Number);
          const highValues = highRow.split(',').slice(5, 14).map(Number);
          
          console.log('Sample values for 2050:', {
            low: lowValues[3] * 100,
            medium: mediumValues[3] * 100,
            high: highValues[3] * 100
          });
          
          years.forEach((year, index) => {
            chartData.push({
              year,
              low: lowValues[index] * 100, // Convert to cm
              medium: mediumValues[index] * 100,
              high: highValues[index] * 100
            });
          });
          
          console.log('Chart data created:', chartData.length, 'points');
          setData(chartData);
        }
      }
    } catch (error) {
      console.error('Error loading sea level data:', error);
    }
  };

  const getScenarioTitle = (scenario: string) => {
    switch (scenario) {
      case 'tlim1.5win0.25': return 'Scenario 1 (1.5°C)';
      case 'tlim3.0win0.25': return 'Scenario 2 (3.0°C)';
      case 'tlim5.0win0.25': return 'Scenario 3 (5.0°C)';
      default: return 'Climate Scenario';
    }
  };

  return (
    <div className="w-full p-6 bg-gray-900 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Sea Level Rise Projections</h2>
        <h3 className="text-lg text-blue-400 mb-4">{getScenarioTitle(selectedScenario)}</h3>
        
        {/* Scenario Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setSelectedScenario('tlim1.5win0.25')}
            variant={selectedScenario === 'tlim1.5win0.25' ? 'default' : 'outline'}
          >
            Scenario 1 (1.5°C)
          </Button>
          <Button
            onClick={() => setSelectedScenario('tlim3.0win0.25')}
            variant={selectedScenario === 'tlim3.0win0.25' ? 'default' : 'outline'}
          >
            Scenario 2 (3.0°C)
          </Button>
          <Button
            onClick={() => setSelectedScenario('tlim5.0win0.25')}
            variant={selectedScenario === 'tlim5.0win0.25' ? 'default' : 'outline'}
          >
            Scenario 3 (5.0°C)
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#fff"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              domain={[0, 160]}
              stroke="#fff"
              tick={{ fill: '#fff' }}
              label={{ value: 'Sea Level Rise (cm)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#fff' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#fff'
              }}
              formatter={(value: number) => [`${value.toFixed(1)} cm`, '']}
              labelFormatter={(year) => `Year: ${year}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="low" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Low Estimate (5th percentile)"
              dot={{ fill: '#10b981', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="medium" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Medium Estimate (50th percentile)"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="high" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="High Estimate (95th percentile)"
              dot={{ fill: '#ef4444', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      {data.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-green-400 font-semibold">Low Estimate (2050)</div>
            <div className="text-2xl">{data.find(d => d.year === 2050)?.low.toFixed(1)} cm</div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-blue-400 font-semibold">Medium Estimate (2050)</div>
            <div className="text-2xl">{data.find(d => d.year === 2050)?.medium.toFixed(1)} cm</div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <div className="text-red-400 font-semibold">High Estimate (2050)</div>
            <div className="text-2xl">{data.find(d => d.year === 2050)?.high.toFixed(1)} cm</div>
          </div>
        </div>
      )}
    </div>
  );
}