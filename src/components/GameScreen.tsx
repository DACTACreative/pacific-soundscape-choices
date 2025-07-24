import { useState, useEffect } from 'react';
import questionsData from '@/data/questions.json';

interface Question {
  id: number;
  title: string;
  question: string;
  options: Array<{
    text: string;
    effects: {
      mitigation: number;
      resilience: number;
    };
  }>;
}

interface GameScreenProps {
  onComplete: (mitigationScore: number, resilienceScore: number) => void;
}

export default function GameScreen({ onComplete }: GameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mitigationScore, setMitigationScore] = useState(0);
  const [resilienceScore, setResilienceScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions: Question[] = questionsData;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (choiceIndex: number) => {
    setIsTransitioning(true);
    
    const effects = currentQuestion.options[choiceIndex].effects;
    const newMitigationScore = mitigationScore + effects.mitigation;
    const newResilienceScore = resilienceScore + effects.resilience;
    
    setMitigationScore(newMitigationScore);
    setResilienceScore(newResilienceScore);

    // Delay transition for visual feedback
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      } else {
        // Game complete
        onComplete(newMitigationScore, newResilienceScore);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-ocean relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/95 to-ocean-deep" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Progress indicator */}
        <div className="mb-16 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-extralight tracking-wider text-wave-foam/70 uppercase">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-coral-warm/60 font-light">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <div className="w-full bg-ocean-deep/50 h-px relative">
            <div 
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-coral-warm via-accent to-wave-foam transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={`transition-all duration-800 ${
          isTransitioning ? 'opacity-30 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          
          {/* Question title */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-6 tracking-wide">
              {currentQuestion.title}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-coral-warm/50 to-transparent mx-auto mb-8" />
          </div>

          {/* Question text */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl font-light text-card-foreground/90 leading-relaxed text-center">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="max-w-2xl mx-auto space-y-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`group relative w-full p-8 text-left
                           bg-transparent border border-ocean-light/20 backdrop-blur-sm
                           hover:border-coral-warm/40 hover:bg-ocean-light/5
                           transition-all duration-700 ease-out
                           animate-fade-in
                           before:absolute before:inset-0 before:border before:border-coral-warm/10 
                           before:scale-95 before:opacity-0 before:transition-all before:duration-500
                           hover:before:scale-100 hover:before:opacity-100
                           disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                onClick={() => handleOptionSelect(index)}
                disabled={isTransitioning}
              >
                <span className="relative z-10 text-lg font-light text-card-foreground/80 group-hover:text-wave-foam leading-relaxed tracking-wide">
                  {option.text}
                </span>
                
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-coral-warm/5 to-transparent 
                              transform translate-x-[-100%] group-hover:translate-x-[100%] 
                              transition-transform duration-1000 pointer-events-none" />
              </button>
            ))}
          </div>

          {/* Subtle atmospheric element */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ocean-light/5 to-transparent pointer-events-none" />
        </div>

        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 text-center text-xs text-wave-foam/30 font-extralight tracking-wider">
            Mitigation: {mitigationScore} | Resilience: {resilienceScore}
          </div>
        )}
      </div>
    </div>
  );
}