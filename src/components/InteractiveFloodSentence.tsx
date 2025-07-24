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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedYear === year
                ? 'bg-accent text-accent-foreground shadow-md'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      
      <p className="text-center text-xl md:text-2xl leading-relaxed font-light text-card-foreground/90">
        By{" "}
        <span className="text-2xl md:text-3xl font-bold text-accent">{selectedYear}</span>, under the{" "}
        <span className="text-lg font-bold text-accent">{scenario}</span> pathway, sea levels
        around Suva will have climbed about{" "}
        <span className="text-2xl md:text-3xl font-bold text-accent">{currentData.seaRise} m</span>,
        pushing water half a metre above today's shoreline—and the city will find
        itself underwater between{" "}
        <span className="font-bold text-accent">{currentData.low}</span> and{" "}
        <span className="font-bold text-accent">{currentData.high}</span> days each year.
        Flooding here is no longer a question of if, but exactly when.
      </p>
    </div>
  );
};