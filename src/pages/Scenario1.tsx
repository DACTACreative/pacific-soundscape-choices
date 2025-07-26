import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';

export default function Scenario1() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any = null;

    const loadVanta = async () => {
      try {
        // Load VANTA script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.trunk.min.js';
        script.onload = () => {
          if (window.VANTA && vantaRef.current) {
            vantaEffect = window.VANTA.TRUNK({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x35c5f2,
              backgroundColor: 0x000000,
              spacing: 1.50,
              chaos: 1.20
            });
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.log('VANTA loading error:', error);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  const thematicSections = [
    {
      title: "1.0 Health and Wellbeing",
      content: "You chose to launch a nationwide Cellule of Knowledge initiative—mobile health stations equipped with AI-powered diagnostic tools that reach remote villages. By 2050, these units have prevented three major outbreaks and reduced child mortality by 40%. Traditional healers work alongside medical professionals, creating a hybrid care system that honors both innovation and ancestral knowledge.",
      impact: "In Hela Province, solar-powered health clinics now serve 15,000 people. Papua New Guinea's International Health Regulations (IHR) capacity has improved dramatically, making the region a model for pandemic preparedness."
    },
    {
      title: "2.0 Economic Development", 
      content: "Your decision to prioritize blue economy initiatives over extractive industries paid dividends. Sustainable aquaculture farms now produce 60% more protein than traditional fishing, while marine protected areas have become eco-tourism magnets. The transition was difficult—many fishing families needed retraining—but by 2050, coastal communities earn 30% more than they did in 2025.",
      impact: "Suva's new Blue Economy Hub processes $2 billion in sustainable ocean commerce annually. Traditional navigation knowledge is now part of international maritime curricula."
    },
    {
      title: "3.0 Peace & Security",
      content: "Regional cooperation in climate adaptation prevented resource conflicts that plagued other regions. The Pacific Peace Fund you helped establish has mediated 40+ climate-induced disputes over water and land. Early warning systems for both natural disasters and social tensions have kept communities stable during the most challenging transitions.",
      impact: "Zero climate-related conflicts in the Pacific region since 2030. The Suva Accords on Climate Justice are now studied globally as a model for peaceful adaptation."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* VANTA Background */}
      <div ref={vantaRef} className="absolute inset-0 -z-10 w-full h-full" />
      
      {/* Content */}
      <div className="relative z-10 pt-32">
        
        {/* Fixed Header */}
        <div className="fixed top-6 left-6 z-50">
          <Link 
            to="/"
            className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500"
          >
            ← RETURN TO JOURNEY
          </Link>
        </div>

        {/* Scenario Title */}
        <section className="min-h-screen py-24 md:py-48 flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                SCENARIO 1: LOW EMISSIONS
              </h1>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, Fiji embodies a future earned through the foresight and resilience of the 2020s, showcasing a successful adaptation to a changed climate. Decades-old marine protected areas have fostered recovering coral reefs and sustainable fisheries, while communities have gracefully relocated from rising seas, guided by traditional wisdom. The nation now runs on 85% renewable energy, with solar and wind power having replaced the fossil-fuel infrastructure of the past. This transformation, born from difficult but necessary choices, has elevated the Blue Pacific from a region pleading for action to a respected global leader, demonstrating how stewardship and development can forge a thriving, resilient future for both the people and the ocean.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Pathways */}
        <section className="min-h-screen py-24 md:py-48 flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Global Pathways to 2050: How the World Banded Together
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  A sustainable future was secured by 2050 through a wave of unprecedented global cooperation that began in the late 2020s. Major emitters like China, the US, and the EU implemented transformative climate policies, while international agreements such as a Fossil Fuel Non-Proliferation Treaty and a global carbon price catalyzed a rapid phase-out of fossil fuels, causing global emissions to peak before 2030. This era of collaboration was critically defined by climate justice, as wealthy nations finally delivered on finance pledges and, spurred by the moral leadership of Pacific nations, established a Loss and Damage fund to support vulnerable regions with green technology and resilient infrastructure. By choosing cooperation, the world bent the curve on greenhouse gas accumulation, put the planet on track to meet the 1.5°C Paris Agreement goal, and demonstrated that collective action could steer humanity toward a more stable and equitable future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sonification */}
        <section className="min-h-screen py-24 md:py-48 flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Sonification – The Sound of a Hopeful Ocean
              </h2>
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-lg md:text-xl lg:text-2xl text-white/80 text-justify">
                  (As you read this scenario, take a moment to listen to its unique soundscape.)
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  This low-emissions future is expressed through "sonification," where the ocean's soundscape tells a story of hope and successful climate action. The accompanying audio features the gentle, steady hush of calm waves, sonically representing positive data such as reduced cyclone intensity and successful coastal protection. In this auditory experience, tranquil wave patterns signify fewer extreme weather events, while sounds like wind chimes might symbolize the hum of wind turbines, transforming abstract metrics into a tangible sense of a manageable future. Drawing on the Pacific tradition of storytelling through song, this soundscape allows the ocean itself to become the storyteller, murmuring a tale that our collective choices were the right ones, resulting in a future where the sea remains a nurturing force rather than a constant threat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blue Pacific 2050 Reality */}
        <section className="pt-24 pb-32 md:px-12 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Blue Pacific 2050 Reality</h2>
            
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

            <div className="w-full min-h-[500px] relative z-10">
              <ThematicSpiderChart className="w-full" />
            </div>
          </div>
        </section>

        {/* Blue Pacific Stories of Impact & Outcome Mapping */}
        <BluePacificStoriesSection />

        {/* Thematic Outcomes */}
        {thematicSections.map((section, index) => (
          <section key={index} className="min-h-screen py-24 md:py-48 flex items-center">
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                  {section.title}
                </h2>
                <div className="max-w-5xl mx-auto space-y-6">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                    {section.content}
                  </p>
                  <div className="pl-6 border-l-4 border-[#35c5f2]">
                    <p className="text-lg md:text-xl text-white/80 text-justify">
                      → {section.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Navigation */}
        <section className="py-24 flex items-center">
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

      </div>
      
      {/* Debug Panel - Only in development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  );
}