import { useScrollReveal } from '../hooks/useScrollReveal';
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

interface AnswerRevealSectionProps {
  answer: AnswerData;
  index: number;
}

export default function AnswerRevealSection({ answer, index }: AnswerRevealSectionProps) {
  const { sectionRef, isVisible } = useScrollReveal();

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      
      {/* 1. Answer - Appears First */}
      <div 
        data-reveal="answer"
        className={`
          min-h-screen flex items-center justify-center px-8 transition-all duration-1000
          ${isVisible('answer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}
      >
        <div className="max-w-4xl text-center">
          <div className="mb-6">
            <span className="text-[hsl(var(--primary))] text-lg font-medium">
              Question {answer.QuestionCode}
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl text-white/80 mb-8 leading-relaxed">
            {answer.Question}
          </h3>
          
          <div className="bg-gradient-to-r from-[hsl(var(--primary))]/20 to-transparent p-8 rounded-2xl border-l-4 border-[hsl(var(--primary))]">
            <h4 className="text-[hsl(var(--primary))] text-xl font-bold mb-4">Your Choice</h4>
            <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
              {answer.answer}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Narrative - Slides in Diagonally */}
      <div 
        data-reveal="narrative"
        className={`
          min-h-screen flex items-center px-8 transition-all duration-1000 delay-300
          ${isVisible('narrative') ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-20 translate-y-10'}
        `}
      >
        <div className="max-w-5xl ml-auto mr-16">
          <div className="bg-black/60 backdrop-blur-lg p-8 rounded-2xl border border-white/20 transform rotate-1">
            <h4 className="text-purple-300 text-xl font-bold mb-6">The Story</h4>
            <p className="text-white/90 text-lg leading-relaxed italic">
              {answer.narrative}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Impact - Appears from Bottom */}
      <div 
        data-reveal="impact"
        className={`
          min-h-screen flex items-center px-8 transition-all duration-1000 delay-600
          ${isVisible('impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-8 rounded-2xl border border-orange-300/30">
            <h4 className="text-orange-300 text-xl font-bold mb-6">Regional Impact</h4>
            <p className="text-orange-100 text-lg leading-relaxed">
              {answer.impact}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Final Message + Outcome */}
      <div 
        data-reveal="outcome"
        className={`
          min-h-screen flex items-center justify-center px-8 transition-all duration-1000 delay-900
          ${isVisible('outcome') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <div className="max-w-4xl text-center">
          {/* Final Message */}
          <div className="mb-12">
            <h4 className="text-3xl md:text-4xl text-white font-light leading-relaxed mb-8">
              Through this path, your decision advanced a key pillar of the 
              <span className="text-[hsl(var(--primary))] font-bold"> Blue Pacific 2050 Strategy</span>:
            </h4>
          </div>
          
          {/* Outcome */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-10 rounded-3xl border-2 border-green-300/30">
            <h5 className="text-green-300 text-lg font-bold mb-4 uppercase tracking-wide">
              Measured Outcome
            </h5>
            <p className="text-green-100 text-xl md:text-2xl leading-relaxed font-medium">
              {answer.outcome}
            </p>
          </div>

          {/* Data Visualization */}
          {(answer.chart || answer.counter || answer.metrics) && (
            <div className="mt-12">
              <DataVisualization 
                chart={answer.chart} 
                counter={answer.counter} 
                metrics={answer.metrics} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}