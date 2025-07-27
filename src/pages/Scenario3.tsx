import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';

export default function Scenario3() {
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
              color: 0xff0000,
              backgroundColor: 0x000000,
              spacing: 2.50,
              chaos: 4.00
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
      content: "The health system collapsed under the weight of cascading crises. Hospitals flooded repeatedly, medical supplies became unreliable due to damaged infrastructure, and the health workforce emigrated to higher, safer ground. Vector-borne diseases exploded as changing rainfall patterns created new breeding grounds for mosquitoes, while food insecurity led to widespread malnutrition.",
      impact: "Suva's main hospital has been abandoned after the fifth major flood. Life expectancy dropped by eight years as treatable diseases became fatal due to lack of medical care."
    },
    {
      title: "2.0 Economic Development", 
      content: "The economy effectively ceased to function as a modern market system. Tourism disappeared entirely—there are no reefs to see, no stable weather patterns to plan around, and no infrastructure to support visitors. The currency became worthless as the government lost taxation capacity. Most economic activity reverted to subsistence and barter systems.",
      impact: "Nadi Airport operates only sporadically when not flooded. The tourism industry, once 40% of GDP, recorded zero international visitors for eighteen consecutive months. Most resorts are now refugee shelters."
    },
    {
      title: "3.0 Peace & Security",
      content: "Social cohesion fractured under existential pressure. Competition for shrinking freshwater sources led to violent conflicts between communities. The government lost legitimacy as it failed to protect citizens from climate impacts, leading to a breakdown of law and order. International relations became dominated by desperate negotiations for mass resettlement rights.",
      impact: "Fiji's government operates from Suva only during low tide seasons. Two violent conflicts over freshwater access left thirty-seven dead. New Zealand and Australia closed their borders to climate migrants after social unrest."
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
                SCENARIO 3: EXTREME EMISSIONS
              </h1>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, in a world scorched by a catastrophic global temperature rise approaching 5°C, the nation of Fiji has effectively ceased to exist. Relentless and rapid sea-level rise, measured in meters rather than centimeters, has submerged virtually all coastal areas and low-lying islands, making the archipelago largely uninhabitable. The concept of daily life has been replaced by a permanent state of emergency and mass exodus. The society has fractured, with the government long since collapsed and its population scattered across the globe as part of a desperate diaspora of climate refugees. The ocean is a toxic, anoxic dead zone. There is no economy, no tourism, and no agriculture—only the haunting ruins of a drowned culture. The voice of Fiji is no longer a plea for aid but a silent testament to the ultimate cost of a world that ignored every warning.
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
                Global Pathways to 2050: A World in Collapse
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  The world of 2050 is one of systemic collapse, a direct consequence of decades of unchecked emissions and the triggering of irreversible planetary tipping points. The path to 5°C was paved with aggressive fossil fuel expansion and a complete abandonment of international climate cooperation. By the 2040s, critical systems like the Amazon rainforest and Arctic permafrost crossed points of no return, unleashing massive carbon and methane feedback loops that accelerated warming beyond anyone's control. Global civilization is fracturing under the strain of continent-spanning "heat domes," perpetual superstorms, and the collapse of global food systems. International relations have been replaced by resource wars and hoarding by the few nations still possessing arable land or fresh water. The global mood is not one of regret, but of raw survivalism and despair in the face of a self-inflicted planetary catastrophe.
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
                Sonification – The Sound of a Dying Ocean
              </h2>
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  The sonification for this 5°C future is an apocalyptic and overwhelming cacophony—the sound of a planet's life support systems failing. It is a wall of noise dominated by the deep, violent groan of an unstable sea, the explosive hiss of methane plumes erupting from the seafloor, and the unrelenting shriek of hyper-hurricanes. There are no distinct events, only a constant, multi-layered roar of destruction that is physically oppressive to hear. Any sound of life, human or animal, is long gone, buried under the sound of raw, elemental fury. The emotional tone is one of pure dread and finality. It is not a warning or a dirge; it is the sound of an ending, an auditory record of a world that has been pushed past its breaking point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blue Pacific 2050 Reality */}
        <section className="min-h-screen py-24 md:py-48 flex items-center">
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

        {/* Blue Pacific Stories */}
        <section className="py-24 md:py-48">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <BluePacificStoriesSection />
            </div>
          </div>
        </section>

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
                  <div className="pl-6 border-l-4 border-red-500">
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