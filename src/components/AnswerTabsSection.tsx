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

  // Color coding for different content sections
  const sectionColors = {
    question: "border-l-4 border-blue-400 pl-6",
    choice: "border-l-4 border-green-400 pl-6", 
    narrative: "border-l-4 border-purple-400 pl-6",
    impact: "border-l-4 border-orange-400 pl-6",
    outcome: "border-l-4 border-cyan-400 pl-6"
  };

  // Always show all themes, even if they have no answers
  const themesWithAnswers = THEME_DISPLAY_ORDER;
  
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-white text-lg md:text-xl">Loading your choices...</div>
      </div>
    );
  }
  
  if (selectedAnswers.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-white/70 text-lg md:text-xl">No choices were recorded for this session.</p>
      </div>
    );
  }

  return (
    <section className="min-h-[80vh] p-8 lg:p-16">
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Your Choices for the Pacific Future
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-white/90 text-center">
          These are the decisions you made during your journey, organized by the seven pillars of the Blue Pacific 2050 Strategy. Each choice contributes to shaping the future scenario you experienced.
        </p>
      </div>

      <Tabs defaultValue={themesWithAnswers[0]} className="w-full max-w-6xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mb-12 gap-2">
          {themesWithAnswers.map(theme => (
            <TabsTrigger 
              key={theme} 
              value={theme} 
              className="text-xs md:text-sm px-3 py-2 md:px-4 md:py-3 bg-white/10 hover:bg-white/20 data-[state=active]:bg-white data-[state=active]:text-black font-medium rounded-lg transition-all duration-200"
            >
              {theme.replace(' and ', ' & ')}
            </TabsTrigger>
          ))}
        </TabsList>

        {themesWithAnswers.map(theme => (
          <TabsContent key={theme} value={theme} className="min-h-[60vh] lg:min-h-[80vh]">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {theme}
              </h3>
              <p className="text-white/60 text-base md:text-lg">
                {(answersByTheme[theme] || []).length} choice{(answersByTheme[theme] || []).length !== 1 ? 's' : ''} made in this theme
              </p>
            </div>

            {(answersByTheme[theme] || []).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/50 text-lg md:text-xl">No choices made in this theme</p>
              </div>
            ) : (
              <div className="space-y-16">
                {answersByTheme[theme].map((answer, index) => (
                  <div key={answer.code} className="max-w-3xl mx-auto">
                    <div className="mb-8">
                      <span className="text-white/50 text-sm uppercase tracking-wider">
                        Question {answer.QuestionCode}
                      </span>
                    </div>

                    <div className="space-y-8">
                      {/* Question Section */}
                      <section className={`${sectionColors.question} space-y-4`}>
                        <h4 className="text-2xl md:text-3xl font-bold text-white">Question</h4>
                        <p className="text-lg md:text-xl leading-relaxed text-white/90">
                          {answer.Question}
                        </p>
                      </section>

                      {/* Choice Section */}
                      <section className={`${sectionColors.choice} space-y-4`}>
                        <h4 className="text-2xl md:text-3xl font-bold text-green-400">Your Choice</h4>
                        <p className="text-lg md:text-xl leading-relaxed text-white font-normal">
                          {answer.answer}
                        </p>
                      </section>

                      {/* Narrative Section */}
                      <section className={`${sectionColors.narrative} space-y-4`}>
                        <h4 className="text-2xl md:text-3xl font-bold text-purple-400">Narrative</h4>
                        <div className="text-lg md:text-xl leading-relaxed text-white/90 space-y-6">
                          {answer.narrative.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      </section>

                      {/* Impact and Outcome Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <section className={`${sectionColors.impact} space-y-4`}>
                          <h4 className="text-2xl md:text-3xl font-bold text-orange-400">Impact</h4>
                          <div className="text-lg md:text-xl leading-relaxed text-white/90 space-y-6">
                            {answer.impact.split('\n\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </div>
                        </section>

                        <section className={`${sectionColors.outcome} space-y-4`}>
                          <h4 className="text-2xl md:text-3xl font-bold text-cyan-400">Outcome</h4>
                          <p className="text-base md:text-lg italic leading-relaxed text-white/90">
                            {answer.outcome}
                          </p>
                        </section>
                      </div>

                      {/* Data Visualizations */}
                      {(answer.chart || answer.counter || answer.metrics) && (
                        <section className="mt-12">
                          <DataVisualization chart={answer.chart} counter={answer.counter} metrics={answer.metrics} />
                        </section>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}