import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio, Scenario } from '@/context/AudioContext';
import questionsData from '@/data/questions.json';
import Papa from 'papaparse';
import DebugPanel from './DebugPanel';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import { NarrativeCard } from './NarrativeCard';
import { OutcomeCard } from './OutcomeCard';
import { ThematicGauges } from './ThematicGauges';

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
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerCodes, setSelectedAnswerCodes] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<Record<string, GameAnswer>>({});
  const [loading, setLoading] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const [showNarrativeCard, setShowNarrativeCard] = useState(false);
  const [showOutcomeCard, setShowOutcomeCard] = useState(false);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<GameAnswer | null>(null);
  const [themeCounts, setThemeCounts] = useState<{ [key: string]: number }>({});
  
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

    // Load scripts with retry logic
    const loadScripts = async () => {
      let scriptRetries = 0;
      const maxScriptRetries = 2;
      
      const loadScriptWithRetry = async (url: string, name: string, checkFn: () => boolean) => {
        while (scriptRetries < maxScriptRetries && !checkFn()) {
          try {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = url;
              script.onload = resolve;
              script.onerror = reject;
              script.onerror = () => reject(new Error(`Failed to load ${name}`));
              document.head.appendChild(script);
            });
            console.log(`${name} loaded successfully`);
            break;
          } catch (error) {
            scriptRetries++;
            console.warn(`${name} load attempt ${scriptRetries} failed:`, error);
            if (scriptRetries >= maxScriptRetries) {
              console.error(`Failed to load ${name} after ${maxScriptRetries} attempts`);
              return false;
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * scriptRetries));
          }
        }
        return checkFn();
      };

      try {
        // Load THREE.js first
        if (!window.THREE) {
          const threeLoaded = await loadScriptWithRetry(
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
            'THREE.js',
            () => !!window.THREE
          );
          if (!threeLoaded) {
            console.warn('THREE.js failed to load, VANTA will not work');
            return;
          }
        }

        // Reset retry counter for VANTA
        scriptRetries = 0;

        // Load VANTA
        if (!window.VANTA) {
          const vantaLoaded = await loadScriptWithRetry(
            'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.trunk.min.js',
            'VANTA',
            () => !!window.VANTA
          );
          if (!vantaLoaded) {
            console.warn('VANTA failed to load, using fallback background');
            return;
          }
        }

        // Initialize after ensuring scripts are loaded
        setTimeout(() => {
          requestAnimationFrame(initVanta);
        }, 100);

      } catch (error) {
        console.error('Script loading failed completely:', error);
        // Fallback: just use the CSS animated background
        console.log('Using CSS fallback background');
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
    // Load answers from JSON file instead of CSV for better reliability
    const loadAnswersData = async () => {
      try {
        const response = await fetch('/data/answers.json');
        if (!response.ok) {
          throw new Error(`Failed to load answers: ${response.status}`);
        }
        const answersData = await response.json();
        setAnswers(answersData);
        setLoading(false);
        
        // Start audio after successful data load
        if (!audioStarted) {
          try {
            playScenario(Scenario.Scenario0);
            setAudioStarted(true);
          } catch (audioError) {
            console.warn('🔊 Audio start failed:', audioError);
          }
        }
      } catch (error) {
        console.error('🚨 Failed to load answers JSON:', error);
        // Create minimal fallback answers
        const fallbackAnswers: Record<string, GameAnswer> = {};
        
        questions.forEach((question) => {
          question.options.forEach((optionCode, index) => {
            fallbackAnswers[optionCode] = {
              code: optionCode,
              themecode: '',
              answer: `Option ${index + 1}`,
              theme: 'General Pacific Development',
              QuestionCode: question.QuestionCode,
              Question: question.Question,
              outcome: 'Mixed outcomes for Pacific communities',
              impact: 'Moderate impact on regional development',
              narrative: 'This choice contributes to Pacific Island resilience and sustainability.'
            };
          });
        });
        
        setAnswers(fallbackAnswers);
        setLoading(false);
      }
    };
    
    loadAnswersData();
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    const answerCode = currentQuestion.options[optionIndex];
    const answerData = answers[answerCode];
    const updatedCodes = [...selectedAnswerCodes, answerCode];
    setSelectedAnswerCodes(updatedCodes);

    // Update theme counts
    if (answerData && answerData.themecode) {
      setThemeCounts(prev => ({
        ...prev,
        [answerData.themecode]: (prev[answerData.themecode] || 0) + 1
      }));
    }

    // Set current answer and show narrative card
    setCurrentSelectedAnswer(answerData);
    setShowNarrativeCard(true);
  };

  const handleNarrativeContinue = () => {
    setShowNarrativeCard(false);
    setShowOutcomeCard(true);
  };

  const handleOutcomeContinue = () => {
    setShowOutcomeCard(false);
    setCurrentSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game complete - store only answer codes
      sessionStorage.setItem('selectedAnswerCodes', JSON.stringify(selectedAnswerCodes));
      
      // Redirect to random scenario (1, 2, or 3)
      const scenarioNum = Math.floor(Math.random() * 3) + 1;
      console.log('Redirecting to scenario:', scenarioNum);
      navigate(`/scenario-${scenarioNum}`);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 -z-10 w-full h-full animated-bg-fallback" data-vanta="true"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner message="Loading your Pacific journey..." />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black text-white overflow-hidden font-inter">
        {/* VANTA Background with enhanced fallback */}
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
      
      {/* Thematic Gauges */}
      <ThematicGauges 
        themeCounts={themeCounts} 
        totalQuestions={currentQuestionIndex + 1}
      />

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
                    className="group relative w-full py-4 px-6 text-lg md:text-xl lg:text-2xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleOptionSelect(index)}
                    disabled={isTransitioning || showNarrativeCard || showOutcomeCard}
                  >
                    <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 break-words">
                      {answerObj?.answer || `Loading... (${optionCode})`}
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
      
        {/* Narrative Card */}
        <NarrativeCard
          narrative={currentSelectedAnswer?.narrative || ''}
          onContinue={handleNarrativeContinue}
          isVisible={showNarrativeCard}
        />

        {/* Outcome Card */}
        <OutcomeCard
          outcome={currentSelectedAnswer?.outcome || ''}
          impact={currentSelectedAnswer?.impact || ''}
          theme={currentSelectedAnswer?.theme || ''}
          onContinue={handleOutcomeContinue}
          isVisible={showOutcomeCard}
        />

        {/* Debug Panel - Only in development */}
        {process.env.NODE_ENV === 'development' && <DebugPanel />}
      </div>
    </ErrorBoundary>
  );
}