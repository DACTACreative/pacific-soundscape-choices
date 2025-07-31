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

const SCENARIO_IMAGES = [
  "/src/data/Scenario-a.png",
  "/src/data/Scenario-b.png", 
  "/src/data/Scenario-c.png",
  "/src/data/Scenario-d.png",
  "/src/data/Scenario-e.png",
  "/src/data/Scenario-f.png",
  "/src/data/Scenario-g.png",
  "/src/data/Scenario-h.png",
  "/src/data/Scenario-i.png",
  "/src/data/Scenario-j.png",
  "/src/data/Scenario-k.png",
  "/src/data/Scenario-l.png",
  "/src/data/Scenario-m.png",
  "/src/data/Scenario-n.png",
  "/src/data/Scenario-o.png",
  "/src/data/Scenario-p.png",
  "/src/data/Scenario-q.png",
  "/src/data/Scenario-r.png",
  "/src/data/Scenario-s.png",
  "/src/data/Scenario-t.png",
  "/src/data/Scenario-u.png",
  "/src/data/Scenario-v.png"
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
    <div className="bg-black text-white min-h-screen">

      {/* Theme Blocks */}
      {THEME_DISPLAY_ORDER.map(theme => {
        const themeAnswers = answersByTheme[theme] || [];
        if (themeAnswers.length === 0) return null;
        
        blockIndex++;
        const isImageLeft = blockIndex % 2 === 0;
        const imageUrl = SCENARIO_IMAGES[blockIndex % SCENARIO_IMAGES.length];

        return (
          <div key={theme}>
            {/* Theme Introduction Block */}
            <BlockSection 
              imageLeft={isImageLeft} 
              imageUrl={imageUrl}
              className="bg-black"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-black border border-white/20 rounded-full">
                    <span className="text-white text-sm font-medium uppercase tracking-wider">
                      Blue Pacific Pillar
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {theme}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-1 bg-white rounded-full" />
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
              const answerImageUrl = SCENARIO_IMAGES[(blockIndex + answerIndex) % SCENARIO_IMAGES.length];

              return (
                <div key={answer.code}>
                  {/* Answer + Narrative Block */}
                  <BlockSection 
                    imageLeft={answerImageLeft} 
                    imageUrl={answerImageUrl}
                    className="bg-black border-t border-white/10"
                  >
                    <div className="space-y-8">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                          <span className="text-black font-bold text-lg">
                            {answer.QuestionCode}
                          </span>
                        </div>
                        <div>
                          <span className="text-white text-sm font-medium uppercase tracking-wider">
                            Decision Point
                          </span>
                          <p className="text-white/70 text-sm">
                            Question {answer.QuestionCode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="relative p-8 border border-white/30 rounded-2xl bg-black">
                          <div className="flex items-center space-x-3 mb-6">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <h4 className="text-white text-xl font-bold uppercase tracking-wide">
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
                          <div className="w-2 h-2 bg-white rounded-full" />
                          <h4 className="text-2xl font-bold text-white uppercase tracking-wide">
                            The Story Unfolds
                          </h4>
                        </div>
                        <div className="bg-black p-8 rounded-2xl border border-white/20">
                          <div className="text-xl text-white leading-relaxed space-y-6">
                            {answer.narrative.split('\n\n').map((paragraph, i) => (
                              <p key={i} className="text-white leading-relaxed">
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
                    imageUrl={SCENARIO_IMAGES[(blockIndex + 1) % SCENARIO_IMAGES.length]}
                    className="bg-black border-t border-white/10"
                  >
                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl text-white font-light leading-relaxed">
                        Through this path, your decision advanced a key pillar of the 
                        <span className="text-[#35c5f2] font-bold block mt-2">
                          Blue Pacific 2050 Strategy:
                        </span>
                      </h3>
                      
                      <div className="bg-black p-6 rounded-xl border border-white/30">
                        <h4 className="text-white text-lg font-bold mb-3 uppercase tracking-wide">
                          Measured Outcome
                        </h4>
                        <p className="text-white text-xl leading-relaxed">
                          {answer.outcome}
                        </p>
                      </div>

                      <div className="bg-black p-6 rounded-xl border border-white/30">
                        <h4 className="text-white text-xl font-bold mb-4">Regional Impact</h4>
                        <div className="text-white text-lg leading-relaxed space-y-4">
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