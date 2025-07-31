import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
interface SimpleSeaLevelChartProps {
  scenario?: string;
}
interface SeaLevelData {
  year: number;
  low: number;
  medium: number;
  high: number;
}
export default function SimpleSeaLevelChart({
  scenario = 'tlim1.5win0.25'
}: SimpleSeaLevelChartProps) {
  const [data, setData] = useState<SeaLevelData[]>([]);
  const [selectedScenario, setSelectedScenario] = useState(scenario);
  const [animatedData, setAnimatedData] = useState<SeaLevelData[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [currentYear, setCurrentYear] = useState(2020);
  const [currentSeaLevel, setCurrentSeaLevel] = useState(0);
  useEffect(() => {
    loadSeaLevelData();
  }, [selectedScenario]);
  useEffect(() => {
    if (data.length > 0) {
      setAnimatedData([]);
      setCurrentAnimationIndex(0);
      setAnimationProgress(0);
      setCurrentYear(2020);
      setCurrentSeaLevel(data[0]?.medium || 0);
    }
  }, [data]);
  const startAnimation = useCallback(() => {
    if (data.length === 0) return;
    setIsAnimating(true);
    setCurrentAnimationIndex(0);
    setAnimationProgress(0);
    setAnimatedData([data[0]]);
    const totalDuration = 5000; // 5 seconds
    const totalFrames = data.length - 1;
    const frameInterval = totalDuration / totalFrames;
    let currentFrame = 0;
    const interval = setInterval(() => {
      currentFrame++;
      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        setIsAnimating(false);
        setAnimatedData(data);
        setCurrentYear(2100);
        setCurrentSeaLevel(data[data.length - 1]?.medium || 0);
        return;
      }
      const progress = currentFrame / totalFrames;
      setAnimationProgress(progress);
      setCurrentAnimationIndex(currentFrame);
      setAnimatedData(data.slice(0, currentFrame + 1));
      const currentDataPoint = data[currentFrame];
      setCurrentYear(currentDataPoint.year);
      setCurrentSeaLevel(currentDataPoint.medium);
    }, frameInterval);
  }, [data]);
  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setAnimatedData([]);
    setCurrentAnimationIndex(0);
    setAnimationProgress(0);
    setCurrentYear(2020);
    setCurrentSeaLevel(data[0]?.medium || 0);
  }, [data]);
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
        console.log('Rows found:', {
          lowRow: !!lowRow,
          mediumRow: !!mediumRow,
          highRow: !!highRow
        });
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
              low: lowValues[index] * 100,
              // Convert to cm
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
      case 'tlim1.5win0.25':
        return 'Scenario 1 (1.5°C)';
      case 'tlim3.0win0.25':
        return 'Scenario 2 (3.0°C)';
      case 'tlim5.0win0.25':
        return 'Scenario 3 (5.0°C)';
      default:
        return 'Climate Scenario';
    }
  };
  const displayData = animatedData.length > 0 ? animatedData : data;
  return <div className="w-full my-8 px-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Sea Level Rise Projections</h2>
        
        {/* Explanation */}
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border">
          
          <p className="text-muted-foreground">
            This chart visualizes three potential futures for sea-level rise in the Pacific, based on different global emissions scenarios. 
            For each scenario, the lines show the range of scientific possibility.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-primary mb-4">{getScenarioTitle(selectedScenario)}</h3>
        
        {/* Scenario Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button onClick={() => setSelectedScenario('tlim1.5win0.25')} variant={selectedScenario === 'tlim1.5win0.25' ? 'default' : 'outline'} size="sm">
            1.5°C Scenario
          </Button>
          <Button onClick={() => setSelectedScenario('tlim3.0win0.25')} variant={selectedScenario === 'tlim3.0win0.25' ? 'default' : 'outline'} size="sm">
            3.0°C Scenario
          </Button>
          <Button onClick={() => setSelectedScenario('tlim5.0win0.25')} variant={selectedScenario === 'tlim5.0win0.25' ? 'default' : 'outline'} size="sm">
            5.0°C Scenario
          </Button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Live Readouts */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">CURRENT YEAR</div>
            <div className="text-4xl font-mono font-bold text-primary">{currentYear}</div>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">SEA LEVEL RISE</div>
            <div className="text-4xl font-mono font-bold text-primary">{currentSeaLevel.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">centimeters</div>
          </div>
          
          {/* Animation Controls */}
          <div className="space-y-2">
            <Button onClick={startAnimation} disabled={isAnimating || data.length === 0} className="w-full" variant="default">
              {isAnimating ? <>
                  <Pause className="w-4 h-4 mr-2" />
                  Animating...
                </> : <>
                  <Play className="w-4 h-4 mr-2" />
                  Play Animation
                </>}
            </Button>
            <Button onClick={resetAnimation} variant="outline" size="sm" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="lg:col-span-3">
          <div className="bg-card border rounded-lg p-6">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{
                  fill: 'hsl(var(--muted-foreground))'
                }} className="text-sm" />
                  <YAxis domain={[0, 160]} stroke="hsl(var(--muted-foreground))" tick={{
                  fill: 'hsl(var(--muted-foreground))'
                }} label={{
                  value: 'Sea Level Rise (cm)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fill: 'hsl(var(--muted-foreground))'
                  }
                }} className="text-sm" />
                  <Tooltip contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))',
                  fontSize: '14px'
                }} formatter={(value: number, name: string) => [`${value.toFixed(1)} cm`, name === 'low' ? 'Low Estimate' : name === 'medium' ? 'Medium Estimate' : 'High Estimate']} labelFormatter={year => `Year: ${year}`} />
                  <Legend verticalAlign="top" height={36} iconType="line" formatter={value => {}} />
                  
                  {/* Three Distinct Lines */}
                  <Line type="monotone" dataKey="medium" stroke="#FAFAFA" strokeWidth={3} dot={{
                  fill: '#FAFAFA',
                  r: 3,
                  strokeWidth: 0
                }} activeDot={{
                  r: 5,
                  fill: '#FAFAFA'
                }} />
                  <Line type="monotone" dataKey="high" stroke="#FBBF24" strokeWidth={2} dot={{
                  fill: '#FBBF24',
                  r: 2,
                  strokeWidth: 0
                }} activeDot={{
                  r: 4,
                  fill: '#FBBF24'
                }} />
                  <Line type="monotone" dataKey="low" stroke="#22D3EE" strokeWidth={2} dot={{
                  fill: '#22D3EE',
                  r: 2,
                  strokeWidth: 0
                }} activeDot={{
                  r: 4,
                  fill: '#22D3EE'
                }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding the Projections */}
      <div className="mb-6 bg-muted/20 rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Understanding the Projections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-0.5 bg-[#FAFAFA] mt-2 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-foreground">Medium Estimate (50th percentile)</div>
              <div className="text-muted-foreground">The most likely projection based on current climate models</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-0.5 bg-[#FBBF24] mt-2 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-foreground">High Estimate (95th percentile)</div>
              <div className="text-muted-foreground">A pessimistic scenario; 95% chance the outcome will be at or below this level</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-0.5 bg-[#22D3EE] mt-2 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-foreground">Low Estimate (5th percentile)</div>
              <div className="text-muted-foreground">An optimistic scenario; 5% chance the outcome will be at or below this level</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2050 Summary */}
      {data.length > 0 && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">2050 Low Estimate</div>
            <div className="text-3xl font-bold text-foreground">{data.find(d => d.year === 2050)?.low.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">centimeters</div>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">2050 Medium Estimate</div>
            <div className="text-3xl font-bold text-primary">{data.find(d => d.year === 2050)?.medium.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">centimeters</div>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">2050 High Estimate</div>
            <div className="text-3xl font-bold text-foreground">{data.find(d => d.year === 2050)?.high.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">centimeters</div>
          </div>
        </div>}
    </div>;
}