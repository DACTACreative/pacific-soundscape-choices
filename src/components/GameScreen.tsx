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
import { AnswersReviewModal } from './AnswersReviewModal';

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
  points?: {
    Political_Leadership_and_Regionalism: number;
    People_Centered_Development: number;
    Peace_and_Security: number;
    Resource_and_Economic_Development: number;
    Climate_Change_and_Disasters: number;
    Ocean_and_Environment: number;
    Technology_and_Connectivity: number;
  };
  chart?: any;
  counter?: any;
}

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

interface GameSessionData {
  sessionId: string;
  timestamp: string;
  scenario: string;
  selectedAnswers: string[];
  finalThematicScores: ThematicScores;
  totalScore: number;
  answerDetails: Array<{
    questionCode: string;
    selectedAnswer: string;
    answerText: string;
    pointsEarned: ThematicScores;
  }>;
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
  const [thematicScores, setThematicScores] = useState<ThematicScores>({
    Political_Leadership_and_Regionalism: 0,
    People_Centered_Development: 0,
    Peace_and_Security: 0,
    Resource_and_Economic_Development: 0,
    Climate_Change_and_Disasters: 0,
    Ocean_and_Environment: 0,
    Technology_and_Connectivity: 0
  });
  const [showAnswersReview, setShowAnswersReview] = useState(false);
  
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
    // Load answers from new points-based JSON file
    const loadAnswersData = async () => {
      try {
        const response = await fetch('/data/ANSWERSMAPPING.6.json');
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

    // Update theme counts for display (backward compatibility)
    if (answerData && answerData.themecode) {
      const themeCodeMap: Record<string, string> = {
        'Political_Leadership_and_Regionalism': 'PLR',
        'People_Centered_Development': 'PCD', 
        'Peace_and_Security': 'PS',
        'Resource_and_Economic_Development': 'RED',
        'Climate_Change_and_Disasters': 'CCD',
        'Ocean_and_Environment': 'OE',
        'Technology_and_Connectivity': 'TC'
      };
      
      const shortCode = themeCodeMap[answerData.themecode] || answerData.themecode;
      setThemeCounts(prev => ({
        ...prev,
        [shortCode]: (prev[shortCode] || 0) + 1
      }));
    }

    // Update thematic scores using points system
    if (answerData?.points) {
      setThematicScores(prev => {
        const updated = { ...prev };
        Object.entries(answerData.points).forEach(([theme, points]) => {
          if (theme in updated) {
            updated[theme as keyof ThematicScores] += points;
          }
        });
        return updated;
      });
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
      // Game complete - prepare comprehensive session data
      const sessionId = crypto.randomUUID();
      const scenarioNum = Math.floor(Math.random() * 3) + 1;
      const totalScore = Object.values(thematicScores).reduce((sum, score) => sum + score, 0);
      
      // Build answer details for analytics
      const answerDetails = selectedAnswerCodes.map(code => {
        const answerData = answers[code];
        return {
          questionCode: answerData?.QuestionCode || '',
          selectedAnswer: code,
          answerText: answerData?.answer || '',
          pointsEarned: answerData?.points || {
            Political_Leadership_and_Regionalism: 0,
            People_Centered_Development: 0,
            Peace_and_Security: 0,
            Resource_and_Economic_Development: 0,
            Climate_Change_and_Disasters: 0,
            Ocean_and_Environment: 0,
            Technology_and_Connectivity: 0
          }
        };
      });

      const gameSessionData: GameSessionData = {
        sessionId,
        timestamp: new Date().toISOString(),
        scenario: `scenario${scenarioNum}`,
        selectedAnswers: selectedAnswerCodes,
        finalThematicScores: thematicScores,
        totalScore,
        answerDetails
      };

      // Store comprehensive data for analytics
      sessionStorage.setItem('selectedAnswerCodes', JSON.stringify(selectedAnswerCodes));
      sessionStorage.setItem('gameSessionData', JSON.stringify(gameSessionData));
      sessionStorage.setItem('thematicScores', JSON.stringify(thematicScores));
      
      console.log('Game session data:', gameSessionData);
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
        thematicScores={thematicScores}
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
              <div className="flex items-center gap-4">
                {selectedAnswerCodes.length > 0 && (
                  <button 
                    onClick={() => setShowAnswersReview(true)}
                    className="text-xs text-[#35c5f2] hover:text-[#35c5f2]/80 underline underline-offset-2 transition-colors"
                  >
                    Review Answers ({selectedAnswerCodes.length})
                  </button>
                )}
                <span className="text-sm text-white/60 font-light">
                  {Math.round(progressPercentage)}% complete
                </span>
              </div>
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

        {/* Answers Review Modal */}
        <AnswersReviewModal
          selectedAnswerCodes={selectedAnswerCodes}
          answers={answers}
          onClose={() => setShowAnswersReview(false)}
          isVisible={showAnswersReview}
        />

        {/* Debug Panel - Only in development */}
        {process.env.NODE_ENV === 'development' && <DebugPanel />}
      </div>
    </ErrorBoundary>
  );
}