import React from 'react';
import DynamicChart from './DynamicChart';
import CountUp from './CountUp';

interface ChartConfig {
  type: string;
  title: string;
  unit?: string;
  data: Array<{
    label: string;
    value: number;
  }>;
}

interface CounterConfig {
  type: string;
  title: string;
  value: number;
  unit?: string;
}

interface OutcomeBlockProps {
  data: {
    theme: string;
    answer: string;
    narrative: string;
    impact: string;
    outcome: string;
    chart?: ChartConfig;
    counter?: CounterConfig;
  };
}

const OutcomeBlock: React.FC<OutcomeBlockProps> = ({ data }) => {
  console.log('OutcomeBlock rendering:', data);
  
  return (
    <section
      className="scroll-block outcome-block min-h-screen py-24 md:py-48 flex items-center justify-center"
      data-scroll-section
      style={{ 
        background: '#111', 
        color: '#fff',
        width: '100%'
      }}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        {/* Theme Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {data.theme}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Your Choice */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">
                Your Choice
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                {data.answer}
              </p>
            </div>

            {/* Story of Impact */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-green-300 mb-4">
                Story of Impact
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 italic">
                {data.narrative}
              </p>
            </div>

            {/* Result */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-300 mb-4">
                Result
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 font-semibold">
                {data.impact}
              </p>
            </div>

            {/* Outcome */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4">
                Blue Pacific 2050 Outcome
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80">
                {data.outcome}
              </p>
            </div>
          </div>

          {/* Right Column - Visualizations */}
          <div className="space-y-8">
            {data.chart && (
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h4 className="text-xl font-semibold text-white mb-4">📊 Data Visualization</h4>
                <DynamicChart {...data.chart} />
              </div>
            )}

            {data.counter && (
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                <h4 className="text-xl font-semibold text-white mb-4">🔢 Impact Metric</h4>
                <CountUp {...data.counter} />
              </div>
            )}
            
            {!data.chart && !data.counter && (
              <div className="bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center">
                <p className="text-white/60">No specific data visualization for this outcome</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeBlock;