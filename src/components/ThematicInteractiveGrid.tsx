import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

interface ThematicInteractiveGridProps {
  className?: string;
}

export default function ThematicInteractiveGrid({ className }: ThematicInteractiveGridProps) {
  const [playerChoices, setPlayerChoices] = useState<any[]>([]);
  const [spiderMap, setSpiderMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Theme mapping for display
  const themeMapping: { [key: string]: string } = {
    'Political Leadership': 'Political Leadership',
    'People Development': 'People Development', 
    'Peace & Security': 'Peace & Security',
    'Economic Development': 'Economic Development',
    'Climate & Disasters': 'Climate & Disasters',
    'Ocean & Environment': 'Ocean & Environment',
    'Technology': 'Technology'
  };

  const getLevel = (score: number): string => {
    if (score <= 1) return 'LOW';
    if (score === 2) return 'MED';
    return 'HIGH';
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'LOW': return 'bg-red-500/20 border-red-500 text-red-300';
      case 'MED': return 'bg-yellow-500/20 border-yellow-500 text-yellow-300';
      case 'HIGH': return 'bg-green-500/20 border-green-500 text-green-300';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-300';
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
        
        const [csvResponse, spiderMapResponse] = await Promise.all([
          fetch('/data/Mapping - Question BPC - Sheet1.csv'),
          fetch('/data/SpiderMap.json')
        ]);
        
        const [csvText, spiderMapData] = await Promise.all([
          csvResponse.text(),
          spiderMapResponse.json()
        ]);
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const matchedAnswers = selectedCodes.map((code: string) => 
              results.data.find((row: any) => row.code === code)
            ).filter(Boolean);
            
            setPlayerChoices(matchedAnswers);
            setSpiderMap(spiderMapData);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner message="Loading your thematic impact..." />
      </div>
    );
  }

  // Calculate theme counts
  const themeCounts: { [key: string]: number } = {};
  Object.keys(themeMapping).forEach(theme => {
    themeCounts[theme] = playerChoices.filter(choice => choice[theme] === '1').length;
  });

  return (
    <ErrorBoundary>
      <div className={`relative ${className} font-inter`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">
            Blue Pacific 2050 Reality
          </h1>
          
          <p className="text-xl md:text-2xl text-center mb-12 max-w-4xl mx-auto text-white">
            Your choices shaped Fiji's future across the seven pillars of the Blue Pacific 2050 Strategy. 
            Click on each theme to explore your impact.
          </p>

          {/* Interactive Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(themeMapping).map(([fullName, displayName]) => {
              const count = themeCounts[fullName] || 0;
              const level = getLevel(count);
              const isSelected = selectedTheme === fullName;
              
              return (
                <div
                  key={fullName}
                  className={`
                    relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    ${getLevelColor(level)}
                    ${isSelected ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'}
                  `}
                  onClick={() => setSelectedTheme(isSelected ? null : fullName)}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{displayName}</h3>
                    <div className="text-3xl font-bold mb-2">{count}</div>
                    <div className="text-sm uppercase tracking-wider font-semibold">
                      {level} Impact
                    </div>
                  </div>
                  
                  {/* Impact indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-4 h-4 rounded-full ${level === 'HIGH' ? 'bg-green-500' : level === 'MED' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Theme Details */}
          {selectedTheme && (
            <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                {themeMapping[selectedTheme]}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">Your Impact</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Choices Made:</span>
                      <span className="text-white font-semibold">{themeCounts[selectedTheme] || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Impact Level:</span>
                      <span className={`font-semibold ${getLevel(themeCounts[selectedTheme] || 0) === 'HIGH' ? 'text-green-400' : getLevel(themeCounts[selectedTheme] || 0) === 'MED' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {getLevel(themeCounts[selectedTheme] || 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">2050 Outcome</h3>
                  <p className="text-white/90 leading-relaxed">
                    {spiderMap && spiderMap[selectedTheme] && spiderMap[selectedTheme][getLevel(themeCounts[selectedTheme] || 0)]
                      ? spiderMap[selectedTheme][getLevel(themeCounts[selectedTheme] || 0)]
                      : 'This theme represents progress toward achieving the Blue Pacific 2050 vision.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
