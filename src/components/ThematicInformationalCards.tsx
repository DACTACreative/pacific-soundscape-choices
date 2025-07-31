import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { RotateCcw, Eye, Info } from 'lucide-react';

interface ThematicScores {
  Political_Leadership_and_Regionalism: number;
  People_Centered_Development: number;
  Peace_and_Security: number;
  Resource_and_Economic_Development: number;
  Climate_Change_and_Disasters: number;
  Ocean_and_Environment: number;
  Technology_and_Connectivity: number;
}

interface SpiderMapData {
  [key: string]: {
    LOW: string;
    MEDIUM: string;
    HIGH: string;
    AMBITION_TEXT: string;
  };
}

const THEMES = [
  { 
    key: 'Political_Leadership_and_Regionalism',
    name: 'Political Leadership & Regionalism',
    mapKey: 'Political Leadership and Regionalism'
  },
  { 
    key: 'People_Centered_Development',
    name: 'People-Centered Development',
    mapKey: 'People Centered Development'
  },
  { 
    key: 'Peace_and_Security',
    name: 'Peace & Security',
    mapKey: 'Peace and Security'
  },
  { 
    key: 'Resource_and_Economic_Development',
    name: 'Resource & Economic Development',
    mapKey: 'Resource and Economic Development'
  },
  { 
    key: 'Climate_Change_and_Disasters',
    name: 'Climate Change & Disasters',
    mapKey: 'Climate Change and Disasters'
  },
  { 
    key: 'Ocean_and_Environment',
    name: 'Ocean & Environment',
    mapKey: 'Ocean and Environment'
  },
  { 
    key: 'Technology_and_Connectivity',
    name: 'Technology & Connectivity',
    mapKey: 'Technology and Connectivity'
  }
];

const getOutcomeLevel = (score: number): 'LOW' | 'MEDIUM' | 'HIGH' => {
  if (score >= 4.5) return 'HIGH';
  if (score >= 3.0) return 'MEDIUM';
  return 'LOW';
};

interface FlippableCardProps {
  theme: typeof THEMES[0];
  score: number;
  spiderData: SpiderMapData;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ theme, score, spiderData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const outcomeLevel = getOutcomeLevel(score);
  const isAmbitionAchieved = score >= 4.5;
  const themeData = spiderData[theme.mapKey];

  return (
    <div className="relative w-full h-64 perspective-1000">
      <div 
        className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <Card 
          className={`absolute inset-0 backface-hidden bg-black/60 ${
            isAmbitionAchieved 
              ? 'border-[#35c5f2] border-2 shadow-lg shadow-[#35c5f2]/20' 
              : 'border-white/30'
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white/90 leading-tight">
              {theme.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#35c5f2]">
                {score.toFixed(1)}
              </div>
              <div className="text-sm text-white/60">
                / 7.0 points
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFlipped(true)}
                className="w-full text-xs bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Eye className="w-3 h-3 mr-1" />
                View My Outcome
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    View 2050 Ambition
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-white/20 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-[#35c5f2]">
                      2050 Ambition: {theme.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-white/90 leading-relaxed">
                      {themeData?.AMBITION_TEXT}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-black/60 border-white/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white/90 leading-tight">
              {theme.name} - Your Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#35c5f2] mb-2">
                {outcomeLevel}
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {themeData?.[outcomeLevel]}
              </p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFlipped(false)}
              className="w-full text-xs bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Return to Score
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ThematicInformationalCards: React.FC = () => {
  const [thematicScores, setThematicScores] = useState<ThematicScores | null>(null);
  const [spiderData, setSpiderData] = useState<SpiderMapData>({});

  useEffect(() => {
    const scores = sessionStorage.getItem('thematicScores');
    if (scores) {
      setThematicScores(JSON.parse(scores));
    }

    // Load Spider Map data
    fetch('/data/SpiderMap.json')
      .then(response => response.json())
      .then(data => setSpiderData(data))
      .catch(error => console.error('Error loading spider map data:', error));
  }, []);

  if (!thematicScores) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="bg-black/40 border border-white/20 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Your Thematic Engagement Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {THEMES.map((theme) => {
            const points = thematicScores[theme.key as keyof ThematicScores] || 0;
            return (
              <FlippableCard
                key={theme.key}
                theme={theme}
                score={points}
                spiderData={spiderData}
              />
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Cards with blue borders indicate themes where you achieved 4.5+ points
          </p>
        </div>
      </div>
    </div>
  );
};