import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThematicSpiderChart from '../components/ThematicSpiderChart';

import StoryBlock from '../components/StoryBlock';
import OutcomeBlock from '../components/OutcomeBlock';

export default function Scenario3() {
  const [userOutcomes, setUserOutcomes] = useState<any[]>([]);

  useEffect(() => {
    // Load user's selected answer codes from sessionStorage
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    console.log('🔍 Raw selectedAnswerCodes:', selectedCodes);
    
    if (selectedCodes.length > 0) {
      // Load answers.json data
      fetch('/data/answers.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(answersData => {
          console.log('📊 Loaded answers data keys:', Object.keys(answersData));
          
          // Map ALL selected answers - NO FILTERING by theme, show EVERY answer
          const outcomes = selectedCodes.map((code: string) => {
            const answer = answersData[code];
            if (!answer) {
              console.warn(`❌ No answer found for code: ${code}`);
              return null;
            }
            return answer;
          }).filter(Boolean);
          
          console.log(`🎯 Total outcomes to display: ${outcomes.length}`);
          setUserOutcomes(outcomes);
        })
        .catch(error => {
          console.error('💥 Error loading answers data:', error);
        });
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500"
        >
          ← RETURN TO JOURNEY
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <StoryBlock
          title="SCENARIO 3: EXTREME EMISSIONS"
          text="By 2050, in a world scorched by a catastrophic global temperature rise approaching 5°C, the nation of Fiji has effectively ceased to exist. Relentless and rapid sea-level rise, measured in meters rather than centimeters, has submerged virtually all coastal areas and low-lying islands, making the archipelago largely uninhabitable. The concept of daily life has been replaced by a permanent state of emergency and mass exodus. The society has fractured, with the government long since collapsed and its population scattered across the globe as part of a desperate diaspora of climate refugees. The ocean is a toxic, anoxic dead zone. There is no economy, no tourism, and no agriculture—only the haunting ruins of a drowned culture. The voice of Fiji is no longer a plea for aid but a silent testament to the ultimate cost of a world that ignored every warning."
        />

        <StoryBlock
          title="Global Pathways to 2050: A World in Collapse"
          text="The world of 2050 is one of systemic collapse, a direct consequence of decades of unchecked emissions and the triggering of irreversible planetary tipping points. The path to 5°C was paved with aggressive fossil fuel expansion and a complete abandonment of international climate cooperation. By the 2040s, critical systems like the Amazon rainforest and Arctic permafrost crossed points of no return, unleashing massive carbon and methane feedback loops that accelerated warming beyond anyone's control. Global civilization is fracturing under the strain of continent-spanning 'heat domes,' perpetual superstorms, and the collapse of global food systems. International relations have been replaced by resource wars and hoarding by the few nations still possessing arable land or fresh water. The global mood is not one of regret, but of raw survivalism and despair in the face of a self-inflicted planetary catastrophe."
        />

        <StoryBlock
          title="Sonification – The Sound of a Dying Ocean"
          text="The sonification for this 5°C future is an apocalyptic and overwhelming cacophony—the sound of a planet's life support systems failing. It is a wall of noise dominated by the deep, violent groan of an unstable sea, the explosive hiss of methane plumes erupting from the seafloor, and the unrelenting shriek of hyper-hurricanes. There are no distinct events, only a constant, multi-layered roar of destruction that is physically oppressive to hear. Any sound of life, human or animal, is long gone, buried under the sound of raw, elemental fury. The emotional tone is one of pure dread and finality. It is not a warning or a dirge; it is the sound of an ending, an auditory record of a world that has been pushed past its breaking point."
        />

        {/* Blue Pacific 2050 Reality */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-center">
                Blue Pacific 2050 Reality
              </h2>
              <div className="max-w-5xl mx-auto mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-white text-center">
                  This spider chart visualizes how your choices shaped Fiji's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
                </p>
              </div>
              <div className="text-center mb-8">
                <p className="text-lg text-white/80">
                  Hover over each axis to explore how your choices influenced that theme
                </p>
              </div>
              <div className="w-full min-h-[70vh] relative z-10">
                <ThematicSpiderChart className="w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Outcome Blocks */}
        {userOutcomes.length > 0 ? (
          <div className="outcomes-section">
            {userOutcomes.map((outcome, index) => (
              <OutcomeBlock key={outcome.code || index} data={outcome} />
            ))}
          </div>
        ) : (
          <div className="min-h-screen py-24 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl text-white mb-4">No Personal Outcomes Available</h3>
              <p className="text-white/60 mb-8">Complete the game to see your personalized outcome blocks here.</p>
              <button 
                onClick={() => {
                  sessionStorage.setItem('selectedAnswerCodes', JSON.stringify(['A1', 'C2', 'A3', 'E3', 'B2', 'B3', 'C1', 'G1', 'D2', 'G2', 'F3']));
                  window.location.reload();
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Load Sample Data (Testing)
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <section className="min-h-screen py-24 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto text-center space-y-8">
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link 
                  to="/scenario-1"
                  className="group relative inline-block px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl lg:text-3xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">
                    ← SCENARIO 1
                  </span>
                </Link>
                <Link 
                  to="/scenario-2"
                  className="group relative inline-block px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl lg:text-3xl font-bold bg-transparent border-4 border-orange-400 text-orange-400 hover:text-black overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-orange-400 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">
                    ← SCENARIO 2
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}