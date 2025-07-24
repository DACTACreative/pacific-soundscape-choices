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

interface CoastalFisheriesVisualizationProps {
  scenario: 'low' | 'medium' | 'high';
}

const CoastalFisheriesVisualization: React.FC<CoastalFisheriesVisualizationProps> = ({ scenario }) => {
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

  const currentScenario = scenarios.find(s => s.key === scenario);
  const currentScenarioData = reefFisheries.map(item => ({
    category: item.category.replace(' (reef-based)', ''),
    value: item[scenario],
    numericValue: parsePercentage(item[scenario])
  }));

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
      {/* Coastal Fisheries Impact */}
      <div className="mb-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-4 text-center tracking-wide">
            Coastal Fisheries Impact · 2050
          </h2>
          <p className="text-center text-card-foreground/60 mb-8 font-light">
            Changes in reef-based fishing under {currentScenario?.label.toLowerCase()} warming pathway
          </p>
          
          <div className="space-y-8">
            {/* Current Scenario Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentScenarioData.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 border border-ocean-light/20 bg-transparent backdrop-blur-sm text-center"
                >
                  <h3 className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-3">
                    {item.category}
                  </h3>
                  <div className="text-3xl font-light text-coral-warm mb-2">
                    {item.value}
                  </div>
                  <div className="relative">
                    <div className="w-full bg-muted/20 rounded h-2">
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
                      {item.numericValue < 0 && (
                        <div
                          className="h-2 rounded-l"
                          style={{
                            backgroundColor: currentScenario?.color,
                            width: `${Math.abs(item.numericValue)}%`,
                            maxWidth: '45%',
                            marginLeft: `${50 - Math.abs(item.numericValue)}%`
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scenario-specific narrative */}
            <div className="p-8 border border-ocean-light/20 bg-transparent backdrop-blur-sm text-center">
              {scenario === 'low' && (
                <p className="text-lg text-card-foreground/90 leading-relaxed">
                  Under the low-emissions pathway, demersal reef fisheries see a modest decline of 
                  2-5%, while shellfish harvests drop by 2-5%. Reef habitat remains largely intact 
                  through mid-century, giving communities time to adapt.
                </p>
              )}
              {scenario === 'medium' && (
                <p className="text-lg text-card-foreground/90 leading-relaxed">
                  At the medium pathway, reef fish catch plunges 20% and invertebrate yields fall 10%. 
                  By 2050, warming-driven bleaching and acidification erode reef productivity, 
                  threatening food security.
                </p>
              )}
              {scenario === 'high' && (
                <p className="text-lg text-card-foreground/90 leading-relaxed">
                  Under high emissions, demersal catches collapse by 20-50% and invertebrates by 20%. 
                  Severe habitat loss and recruitment failures put coastal fisheries at breaking point.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoastalFisheriesVisualization;