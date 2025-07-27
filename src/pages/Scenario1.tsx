import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import OutcomeBlock from '../components/OutcomeBlock';
import StoryBlock from '../components/StoryBlock';
import DebugOutcomes from '../components/DebugOutcomes';

export default function Scenario1() {
  const [userOutcomes, setUserOutcomes] = useState<any[]>([]);

  useEffect(() => {
    // Load user's selected answer codes from sessionStorage
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    console.log('Selected answer codes:', selectedCodes);
    
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
          console.log('Loaded answers data:', answersData);
          // Map ALL selected answers (don't filter by theme - show all outcomes)
          const outcomes = selectedCodes.map((code: string) => {
            const answer = answersData[code];
            if (!answer) {
              console.warn(`No answer found for code: ${code}`);
              return null;
            }
            return answer;
          }).filter(Boolean);
          console.log('User outcomes to display:', outcomes);
          setUserOutcomes(outcomes);
        })
        .catch(error => {
          console.error('Error loading answers data:', error);
        });
    } else {
      console.log('No selected answer codes found in sessionStorage');
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative">
      <DebugOutcomes />

      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500"
        >
          ← RETURN TO JOURNEY
        </Link>
      </div>

        <StoryBlock
          title="SCENARIO 1: LOW EMISSIONS"
          text="By 2050, Fiji embodies a future earned through the foresight and resilience of the 2020s, showcasing a successful adaptation to a changed climate. Decades-old marine protected areas have fostered recovering coral reefs and sustainable fisheries, while communities have gracefully relocated from rising seas, guided by traditional wisdom. The nation now runs on 85% renewable energy, with solar and wind power having replaced the fossil-fuel infrastructure of the past. This transformation, born from difficult but necessary choices, has elevated the Blue Pacific from a region pleading for action to a respected global leader, demonstrating how stewardship and development can forge a thriving, resilient future for both the people and the ocean."
        />

        <StoryBlock
          title="Global Pathways to 2050: How the World Banded Together"
          text="A sustainable future was secured by 2050 through a wave of unprecedented global cooperation that began in the late 2020s. Major emitters like China, the US, and the EU implemented transformative climate policies, while international agreements such as a Fossil Fuel Non-Proliferation Treaty and a global carbon price catalyzed a rapid phase-out of fossil fuels, causing global emissions to peak before 2030. This era of collaboration was critically defined by climate justice, as wealthy nations finally delivered on finance pledges and, spurred by the moral leadership of Pacific nations, established a Loss and Damage fund to support vulnerable regions with green technology and resilient infrastructure. By choosing cooperation, the world bent the curve on greenhouse gas accumulation, put the planet on track to meet the 1.5°C Paris Agreement goal, and demonstrated that collective action could steer humanity toward a more stable and equitable future."
        />

        <StoryBlock
          title="Sonification – The Sound of a Hopeful Ocean"
          text="This low-emissions future is expressed through 'sonification,' where the ocean's soundscape tells a story of hope and successful climate action. The accompanying audio features the gentle, steady hush of calm waves, sonically representing positive data such as reduced cyclone intensity and successful coastal protection. In this auditory experience, tranquil wave patterns signify fewer extreme weather events, while sounds like wind chimes might symbolize the hum of wind turbines, transforming abstract metrics into a tangible sense of a manageable future. Drawing on the Pacific tradition of storytelling through song, this soundscape allows the ocean itself to become the storyteller, murmuring a tale that our collective choices were the right ones, resulting in a future where the sea remains a nurturing force rather than a constant threat."
        />

        {/* Blue Pacific 2050 Reality */}
        <section className="min-h-screen py-24 md:px-12 text-white flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 text-center">Blue Pacific 2050 Reality</h2>
            
            <p className="text-xl md:text-2xl max-w-4xl leading-relaxed mb-6">
              <strong>Thematic Spider Chart – A Snapshot of Hard-Won Outcomes</strong>
            </p>
            
            <p className="text-lg md:text-xl max-w-4xl leading-relaxed mb-6 text-gray-300">
              This interactive spider chart visualizes the Pacific region's hard-won progress by 2050, plotting outcomes across key themes like environment, health, and infrastructure against an ideal scenario.
            </p>
            
            <p className="text-lg md:text-xl max-w-4xl leading-relaxed mb-6 text-gray-300">
              The chart's broad but imperfect shape illustrates a future built on successful yet realistic trade-offs. It's a living portrait of the Pacific's navigation through uncertainty, strength, and resilience.
            </p>
            
            <p className="text-lg md:text-xl max-w-4xl leading-relaxed mb-10 text-gray-300">
              This shape is a direct result of the choices made in this experience — a visual map of your region's trajectory.
            </p>

            <div className="bg-black/80 rounded-xl p-6 mb-8 text-center">
              <p className="text-lg md:text-xl text-gray-300">
                Hover over a theme in the chart to see the real-world impact of your choices.
              </p>
            </div>

            <div className="w-full min-h-[70vh] relative z-10">
              <ThematicSpiderChart className="w-full h-full" />
            </div>
          </div>
        </section>

        {/* Blue Pacific Stories of Impact & Outcome Mapping */}
        <section className="min-h-screen flex items-center justify-center">
          <BluePacificStoriesSection />
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
                  // Add some sample data for testing
                  sessionStorage.setItem('selectedAnswerCodes', JSON.stringify(['A1', 'B2', 'C3', 'D1']));
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
              <Link 
                to="/scenario-2"
                className="group relative inline-block px-8 md:px-12 py-6 md:py-8 text-2xl md:text-3xl lg:text-4xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
              >
                <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">
                  EXPLORE SCENARIO 2 →
                </span>
              </Link>
            </div>
          </div>
        </section>
      
      {/* Debug Panel removed */}
    </div>
  );
}