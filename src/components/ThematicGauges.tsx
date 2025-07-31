import React from 'react';
import { Progress } from './ui/progress';

interface ThemeCounts {
  [key: string]: number;
}

interface ThematicScores {
  Political_Leadership_and_Regionalism: number;
  People_Centered_Development: number;
  Peace_and_Security: number;
  Resource_and_Economic_Development: number;
  Climate_Change_and_Disasters: number;
  Ocean_and_Environment: number;
  Technology_and_Connectivity: number;
}

interface ThematicGaugesProps {
  themeCounts: ThemeCounts;
  thematicScores?: ThematicScores;
  totalQuestions: number;
}

const THEMES = [
  { 
    code: 'PLR', 
    name: 'Political Leadership', 
    fullKey: 'Political_Leadership_and_Regionalism',
    color: 'hsl(var(--primary))' 
  },
  { 
    code: 'PCD', 
    name: 'People-Centered Development', 
    fullKey: 'People_Centered_Development',
    color: 'hsl(var(--secondary))' 
  },
  { 
    code: 'PS', 
    name: 'Peace & Security', 
    fullKey: 'Peace_and_Security',
    color: 'hsl(var(--accent))' 
  },
  { 
    code: 'RED', 
    name: 'Economic Development', 
    fullKey: 'Resource_and_Economic_Development',
    color: 'hsl(var(--primary))' 
  },
  { 
    code: 'CCD', 
    name: 'Climate & Disasters', 
    fullKey: 'Climate_Change_and_Disasters',
    color: 'hsl(var(--destructive))' 
  },
  { 
    code: 'OE', 
    name: 'Ocean & Environment', 
    fullKey: 'Ocean_and_Environment',
    color: 'hsl(var(--primary))' 
  },
  { 
    code: 'TC', 
    name: 'Technology & Connectivity', 
    fullKey: 'Technology_and_Connectivity',
    color: 'hsl(var(--secondary))' 
  }
];

export const ThematicGauges: React.FC<ThematicGaugesProps> = ({ 
  themeCounts, 
  thematicScores,
  totalQuestions 
}) => {
  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm border border-[#35c5f2]/30 rounded-lg p-3 max-w-xs w-auto z-40 hidden md:block">
      <h3 className="text-xs font-semibold text-[#35c5f2] mb-2">Thematic Engagement</h3>
      <div className="space-y-2">
        {THEMES.map((theme) => {
          const count = themeCounts[theme.code] || 0;
          const points = thematicScores?.[theme.fullKey as keyof typeof thematicScores] || 0;
          const maxPossible = 7; // Maximum points per theme
          const percentage = maxPossible > 0 ? (points / maxPossible) * 100 : 0;
          
          return (
            <div key={theme.code} className="space-y-1">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs text-white/80 truncate">{theme.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-white/60">{count}</span>
                  <span className="text-xs font-medium text-[#35c5f2]">{points.toFixed(1)}</span>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: points > 0 ? '#35c5f2' : 'transparent'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};