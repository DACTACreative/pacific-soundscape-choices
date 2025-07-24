import React, { useState } from 'react';

interface FloodDataPoint {
  seaRise: number;
  low: number;
  high: number;
}

interface FloodData {
  [year: string]: FloodDataPoint;
}

interface InteractiveFloodSentenceProps {
  scenario: "1.5 °C warming" | "3.0 °C warming" | "5.0 °C warming";
}

const floodDataByScenario: Record<string, FloodData> = {
  "1.5 °C warming": {
    "2032": { seaRise: 0.1, low: 1, high: 7 },
    "2070": { seaRise: 0.3, low: 33, high: 69 },
    "2096": { seaRise: 0.6, low: 214, high: 273 }
  },
  "3.0 °C warming": {
    "2030": { seaRise: 0.1, low: 1, high: 7 },
    "2059": { seaRise: 0.3, low: 33, high: 69 },
    "2088": { seaRise: 0.6, low: 214, high: 273 }
  },
  "5.0 °C warming": {
    "2029": { seaRise: 0.1, low: 1, high: 7 },
    "2054": { seaRise: 0.3, low: 33, high: 69 },
    "2078": { seaRise: 0.6, low: 214, high: 273 }
  }
};

export const InteractiveFloodSentence: React.FC<InteractiveFloodSentenceProps> = ({ scenario }) => {
  const floodData = floodDataByScenario[scenario];
  const years = Object.keys(floodData);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const currentData = floodData[selectedYear];
  const thresholdLabel = "0.5 m above the high-tide line";

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedYear === year
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      
      <p className="text-center text-lg leading-relaxed">
        By{" "}
        <span className="text-primary font-bold">{selectedYear}</span>, under the{" "}
        <span className="text-primary font-bold">{scenario}</span> pathway, sea levels
        around Suva will have climbed about{" "}
        <span className="text-primary font-bold">{currentData.seaRise} m</span>,
        pushing water half a metre above today's shoreline—and the city will find
        itself underwater between{" "}
        <span className="text-primary font-bold">{currentData.low}</span> and{" "}
        <span className="text-primary font-bold">{currentData.high}</span> days each year.
        Flooding here is no longer a question of if, but exactly when.
      </p>
    </div>
  );
};