import { useEffect, useState } from 'react';
import AnswerRevealSection from './AnswerRevealSection';
import ScrollProgress from './ScrollProgress';

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

export default function AnswerScrollExperience() {
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

  return (
    <section className="relative">
      <ScrollProgress />
      
      {/* Hero Introduction */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Your Choices for the Pacific Future
          </h2>
          <p className="text-xl text-white/70 max-w-4xl leading-relaxed mb-8">
            These are the decisions you made during your journey. 
            Each choice contributes to shaping the future scenario you experienced.
          </p>
          <div className="animate-pulse text-white/50">
            <p className="text-sm uppercase tracking-wider">Scroll to explore your journey</p>
            <div className="w-1 h-8 bg-white/30 mx-auto mt-4 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Theme Sections */}
      {THEME_DISPLAY_ORDER.map(theme => {
        const themeAnswers = answersByTheme[theme] || [];
        
        if (themeAnswers.length === 0) return null;
        
        return (
          <div key={theme}>
            {/* Theme Introduction Screen */}
            <div className="min-h-screen flex items-center justify-center px-8 relative"
                 style={{
                   backgroundImage: `url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              <div className="absolute inset-0 bg-black/60" />
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-8">
                  {theme}
                </h3>
                <p className="text-2xl md:text-4xl text-white/70 font-bold">
                  {themeAnswers.length} choice{themeAnswers.length !== 1 ? 's' : ''} made in this theme
                </p>
                <div className="w-32 h-2 bg-white/30 mx-auto mt-8 rounded-full"></div>
              </div>
            </div>

            {/* Answer Sections for this theme */}
            {themeAnswers.map((answer, index) => (
              <AnswerRevealSection 
                key={answer.code} 
                answer={answer} 
                index={index}
              />
            ))}
          </div>
        );
      })}
    </section>
  );
}