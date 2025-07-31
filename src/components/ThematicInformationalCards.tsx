import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { 
  RotateCcw, 
  Eye, 
  Info, 
  Crown, 
  Users, 
  Shield, 
  TrendingUp, 
  CloudRain, 
  Waves, 
  Zap,
  Star
} from 'lucide-react';

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
    mapKey: 'Political Leadership and Regionalism',
    icon: Crown
  },
  { 
    key: 'People_Centered_Development',
    name: 'People-Centered Development',
    mapKey: 'People Centered Development',
    icon: Users
  },
  { 
    key: 'Peace_and_Security',
    name: 'Peace & Security',
    mapKey: 'Peace and Security',
    icon: Shield
  },
  { 
    key: 'Resource_and_Economic_Development',
    name: 'Resource & Economic Development',
    mapKey: 'Resource and Economic Development',
    icon: TrendingUp
  },
  { 
    key: 'Climate_Change_and_Disasters',
    name: 'Climate Change & Disasters',
    mapKey: 'Climate Change and Disasters',
    icon: CloudRain
  },
  { 
    key: 'Ocean_and_Environment',
    name: 'Ocean & Environment',
    mapKey: 'Ocean and Environment',
    icon: Waves
  },
  { 
    key: 'Technology_and_Connectivity',
    name: 'Technology & Connectivity',
    mapKey: 'Technology and Connectivity',
    icon: Zap
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
  const IconComponent = theme.icon;

  return (
    <div className="relative w-full h-80 perspective-1000">
      <div 
        className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <Card 
          className={`absolute inset-0 backface-hidden bg-black/40 backdrop-blur-sm relative ${
            isAmbitionAchieved 
              ? 'border-[#35c5f2] border-2' 
              : 'border-slate-600/40'
          }`}
        >
          {/* Ambition Met Badge - Outside the card */}
          {isAmbitionAchieved && (
            <div className="absolute -top-2 -right-2 bg-[#35c5f2] text-black text-xs font-medium px-2 py-1 rounded z-10">
              ★ AMBITION MET
            </div>
          )}
          
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-white/90 leading-tight flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-white/70" />
              {theme.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">
                {score.toFixed(1)}
              </div>
              <div className="text-sm text-white/50 font-light">
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
                <DialogContent className="bg-slate-900/95 backdrop-blur-sm border-slate-600/50 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-[#35c5f2] flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
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
        <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900/60 backdrop-blur-sm border-slate-600/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-white/90 leading-tight">
              {theme.name} - Your Outcome
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-4">
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
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-600/50 rounded-lg p-8">
        <h3 className="text-3xl font-bold text-white mb-4 text-center">
          Your Thematic Engagement Analysis
        </h3>
        <p className="text-lg text-white/80 leading-relaxed text-center mb-8 max-w-4xl mx-auto">
          Below is an analysis of the future you have shaped through your policy choices. Each theme has been scored out of a maximum of 7.0 points based on your decisions. Your goal was to build a balanced and prosperous future by meeting the strategic goals for every area.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="mt-8 text-center">
          <p className="text-sm text-white/70 font-medium">
            A blue border indicates you have successfully achieved the Level of Ambition for that theme.
          </p>
        </div>
      </div>
    </div>
  );
};