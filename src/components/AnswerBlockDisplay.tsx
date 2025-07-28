import { useEffect, useState } from 'react';
import { DataVisualization } from './DataVisualization';
import BlockSection from './BlockSection';

interface AnswerData {
  code: string;
  themecode: string;
  theme: string;
  answer: string;
  narrative: string;
  impact: string;
  outcome: string;
  Question: string;
  QuestionCode: string;
  chart?: any;
  counter?: any;
  metrics?: any[];
}

const THEME_DISPLAY_ORDER = [
  "Political Leadership and Regionalism", 
  "People Centered Development", 
  "Peace and Security", 
  "Resource and Economic Development", 
  "Climate Change and Disasters", 
  "Ocean and Environment", 
  "Technology and Connectivity"
];

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // ocean wave
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", // starry night
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b", // building with waves
  "https://images.unsplash.com/photo-1501854140801-50d01698950b", // green mountains
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // laptop
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // monitor java
];

export default function AnswerBlockDisplay() {
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    if (selectedCodes.length === 0) {
      setLoading(false);
      return;
    }

    fetch('/data/ANSWERMAPPINGNEWjson.json')
      .then(res => res.json())
      .then(answersData => {
        const matchedAnswers = selectedCodes.map((code: string) => {
          const answerData = answersData[code];
          return answerData || null;
        }).filter((item): item is AnswerData => item !== null);
        setSelectedAnswers(matchedAnswers);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load answers data:', err);
        setSelectedAnswers([]);
        setLoading(false);
      });
  }, []);

  const answersByTheme = selectedAnswers.reduce((acc: Record<string, AnswerData[]>, answer) => {
    if (answer.theme) {
      if (!acc[answer.theme]) {
        acc[answer.theme] = [];
      }
      acc[answer.theme].push(answer);
    }
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg md:text-xl">Loading your choices...</div>
      </div>
    );
  }
  
  if (selectedAnswers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/70 text-lg md:text-xl">No choices were recorded for this session.</p>
      </div>
    );
  }

  let blockIndex = 0;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen">
      {/* Header Block */}
      <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 xl:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="text-center max-w-5xl relative z-10">
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20 mb-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Your Pacific Journey
              </h1>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light">
              The decisions that shaped our shared future
            </p>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Your choices during this journey reflect the seven pillars of the Blue Pacific 2050 Strategy – 
              each decision creating ripples across our region's future.
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Blocks */}
      {THEME_DISPLAY_ORDER.map(theme => {
        const themeAnswers = answersByTheme[theme] || [];
        if (themeAnswers.length === 0) return null;
        
        blockIndex++;
        const isImageLeft = blockIndex % 2 === 0;
        const imageUrl = PLACEHOLDER_IMAGES[blockIndex % PLACEHOLDER_IMAGES.length];

        return (
          <div key={theme}>
            {/* Theme Introduction Block */}
            <BlockSection 
              imageLeft={isImageLeft} 
              imageUrl={imageUrl}
              className="bg-gradient-to-br from-slate-900 to-blue-900"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20">
                    <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                      Blue Pacific Pillar
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {theme}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                    <p className="text-xl text-white/70">
                      {themeAnswers.length} decision{themeAnswers.length !== 1 ? 's' : ''} shaping this pillar
                    </p>
                  </div>
                </div>
                <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                  Each choice in this strategic area creates lasting impacts across our Pacific region, 
                  influencing communities, ecosystems, and future generations.
                </p>
              </div>
            </BlockSection>

            {/* Answer Blocks for this theme */}
            {themeAnswers.map((answer, answerIndex) => {
              blockIndex++;
              const answerImageLeft = blockIndex % 2 === 0;
              const answerImageUrl = PLACEHOLDER_IMAGES[(blockIndex + answerIndex) % PLACEHOLDER_IMAGES.length];

              return (
                <div key={answer.code}>
                  {/* Answer + Narrative Block */}
                  <BlockSection 
                    imageLeft={answerImageLeft} 
                    imageUrl={answerImageUrl}
                    className="bg-gradient-to-br from-slate-800 to-blue-800 border-t border-white/10"
                  >
                    <div className="space-y-8">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                          <span className="text-white font-bold text-lg">
                            {answer.QuestionCode}
                          </span>
                        </div>
                        <div>
                          <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                            Decision Point
                          </span>
                          <p className="text-white/70 text-sm">
                            Question {answer.QuestionCode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl" />
                        <div className="relative p-8 border border-blue-400/30 rounded-2xl backdrop-blur-sm">
                          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <h4 className="text-blue-300 text-xl font-bold uppercase tracking-wide">
                              Your Choice
                            </h4>
                          </div>
                          <p className="text-white text-xl leading-relaxed font-light">
                            {answer.answer}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <h4 className="text-2xl font-bold text-purple-300 uppercase tracking-wide">
                            The Story Unfolds
                          </h4>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-400/20">
                          <div className="text-xl text-white/90 leading-relaxed space-y-6">
                            {answer.narrative.split('\n\n').map((paragraph, i) => (
                              <p key={i} className="text-white/85 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlockSection>

                  {/* Impact + Outcome Block */}
                  <BlockSection 
                    imageLeft={!answerImageLeft} 
                    imageUrl={PLACEHOLDER_IMAGES[(blockIndex + 1) % PLACEHOLDER_IMAGES.length]}
                    className="bg-black border-t border-white/10"
                  >
                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl text-white font-light leading-relaxed">
                        Through this path, your decision advanced a key pillar of the 
                        <span className="text-[#35c5f2] font-bold block mt-2">
                          Blue Pacific 2050 Strategy:
                        </span>
                      </h3>
                      
                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border-2 border-green-300/30">
                        <h4 className="text-green-300 text-lg font-bold mb-3 uppercase tracking-wide">
                          Measured Outcome
                        </h4>
                        <p className="text-green-100 text-xl leading-relaxed">
                          {answer.outcome}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6 rounded-xl border border-orange-300/30">
                        <h4 className="text-orange-300 text-xl font-bold mb-4">Regional Impact</h4>
                        <div className="text-orange-100 text-lg leading-relaxed space-y-4">
                          {answer.impact.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Data Visualization */}
                      {(answer.chart || answer.counter || answer.metrics) && (
                        <div className="mt-6">
                          <DataVisualization 
                            chart={answer.chart} 
                            counter={answer.counter} 
                            metrics={answer.metrics} 
                          />
                        </div>
                      )}
                    </div>
                  </BlockSection>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}