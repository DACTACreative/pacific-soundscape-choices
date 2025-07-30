import React from 'react';
import { Progress } from './ui/progress';

interface ThemeCounts {
  [key: string]: number;
}

interface ThematicGaugesProps {
  themeCounts: ThemeCounts;
  totalQuestions: number;
}

const THEMES = [
  { code: 'PLR', name: 'Political Leadership', color: 'hsl(var(--primary))' },
  { code: 'PCD', name: 'People-Centered Development', color: 'hsl(var(--secondary))' },
  { code: 'PS', name: 'Peace & Security', color: 'hsl(var(--accent))' },
  { code: 'RED', name: 'Economic Development', color: 'hsl(var(--primary))' },
  { code: 'CCD', name: 'Climate & Disasters', color: 'hsl(var(--destructive))' },
  { code: 'OE', name: 'Ocean & Environment', color: 'hsl(var(--primary))' },
  { code: 'TC', name: 'Technology & Connectivity', color: 'hsl(var(--secondary))' }
];

export const ThematicGauges: React.FC<ThematicGaugesProps> = ({ 
  themeCounts, 
  totalQuestions 
}) => {
  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm border border-[#35c5f2]/30 rounded-lg p-3 max-w-xs w-auto z-40 hidden md:block">
      <h3 className="text-xs font-semibold text-[#35c5f2] mb-2">Thematic Focus</h3>
      <div className="space-y-2">
        {THEMES.map((theme) => {
          const count = themeCounts[theme.code] || 0;
          const percentage = totalQuestions > 0 ? (count / totalQuestions) * 100 : 0;
          
          return (
            <div key={theme.code} className="space-y-1">
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs text-white/80 truncate">{theme.name}</span>
                <span className="text-xs font-medium text-[#35c5f2]">{count}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: percentage > 0 ? '#35c5f2' : 'transparent'
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