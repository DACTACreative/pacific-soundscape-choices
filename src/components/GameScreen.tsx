import { useState, useEffect } from 'react';
import questionsData from '@/data/questions.json';
import Papa from 'papaparse';

interface GameQuestion {
  QuestionCode: string;
  Question: string;
  options: string[];
}

interface GameAnswer {
  code: string;
  themecode: string;
  answer: string;
  theme: string;
  QuestionCode: string;
  Question: string;
  outcome: string;
  impact: string;
  narrative: string;
}

interface ThemeCounts {
  [key: string]: number;
}

interface ThemeAnswers {
  [key: string]: string[];
}

interface GameScreenProps {
  onComplete: (selectedAnswerCodes: string[]) => void;
}

export default function GameScreen({ onComplete }: GameScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerCodes, setSelectedAnswerCodes] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<Record<string, GameAnswer>>({});
  const [loading, setLoading] = useState(true);

  const questions: GameQuestion[] = questionsData;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Load the mapping CSV
    fetch('/data/Mapping - Question BPC - Sheet1.csv')
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const answersMap: Record<string, GameAnswer> = {};
            results.data.forEach((row: any) => {
              if (row.code) {
                answersMap[row.code] = {
                  code: row.code,
                  themecode: row.themecode,
                  answer: row.answer,
                  theme: row.theme,
                  QuestionCode: row.QuestionCode,
                  Question: row.Question,
                  outcome: row.outcome,
                  impact: row.impact,
                  narrative: row.narrative
                };
              }
            });
            setAnswers(answersMap);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error('Failed to load mapping CSV:', err);
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    setIsTransitioning(true);
    
    const answerCode = currentQuestion.options[optionIndex];
    const updatedCodes = [...selectedAnswerCodes, answerCode];
    setSelectedAnswerCodes(updatedCodes);

    // Delay transition for visual feedback
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      } else {
        // Game complete - store only answer codes
        sessionStorage.setItem('selectedAnswerCodes', JSON.stringify(updatedCodes));
        
        // Redirect to random scenario (1, 2, or 3)
        const scenarioNum = Math.floor(Math.random() * 3) + 1;
        console.log('Redirecting to scenario:', scenarioNum);
        window.location.href = `/scenario-${scenarioNum}`;
      }
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-ocean relative overflow-hidden flex items-center justify-center">
        <div className="text-wave-foam text-xl">Loading game...</div>
      </div>
    );
  }

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
          
          {/* Question text */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl font-light text-card-foreground/90 leading-relaxed text-center">
              {currentQuestion.Question}
            </p>
          </div>

          {/* Options */}
          <div className="max-w-2xl mx-auto space-y-6">
            {currentQuestion.options.map((optionCode, index) => {
              const answerObj = answers[optionCode];
              return (
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
                    {answerObj?.answer || optionCode}
                  </span>
                  
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-coral-warm/5 to-transparent 
                                transform translate-x-[-100%] group-hover:translate-x-[100%] 
                                transition-transform duration-1000 pointer-events-none" />
                </button>
              );
            })}
          </div>

          {/* Subtle atmospheric element */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ocean-light/5 to-transparent pointer-events-none" />
        </div>

        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 text-center text-xs text-wave-foam/30 font-extralight tracking-wider">
            Selected Codes: {selectedAnswerCodes.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}