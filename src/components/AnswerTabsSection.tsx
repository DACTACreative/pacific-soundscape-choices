import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DataVisualization } from './DataVisualization';
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
const THEME_DISPLAY_ORDER = ["Political Leadership and Regionalism", "People Centered Development", "Peace and Security", "Resource and Economic Development", "Climate Change and Disasters", "Ocean and Environment", "Technology and Connectivity"];
export default function AnswerTabsSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Load selected answer codes from sessionStorage
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    if (selectedCodes.length === 0) {
      setLoading(false);
      return;
    }

    // Load ANSWERMAPPINGNEWjson.json data
    fetch('/data/ANSWERMAPPINGNEWjson.json').then(res => res.json()).then(answersData => {
      // Find matching answers for selected codes
      const matchedAnswers = selectedCodes.map((code: string) => {
        const answerData = answersData[code];
        return answerData || null;
      }).filter((item): item is AnswerData => item !== null);
      setSelectedAnswers(matchedAnswers);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load answers data:', err);
      setSelectedAnswers([]);
      setLoading(false);
    });
  }, []);

  // Group answers by theme
  const answersByTheme = selectedAnswers.reduce((acc: Record<string, AnswerData[]>, answer) => {
    if (answer.theme) {
      if (!acc[answer.theme]) {
        acc[answer.theme] = [];
      }
      acc[answer.theme].push(answer);
    }
    return acc;
  }, {});

  // Always show all themes, even if they have no answers
  const themesWithAnswers = THEME_DISPLAY_ORDER;
  if (loading) {
    return <div className="py-12 text-center">
        <div className="text-white text-lg">Loading your choices...</div>
      </div>;
  }
  if (selectedAnswers.length === 0) {
    return <div className="py-12 text-center">
        <p className="text-white/70">No choices were recorded for this session.</p>
      </div>;
  }
  return <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Your Choices for the Pacific Future
        </h2>
        <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
          These are the decisions you made during your journey, organized by the seven pillars of the Blue Pacific 2050 Strategy. Each choice contributes to shaping the future scenario you experienced.
        </p>
      </div>

      <Tabs defaultValue={themesWithAnswers[0]} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-8 gap-2">
          {themesWithAnswers.map(theme => <TabsTrigger key={theme} value={theme} className="text-sm md:text-base px-4 py-3 md:px-6 md:py-4 bg-white/10 hover:bg-white/20 data-[state=active]:bg-white data-[state=active]:text-black font-medium rounded-lg transition-all duration-200">
              {theme.replace(' and ', ' & ')}
            </TabsTrigger>)}
        </TabsList>

        {themesWithAnswers.map(theme => <TabsContent key={theme} value={theme} className="space-y-6 py-0 my-[210px]">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                {theme}
              </h3>
              <p className="text-white/60 text-sm">
                {(answersByTheme[theme] || []).length} choice{(answersByTheme[theme] || []).length !== 1 ? 's' : ''} made in this theme
              </p>
            </div>

            {(answersByTheme[theme] || []).length === 0 ? <div className="text-center py-8">
                <p className="text-white/50">No choices made in this theme</p>
              </div> : <div className="space-y-6">
                {answersByTheme[theme].map((answer, index) => <div key={answer.code} className="bg-black/40 border border-white/20 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#35c5f2] text-sm font-semibold uppercase tracking-wide">
                        Choice {answer.code}
                      </span>
                      <span className="text-white/50 text-xs">
                        Question {answer.QuestionCode}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Question</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {answer.Question}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[#35c5f2] font-medium mb-2">Your Choice</h4>
                        <p className="text-white text-base leading-relaxed">
                          {answer.answer}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white/70 font-medium mb-2">Story</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {answer.narrative}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-orange-300 font-medium mb-2">Impact</h4>
                          <p className="text-orange-200 text-sm leading-relaxed">
                            {answer.impact}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-green-300 font-medium mb-2">Outcome</h4>
                          <p className="text-green-200 text-sm leading-relaxed">
                            {answer.outcome}
                          </p>
                        </div>
                      </div>

                      {/* Data Visualizations */}
                      <DataVisualization chart={answer.chart} counter={answer.counter} metrics={answer.metrics} />
                    </div>
                  </div>)}
              </div>}
          </TabsContent>)}
      </Tabs>
    </section>;
}