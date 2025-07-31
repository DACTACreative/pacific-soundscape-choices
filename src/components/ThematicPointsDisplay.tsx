import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ThematicScores {
  Political_Leadership_and_Regionalism: number;
  People_Centered_Development: number;
  Peace_and_Security: number;
  Resource_and_Economic_Development: number;
  Climate_Change_and_Disasters: number;
  Ocean_and_Environment: number;
  Technology_and_Connectivity: number;
}

const THEMES = [
  { 
    key: 'Political_Leadership_and_Regionalism',
    name: 'Political Leadership & Regionalism'
  },
  { 
    key: 'People_Centered_Development',
    name: 'People-Centered Development'
  },
  { 
    key: 'Peace_and_Security',
    name: 'Peace & Security'
  },
  { 
    key: 'Resource_and_Economic_Development',
    name: 'Resource & Economic Development'
  },
  { 
    key: 'Climate_Change_and_Disasters',
    name: 'Climate Change & Disasters'
  },
  { 
    key: 'Ocean_and_Environment',
    name: 'Ocean & Environment'
  },
  { 
    key: 'Technology_and_Connectivity',
    name: 'Technology & Connectivity'
  }
];

export const ThematicPointsDisplay: React.FC = () => {
  const [thematicScores, setThematicScores] = React.useState<ThematicScores | null>(null);

  React.useEffect(() => {
    const scores = sessionStorage.getItem('thematicScores');
    if (scores) {
      setThematicScores(JSON.parse(scores));
    }
  }, []);

  if (!thematicScores) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="bg-black/40 border border-white/20 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Your Thematic Engagement Points
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEMES.map((theme) => {
            const points = thematicScores[theme.key as keyof ThematicScores] || 0;
            return (
              <Card key={theme.key} className="bg-black/60 border-white/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/90 leading-tight">
                    {theme.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-[#35c5f2]">
                    {points.toFixed(1)}
                  </div>
                  <div className="text-xs text-white/60">
                    points
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};