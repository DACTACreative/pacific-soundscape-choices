import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import introA from '@/data/intro-a.png';
import introAA from '@/data/intro-aa.png';
import introB from '@/data/intro-b.png';
import introC from '@/data/intro-c.png';
import introD from '@/data/intro-d.png';
import introE from '@/data/intro-e.png';
import introF from '@/data/intro-f.png';
import introG from '@/data/intro-g.png';
import introH from '@/data/intro-h.png';
import introI from '@/data/intro-i.png';
import introJ from '@/data/intro-j.png';
import scenarioO from '@/data/Scenario-o.png';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario, enableAudio, audioEnabled } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  const handleStart = () => {
    try {
      if (!audioEnabled) {
        enableAudio();
      }
      playScenario(Scenario.Scenario0);
      onStart();
    } catch (error) {
      console.error('Error starting scenario:', error);
    }
  };

  // Reordered to have introAA first, then introA, then the rest in order
  // Using introJ instead of introB in the array
  const introImages = [introAA, introA, introJ, introC, introD, introE, introF, introG, introH, introI, introB];

  // Initialize Locomotive Scroll
  useEffect(() => {
    let scrollInstance: LocomotiveScroll | null = null;
    
    const initScroll = () => {
      if (scrollRef.current && !scrollInstance) {
        try {
          scrollInstance = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed'
          });
          locomotiveScrollRef.current = scrollInstance;
          console.log('Locomotive Scroll initialized successfully');
        } catch (error) {
          console.error('Failed to initialize Locomotive Scroll:', error);
        }
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initScroll, 100);

    return () => {
      clearTimeout(timer);
      if (scrollInstance) {
        try {
          scrollInstance.destroy();
          console.log('Locomotive Scroll destroyed');
        } catch (error) {
          console.error('Error destroying Locomotive Scroll:', error);
        }
      }
      locomotiveScrollRef.current = null;
    };
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('IntroScreen mounted');
    console.log('Loading state:', loading);
    console.log('Images loaded:', introImages.length);
    console.log('First image src:', introImages[0]);
    
    // Check if scroll container exists
    if (scrollRef.current) {
      console.log('Scroll container found');
    } else {
      console.log('Scroll container not found');
    }
    
    return () => console.log('IntroScreen unmounted');
  }, []);

  // Update locomotive scroll when content changes
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      const timer = setTimeout(() => {
        try {
          locomotiveScrollRef.current?.update();
          console.log('Locomotive Scroll updated');
        } catch (error) {
          console.error('Error updating Locomotive Scroll:', error);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const sections = [
    {
      id: 1,
      title: "Creating Feeling: A Call for Pacific Resilience",
      content: `This "game" is a call to action — to create feeling that transcends vast ocean distances separating Pacific nations.

Isolation comes easily when 30 million km² of sea spreads between communities. Yet connection runs deeper than geography.

This experience calls for a new paradigm: a Resilient Pacific reflecting Pacific culture, Pacific knowledge, and Pacific connection to land that must be cared for to perpetuate customs and ways of life.

The Blue Pacific 2050 Implementation Framework was mapped to 47 measurable indicators across 7 strategic pillars, transforming abstract policy into experiential decision-making.

Because frameworks matter. Indicators matter. But feelings move people toward the resilient future Pacific communities need.`,
      textColor: "text-cyan-100"
    },
    {
      id: 2,
      title: "Innovation in Data Sonification",
      content: `Real ocean tide data from Fiji (October 10, 2024) forms this experience's foundation.

Every high tide = rising water. Every low = retreat six hours later.

This isn't ambient sound — it's live environmental data converted to audio.

For Pacific communities, the ocean isn't background noise — it's the constant connecting 15 nations across 30 million km² of sea.

Data becomes visceral. Policy becomes personal. The sound of the ocean grounds every decision you'll make.`,
      textColor: "text-teal-100"
    },
    {
      id: 3,
      title: "The Pacific Paradox: 0.03% Emissions, 100% Impact",
      content: `Pacific nations emit less than 0.03% of global carbon emissions.
Yet face the highest per-capita climate risks globally.

This paradox drives everything: local action within global constraints.

Sea level rise doesn't roar like cyclones — it creeps quietly, invisibly, constantly.

Decisions in this experience reflect this tension — shaping Pacific outcomes while global forces accelerate beyond control.

The fundamental challenge of small island state policy: maximum adaptation with minimal causation.`,
      textColor: "text-orange-100"
    },
    {
      id: 4,
      title: "Seven Decisions, Systemic Impact",
      content: `Seven strategic decisions map to Blue Pacific 2050 pillars:

- Political Leadership & Governance
- People-Centered Development  
- Peace & Security
- Resource & Economic Development
- Climate Change & Disaster Resilience
- Oceans & Environment
- Technology & Connectivity

Each choice triggers cascading effects across indicators. No isolated outcomes — only interconnected systems.

This models real Pacific policy: everything connects across vast ocean distances.`,
      textColor: "text-purple-100"
    },
    {
      id: 5,
      title: "Beyond Quantitative: Why Stories Drive Policy",
      content: `Impact evaluation in the Pacific requires both numbers and narratives.

Quantitative indicators show what changed.
Qualitative stories show why it matters.

In small island contexts, a 2% GDP shift affects every family. A 10cm sea level rise reshapes entire communities.

This experience generates both: measurable indicator changes AND lived experience projections for 2050.

Because effective Pacific policy needs both spreadsheets and stories.`,
      textColor: "text-green-100"
    },
    {
      id: 6,
      title: "Policy Architect for 2050",
      content: `Decisions create ripple effects through 2050, showing how today's policy choices compound over decades.

This is Monitoring, Evaluation & Learning (MEL) as interactive experience.

The best policy frameworks don't just measure outcomes — they help decision-makers feel the weight of their choices.

Hope is strategy. Unity is strength. Dreaming is action.

Ready to architect the Pacific's next 25 years?

Let's begin.`,
      textColor: "text-indigo-100",
      isLast: true
    }
  ];

  return (
    <div ref={scrollRef} data-scroll-container className="bg-black text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="px-8 py-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">BLUE PACIFIC 2050</h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/80">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
        </div>
      </div>

      {/* First Block - SIMPLIFIED Layout */}
      <section 
        key={sections[0].id} 
        data-scroll-section
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-8 lg:px-12 xl:px-16 bg-black"
        id="section-0"
      >
        {/* Text Content - Left Side */}
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            {sections[0].title}
          </h2>
          <div className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white">
            {sections[0].content}
          </div>
        </div>

        {/* Image - Right Side - ALWAYS VISIBLE ON DESKTOP */}
        <div className="flex justify-center order-1 md:order-2">
          <img 
            src="/lovable-uploads/c4274d0f-201f-4d6e-920a-1131b2022596.png"
            alt="Blue Pacific 2050 Experience"
            className="w-full max-w-lg rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Rest of the sections with sticky behavior */}
      {sections.slice(1).map((section, index) => (
        <section 
          key={section.id} 
          data-scroll-section
          className="relative"
          id={`section-${index + 1}`}
        >
          {/* Fixed Image Container for this section - Hidden on mobile */}
          <div className="sticky-section hidden md:block" style={{ position: 'relative', height: '100vh' }}>
              <div 
                className="fixed-image"
                data-scroll
                data-scroll-sticky
                data-scroll-target={`#section-${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  overflow: 'hidden'
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={introImages[index + 1] || introImages[0]}
                    alt="Blue Pacific 2050 Experience"
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
            </div>
          </div>

          {/* Mobile Image - Visible only on mobile */}
          <div className="md:hidden w-full min-h-[50vh] flex items-center justify-center p-4 bg-black">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={introImages[index + 1] || introImages[0]}
                alt="Blue Pacific 2050 Experience"
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
              />
            </div>
          </div>

          {/* Scrolling Text Content */}
          <div className="scroll-text md:mr-[40vw] mr-0 p-8 md:p-16 min-h-screen flex items-center bg-black">
            <div className="max-w-2xl">
              <h2 
                className="text-4xl md:text-6xl font-bold mb-8 text-white"
                data-scroll
                data-scroll-speed="0.5"
              >
                {section.title}
              </h2>
              <div 
                className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white"
                data-scroll
                data-scroll-speed="0.3"
              >
                {section.content}
              </div>
              
              {section.isLast && (
                <div className="mt-12" data-scroll data-scroll-speed="0.2">
                  <Button
                    onClick={handleStart}
                    disabled={loading}
                    variant="pacific"
                    size="pacific"
                  >
                    <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10">
                      {loading ? 'Loading Audio...' : 'START YOUR JOURNEY TO 2050'}
                    </span>
                  </Button>
                  
                  <p className="mt-6 text-lg md:text-xl text-white/80 font-light">
                    Audio experience recommended for full immersion
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}