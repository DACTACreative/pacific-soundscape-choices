import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-wave-foam">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-wave-foam/70">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <div className="w-full bg-ocean-deep/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-coral-warm h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <Card className={`p-8 bg-card/20 backdrop-blur-md border-ocean-light/30 shadow-deep transition-all duration-600 ${
          isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100 animate-fade-in'
        }`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-coral-warm mb-3 animate-wave-gentle">
              {currentQuestion.title}
            </h2>
            <p className="text-lg text-card-foreground leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="choice"
                size="choice"
                className="w-full text-left justify-start animate-bubble-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleOptionSelect(index)}
                disabled={isTransitioning}
              >
                <span className="leading-relaxed">{option.text}</span>
              </Button>
            ))}
          </div>

          {/* Visual enhancement - decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-wave opacity-30 animate-wave-gentle" />
        </Card>

        {/* Subtle score indicators (hidden but could be revealed for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 text-center text-xs text-wave-foam/50">
            Mitigation: {mitigationScore} | Resilience: {resilienceScore}
          </div>
        )}
      </div>
    </div>
  );
}