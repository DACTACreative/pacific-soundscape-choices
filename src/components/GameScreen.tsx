import { useState, useEffect, useRef } from 'react';
import { useAudio, Scenario } from '@/context/AudioContext';
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
  const [audioStarted, setAudioStarted] = useState(false);
  
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const { playScenario } = useAudio();

  const questions: GameQuestion[] = questionsData;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    let mounted = true;
    
    const initVanta = () => {
      if (!mounted || !vantaRef.current) {
        console.log('VANTA init failed: mounted =', mounted, 'vantaRef =', !!vantaRef.current);
        return;
      }
      
      // Ensure element has dimensions
      const element = vantaRef.current;
      const rect = element.getBoundingClientRect();
      console.log('Element dimensions:', rect.width, 'x', rect.height);
      
      if (rect.width === 0 || rect.height === 0) {
        console.log('Element has no dimensions, retrying...');
        setTimeout(initVanta, 100);
        return;
      }
      
      if (window.VANTA && window.THREE && !vantaEffect.current) {
        try {
          console.log('Initializing VANTA with element:', element);
          
          // Destroy any existing VANTA instances on this element
          if (element._vantaEffect) {
            element._vantaEffect.destroy();
          }
          
          vantaEffect.current = window.VANTA.TRUNK({
            el: element,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x000000,
            color: 0x0066cc,
            chaos: 4.0
          });
          
          console.log('VANTA initialized:', !!vantaEffect.current);
          
          // Force canvas to be visible
          if (vantaEffect.current && vantaEffect.current.renderer) {
            const canvas = vantaEffect.current.renderer.domElement;
            if (canvas) {
              canvas.style.position = 'absolute';
              canvas.style.top = '0';
              canvas.style.left = '0';
              canvas.style.width = '100%';
              canvas.style.height = '100%';
              canvas.style.zIndex = '-10';
              canvas.style.pointerEvents = 'none';
              console.log('Canvas styled:', canvas);
            }
          }
          
        } catch (error) {
          console.error('VANTA initialization error:', error);
        }
      } else {
        console.log('VANTA dependencies not ready:', {
          VANTA: !!window.VANTA,
          THREE: !!window.THREE,
          effect: !!vantaEffect.current
        });
      }
    };

    // Check if scripts are already loaded
    if (window.THREE && window.VANTA) {
      console.log('Scripts already loaded, initializing...');
      requestAnimationFrame(initVanta);
      return;
    }

    // Load scripts
    const loadScripts = async () => {
      try {
        // Load THREE.js first
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          console.log('THREE.js loaded');
        }

        // Load VANTA
        if (!window.VANTA) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.trunk.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          console.log('VANTA loaded');
        }

        // Initialize after a short delay to ensure DOM is ready
        setTimeout(() => {
          requestAnimationFrame(initVanta);
        }, 100);

      } catch (error) {
        console.error('Script loading failed:', error);
      }
    };

    loadScripts();

    return () => {
      mounted = false;
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.warn('Error destroying VANTA:', error);
        }
        vantaEffect.current = null;
      }
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
            
            // Start Scenario0 audio when the first question loads
            if (!audioStarted) {
              playScenario(Scenario.Scenario0);
              setAudioStarted(true);
            }
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
        <div ref={vantaRef} className="absolute inset-0 -z-10 w-full h-full animated-bg-fallback" data-vanta="true"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* VANTA Background with fallback */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 -z-10 w-full h-full animated-bg-fallback" 
        data-vanta="true"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10
        }}
      ></div>
      
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
              Selected Codes: {selectedAnswerCodes.join(', ')}<br/>
              VANTA Status: {vantaEffect.current ? 'Active' : 'Not Active'}<br/>
              THREE.js: {window.THREE ? 'Loaded' : 'Not Loaded'}<br/>
              VANTA: {window.VANTA ? 'Loaded' : 'Not Loaded'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}