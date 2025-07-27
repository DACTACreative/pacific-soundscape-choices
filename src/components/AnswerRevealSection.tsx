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
          min-h-screen flex items-center justify-center px-8 transition-all duration-1000 relative
          ${isVisible('answer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl text-center relative z-10">
          <h3 className="text-4xl md:text-6xl text-white font-bold mb-12 leading-relaxed">
            {answer.Question}
          </h3>
          
          <div className="p-8">
            <h4 className="text-4xl md:text-6xl text-white font-bold mb-8">Your Choice</h4>
            <p className="text-white text-2xl md:text-4xl leading-relaxed font-bold">
              {answer.answer}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Narrative - Slides in Diagonally */}
      <div 
        data-reveal="narrative"
        className={`
          min-h-screen flex items-center px-8 transition-all duration-1000 delay-300 relative
          ${isVisible('narrative') ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-20 translate-y-10'}
        `}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-5xl ml-auto mr-16 relative z-10">
          <div className="p-8">
            <h4 className="text-4xl md:text-6xl text-white font-bold mb-8">The Story</h4>
            <p className="text-white text-2xl md:text-4xl leading-relaxed font-bold">
              {answer.narrative}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Impact - Appears from Bottom */}
      <div 
        data-reveal="impact"
        className={`
          min-h-screen flex items-center px-8 transition-all duration-1000 delay-600 relative
          ${isVisible('impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="p-8">
            <h4 className="text-4xl md:text-6xl text-white font-bold mb-8">Regional Impact</h4>
            <p className="text-white text-2xl md:text-4xl leading-relaxed font-bold">
              {answer.impact}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Final Message + Outcome */}
      <div 
        data-reveal="outcome"
        className={`
          min-h-screen flex items-center justify-center px-8 transition-all duration-1000 delay-900 relative
          ${isVisible('outcome') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-4xl text-center relative z-10">
          {/* Final Message */}
          <div className="mb-12">
            <h4 className="text-4xl md:text-6xl text-white font-bold leading-relaxed mb-8">
              Through this path, your decision advanced a key pillar of the 
              <span className="text-white font-bold"> Blue Pacific 2050 Strategy</span>:
            </h4>
          </div>
          
          {/* Outcome */}
          <div className="p-10">
            <h5 className="text-4xl md:text-6xl text-white font-bold mb-8 uppercase tracking-wide">
              Measured Outcome
            </h5>
            <p className="text-white text-2xl md:text-4xl leading-relaxed font-bold">
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