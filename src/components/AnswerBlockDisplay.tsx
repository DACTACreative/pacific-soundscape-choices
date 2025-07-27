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
    <div className="bg-black text-white">
      {/* Header Block */}
      <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Your Choices for the Pacific Future
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            These are the decisions you made during your journey, organized by the seven pillars of the Blue Pacific 2050 Strategy.
          </p>
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
              className="bg-black"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  {theme}
                </h2>
                <p className="text-xl text-white/70">
                  {themeAnswers.length} choice{themeAnswers.length !== 1 ? 's' : ''} made in this pillar of the Blue Pacific 2050 Strategy
                </p>
                <div className="w-32 h-1 bg-[#35c5f2] rounded-full"></div>
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
                    className="bg-black border-t border-white/10"
                  >
                    <div className="space-y-6">
                      <div className="mb-6">
                        <span className="text-[#35c5f2] text-lg font-medium">
                          Question {answer.QuestionCode}
                        </span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-[#35c5f2]/20 to-transparent p-6 rounded-xl border-l-4 border-[#35c5f2]">
                        <h4 className="text-[#35c5f2] text-xl font-bold mb-4">Your Choice</h4>
                        <p className="text-white text-lg leading-relaxed">
                          {answer.answer}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-purple-300">The Story</h4>
                        <div className="text-lg text-white/90 leading-relaxed space-y-4">
                          {answer.narrative.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
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