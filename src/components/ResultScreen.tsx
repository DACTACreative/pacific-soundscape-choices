import { useEffect, useState } from 'react';
import answersData from '@/data/answers.json';

interface ResultScreenProps {}

export default function ResultScreen({}: ResultScreenProps) {
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get game data from sessionStorage
    const storedData = sessionStorage.getItem('gameResults');
    if (storedData) {
      setGameData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
        <div className="text-wave-foam text-xl">Loading your results...</div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
        <div className="text-wave-foam text-xl">No game data found. Please restart the game.</div>
      </div>
    );
  }

  const { themeCounts, themeAnswers, userJourney } = gameData;
  const answers = answersData;

  return (
    <div className="min-h-screen bg-gradient-ocean relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/95 to-ocean-deep" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-wide text-wave-foam mb-6">
            Your Pacific Journey
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light tracking-wide text-accent mb-4">
            Choices that shape 2050
          </p>
        </div>

        {/* Theme Scores Spider Chart */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-12 text-center tracking-wide">
            Your Focus Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(themeCounts).map(([themeCode, count]: [string, any]) => {
              const themeDisplayName = themeCode.replace(/_/g, ' ');
              const intensity = count === 0 ? 'none' : count === 1 ? 'low' : count === 2 ? 'medium' : 'high';
              
              return (
                <div 
                  key={themeCode}
                  className="p-8 border border-ocean-light/20 bg-transparent backdrop-blur-sm hover:border-accent/40 transition-all duration-700 ease-out"
                >
                  <div className="text-center">
                    <h3 className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-3">
                      {themeDisplayName}
                    </h3>
                    <div className="text-3xl font-light text-accent mb-4">
                      {count} choice{count !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-card-foreground/70 mb-4">
                      Focus: {intensity}
                    </div>
                    
                    {/* Show selected answers for this theme */}
                    {themeAnswers[themeCode] && themeAnswers[themeCode].length > 0 && (
                      <div className="mt-4 space-y-2">
                        {themeAnswers[themeCode].map((answerCode: string) => {
                          const answer = answers[answerCode];
                          return (
                            <div key={answerCode} className="text-xs text-card-foreground/60 p-2 border border-accent/10 bg-accent/5">
                              <div className="font-semibold text-accent/80">{answer?.outcome}</div>
                              <div className="text-xs mt-1">{answer?.impact}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Journey */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-12 text-center tracking-wide">
            Your Decision Journey
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {userJourney.map((step: any, index: number) => (
              <div 
                key={index}
                className="p-6 border border-ocean-light/20 bg-transparent backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase">
                    {step.question_code}
                  </span>
                  <span className="text-sm text-accent font-light">
                    {step.outcome}
                  </span>
                </div>
                <p className="text-lg text-card-foreground/80 mb-2">
                  {step.impact}
                </p>
                <p className="text-sm text-card-foreground/60">
                  {step.narrative}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-extralight text-coral-warm mb-8 tracking-wide">
            Your Pacific Future Awaits
          </h2>
          <p className="text-lg text-card-foreground/70 mb-8 max-w-2xl mx-auto">
            Every choice you made shapes the Pacific's tomorrow. The data shows the impact, but the future remains unwritten.
          </p>
          
          <div className="space-x-8">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-500 font-light tracking-wider uppercase"
            >
              Play Again
            </button>
            <button 
              onClick={() => {
                const scenarioNum = Math.ceil(Math.random() * 3);
                window.location.href = `/scenario-${scenarioNum}`;
              }}
              className="px-8 py-4 bg-coral-warm/20 border border-coral-warm/40 text-coral-warm hover:bg-coral-warm/30 transition-all duration-500 font-light tracking-wider uppercase"
            >
              See A Future Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}