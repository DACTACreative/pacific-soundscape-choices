import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FisheriesData {
  category: string;
  low: string;
  medium: string;
  high: string;
  mainEffects: string;
}

const CoastalFisheriesVisualization: React.FC = () => {
  const [data, setData] = useState<FisheriesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/Choose Your Pacific Future - Coastal Fisheries Loss.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            category: values[0],
            low: values[1],
            medium: values[2],
            high: values[3],
            mainEffects: values[4]?.replace(/"/g, '') || ''
          };
        });
        
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading fisheries data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter for reef-based fisheries
  const reefFisheries = data.filter(item => 
    item.category.includes('Demersal fish') || item.category.includes('Targeted invertebrates')
  );

  // Convert percentage strings to numbers for visualization
  const parsePercentage = (value: string): number => {
    if (value.includes('to')) {
      // Take the midpoint of ranges like "–2 to –5 %"
      const range = value.match(/-?\d+/g);
      if (range) {
        return (parseInt(range[0]) + parseInt(range[1])) / 2;
      }
    }
    const match = value.match(/-?\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const chartData = reefFisheries.map(item => ({
    category: item.category.replace(' (reef-based)', ''),
    low: parsePercentage(item.low),
    medium: parsePercentage(item.medium),
    high: parsePercentage(item.high)
  }));

  const scenarios = [
    { key: 'low', label: 'Low (B1/A2, 2035)', color: 'hsl(var(--chart-1))' },
    { key: 'medium', label: 'Medium (B1, 2100)', color: 'hsl(var(--chart-2))' },
    { key: 'high', label: 'High (A2, 2100)', color: 'hsl(var(--chart-3))' }
  ];

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse">Loading fisheries data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reef-Based Fisheries Impact Summary</CardTitle>
          <CardDescription>
            Projected percentage changes in catch by 2050 under different warming pathways
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Low (B1/A2, 2035)</TableHead>
                <TableHead>Medium (B1, 2100)</TableHead>
                <TableHead>High (A2, 2100)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reefFisheries.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-chart-1">{item.low}</TableCell>
                  <TableCell className="text-chart-2">{item.medium}</TableCell>
                  <TableCell className="text-chart-3">{item.high}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diverging Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Projected % Change in Reef-Based Fisheries by 2050</CardTitle>
          <CardDescription>
            Negative values indicate decline in catch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {chartData.map((item, categoryIndex) => (
              <div key={categoryIndex} className="space-y-2">
                <h4 className="font-medium text-sm">{item.category}</h4>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-3xl">
                      {/* Chart container */}
                      <div className="relative h-24 bg-muted/20 rounded">
                        {/* Zero line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
                        
                        {/* Bars for each scenario */}
                        <div className="absolute inset-0 flex flex-col justify-center space-y-1">
                          {scenarios.map((scenario, scenarioIndex) => {
                            const value = item[scenario.key as keyof typeof item] as number;
                            const width = Math.abs(value) * 2; // Scale for visualization
                            const isNegative = value < 0;
                            
                            return (
                              <div key={scenarioIndex} className="flex items-center h-6">
                                <div className="flex-1 flex justify-end pr-1">
                                  {isNegative && (
                                    <div
                                      className="h-4 rounded-l flex items-center justify-end pr-2 text-xs text-white font-medium"
                                      style={{
                                        backgroundColor: scenario.color,
                                        width: `${width}%`,
                                        maxWidth: '45%'
                                      }}
                                    >
                                      {value}%
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 pl-1">
                                  {!isNegative && value > 0 && (
                                    <div
                                      className="h-4 rounded-r flex items-center justify-start pl-2 text-xs text-white font-medium"
                                      style={{
                                        backgroundColor: scenario.color,
                                        width: `${width}%`,
                                        maxWidth: '45%'
                                      }}
                                    >
                                      {value}%
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex justify-center mt-2 space-x-4">
                        {scenarios.map((scenario) => (
                          <div key={scenario.key} className="flex items-center space-x-1">
                            <div
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: scenario.color }}
                            ></div>
                            <span className="text-xs text-muted-foreground">{scenario.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Narratives */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-chart-1/20 bg-chart-1/5">
          <CardHeader>
            <CardTitle className="text-chart-1">Low Emissions (B1/A2, 2035)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Under the low-emissions pathway, demersal reef fisheries see a modest decline of 
              2-5%, while shellfish harvests drop by 2-5%. Reef habitat remains largely intact 
              through mid-century, giving communities time to adapt.
            </p>
          </CardContent>
        </Card>

        <Card className="border-chart-2/20 bg-chart-2/5">
          <CardHeader>
            <CardTitle className="text-chart-2">Medium Pathway (B1, 2100)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              At the medium pathway, reef fish catch plunges 20% and invertebrate yields fall 10%. 
              By 2050, warming-driven bleaching and acidification erode reef productivity, 
              threatening food security.
            </p>
          </CardContent>
        </Card>

        <Card className="border-chart-3/20 bg-chart-3/5">
          <CardHeader>
            <CardTitle className="text-chart-3">High Emissions (A2, 2100)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Under high emissions, demersal catches collapse by 20-50% and invertebrates by 20%. 
              Severe habitat loss and recruitment failures put coastal fisheries at breaking point.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoastalFisheriesVisualization;