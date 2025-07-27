import { useEffect, useState } from 'react';
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

const THEME_DISPLAY_ORDER = [
  "Political Leadership and Regionalism", 
  "People Centered Development", 
  "Peace and Security", 
  "Resource and Economic Development", 
  "Climate Change and Disasters", 
  "Ocean and Environment", 
  "Technology and Connectivity"
];

export default function ScrollableAnswersDisplay() {
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
    fetch('/data/ANSWERMAPPINGNEWjson.json')
      .then(res => res.json())
      .then(answersData => {
        // Find matching answers for selected codes
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
    <div className="w-full max-w-6xl mx-auto space-y-24">
      {THEME_DISPLAY_ORDER.map(theme => {
        const themeAnswers = answersByTheme[theme] || [];
        
        return (
          <div key={theme} className="space-y-12">
            {/* Theme Header */}
            <div className="text-center space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold text-white">
                {theme}
              </h3>
              <p className="text-white/60 text-base md:text-lg">
                {themeAnswers.length} choice{themeAnswers.length !== 1 ? 's' : ''} made in this theme
              </p>
              <div className="w-32 h-1 bg-white/20 mx-auto rounded-full"></div>
            </div>

            {/* Theme Content */}
            {themeAnswers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/50 text-lg md:text-xl">No choices made in this theme</p>
              </div>
            ) : (
              <div className="space-y-16">
                {themeAnswers.map((answer, index) => (
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
          </div>
        );
      })}
    </div>
  );
}