import { useState, useEffect, useRef } from 'react';
import questionsData from '@/data/questions.json';
import Papa from 'papaparse';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

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
  
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const questions: GameQuestion[] = questionsData;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Initialize VANTA background
    const initVanta = () => {
      if (window.VANTA && window.THREE && !vantaEffect.current && vantaRef.current) {
        try {
          vantaEffect.current = window.VANTA.TRUNK({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x000000,
            color: 0x1149ac,
            chaos: 3.0,
          });
        } catch (error) {
          console.error('VANTA initialization error:', error);
        }
      }
    };

    // Load scripts with proper version compatibility
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadVanta = async () => {
      try {
        // Use a specific compatible version of THREE.js
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
        }
        if (!window.VANTA) {
          await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.trunk.min.js');
        }
        // Give scripts time to load and register
        setTimeout(initVanta, 200);
      } catch (error) {
        console.error('Failed to load VANTA:', error);
      }
    };

    loadVanta();

    return () => {
      // Safe cleanup
      if (vantaEffect.current && vantaRef.current && document.contains(vantaRef.current)) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn('Error destroying VANTA effect:', error);
        }
      }
      vantaEffect.current = null;
    };
  }, []);

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
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 -z-10 w-full h-full"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* VANTA Background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10 w-full h-full"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl text-center px-6">
          
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-light tracking-wider text-white/70 uppercase">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-white/60 font-light">
                {Math.round(progressPercentage)}% complete
              </span>
            </div>
            <div className="w-full bg-white/20 h-0.5 relative">
              <div 
                className="absolute top-0 left-0 h-0.5 bg-white transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className={`transition-all duration-800 ${
            isTransitioning ? 'opacity-30 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
            
            {/* Question text */}
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-white">
              {currentQuestion.Question}
            </h1>

            {/* Options */}
            <div className="space-y-6">
              {currentQuestion.options.map((optionCode, index) => {
                const answerObj = answers[optionCode];
                return (
                  <button
                    key={index}
                    className="group relative w-full py-6 px-8 text-2xl md:text-3xl font-bold bg-transparent border-4 border-[#003f7f] text-[#003f7f] hover:text-white overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleOptionSelect(index)}
                    disabled={isTransitioning}
                  >
                    <span className="absolute inset-0 bg-[#003f7f] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10">
                      {answerObj?.answer || optionCode}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 text-center text-xs text-white/30 font-light tracking-wider">
              Selected Codes: {selectedAnswerCodes.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}