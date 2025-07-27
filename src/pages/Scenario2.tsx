import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';

export default function Scenario2() {
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
              color: 0xffa500,
              backgroundColor: 0x000000,
              spacing: 1.80,
              chaos: 2.50
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
      content: "Your hybrid approach to health infrastructure showed mixed results. While urban areas thrived with new digital health platforms, rural communities still struggle with inconsistent connectivity. Maternal mortality improved by 15%, but chronic disease management remains challenging as traditional diets shift due to changing fish availability and crop patterns.",
      impact: "Suva General Hospital now operates at 150% capacity during cyclone seasons. Three rural health centers closed due to repeated flooding, forcing longer travel times for care."
    },
    {
      title: "2.0 Economic Development", 
      content: "Tourism adapted to the new normal—visitors now come for 'resilience tourism,' learning about adaptation while contributing to local economies. However, the industry is 40% smaller than in 2025, with frequent weather disruptions. Fishing income dropped substantially, but government retraining programs helped 60% of displaced fishers transition to aquaculture.",
      impact: "Coral Coast resorts now host 'climate reality' tours, generating modest revenue while raising awareness. The Great Astrolabe Reef is mostly dead, ending decades of dive tourism."
    },
    {
      title: "3.0 Peace & Security",
      content: "Regional cooperation prevented major conflicts, but tensions remain high over freshwater access and relocation rights. The Pacific Migration Compact you supported provides legal pathways for climate migrants, but integration challenges persist. Some communities split between those who stayed and those who moved to higher ground.",
      impact: "The Koro Island relocation to Ovalau created lasting social divisions. Maritime boundaries required renegotiation as three small islands became permanently submerged."
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
                SCENARIO 2: MEDIUM EMISSIONS
              </h1>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, Fiji endures the consequences of the world's partial success in combating climate change, a reality defined by a roughly 2°C temperature rise that has caused significant sea-level rise and widespread coral bleaching. This has transformed daily life, turning coastal flooding into a routine and forcing communities to adapt through a mix of ingenuity and necessity; while some thrive in planned resilience hubs, others have been forced into a managed retreat from the encroaching sea. Fiji's economy has also shifted, with tourism now highlighting resilience and aquaculture supplementing diminished fish catches. Through this struggle, Fiji and its Pacific neighbors have found a stronger moral voice on the global stage, advocating for climate justice while demonstrating a future of survival and ingenuity in a permanently altered, and more challenging, world.
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
                Global Pathways to 2050: A World of Partial Progress
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, the world reflects a story of partial climate progress, a patchwork of inconsistent policies and uneven technological adoption that successfully averted catastrophic warming but failed to prevent significant, irreversible damage. Global CO₂ emissions peaked around 2035 and began a slow decline, driven by a surge in renewable energy to over half of global electricity, yet a persistent reliance on oil and gas in major economies and hard-to-decarbonize sectors meant the world overshot the 1.5°C target in the 2030s. Consequently, a future of approximately 2°C warming became locked in, unleashing frequent extreme weather, noticeable sea-level rise, and devastating ecosystem losses like the near-total die-off of coral reefs. While international cooperation was fractured but functional—yielding moderate pacts and a new Loss and Damage fund—support for vulnerable nations like Fiji remained insufficient. The global mood is therefore a mix of pride for having avoided the worst-case scenarios and profound regret for the delayed, incomplete action that forced the most vulnerable to endure a future defined by adaptation and loss.
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
                Sonification – The Sound of an Unsettled Ocean
              </h2>
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  In this moderate scenario, the sonification of Fiji's 2050 ocean is an uneasy and restless soundscape, reflecting a future of partial progress and persistent volatility. The audio translates climate data into an emotionally discernible experience, blending the gentle lapping of waves with the intermittent rumble of distant thunder and surging swells. Listeners can hear specific metrics as distinct sounds: rising tones represent the increased frequency of moderate floods, a gradual increase in wave volume signifies sea-level rise, the jangling of wind chimes in a gust evokes more common cyclones, and an underlying crackle intensifies to mark coral bleaching from marine heatwaves. The overall emotional tone is one of vigilance, creating an audible diary of a climate that is neither a tranquil lullaby nor a chaotic dirge, but an unresolved ballad of resilience where periods of calm are always shadowed by the knowledge that the next storm is never far away.
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
                  <div className="pl-6 border-l-4 border-orange-400">
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
                  to="/scenario-3"
                  className="group relative inline-block px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl lg:text-3xl font-bold bg-transparent border-4 border-red-500 text-red-500 hover:text-white overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-red-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">
                    SCENARIO 3 →
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