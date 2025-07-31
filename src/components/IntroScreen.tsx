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
      title: "A Call for Pacific Resilience",
      content: `Let's create a new paradigm: a Resilient Pacific reflecting Pacific culture, Pacific knowledge & Customs, a Pacific that Protects our connection to the land & perpetuates our way of life.

The 2050 Strategy for the Blue Pacific Continent features 10 commitments that Pacific Leaders have made to strengthen collective action and deepen regionalism. This piece was created to link stories to frameworks—to share and simplify by gamifying the great vision that our leaders have for our region.`,
      textColor: "text-cyan-100"
    },
    {
      id: 2,
      title: "The Game Mechanics & Your Challenge",
      content: `Quantitative indicators show what changed, but qualitative stories show why it matters. This experience blends indicators with stories because Pacific policy works best when it speaks our language. In small island contexts, a 2% GDP shift affects every family and a 10cm sea level rise reshapes entire communities.

The Strategy brings together seven interconnected thematic areas. This work analyzed each thematic area and its outcomes, anchoring strategy indicators (like % of women in parliament) in fictional stories that bridge policy complexity with lived reality.

There is no single "win" or "loss" in this game. Instead, the challenge is to achieve a balanced result where the Level of Ambition for all seven thematic areas is met. Each answer directly impacts one thematic but can also contribute to others. After each answer, you'll be projected directly into the grounded reality of your decision by hearing the story and impact it has on someone's life.`,
      textColor: "text-teal-100"
    },
    {
      id: 3,
      title: "The Immersive Journey & The Global Context",
      content: `Your Journey to 2050
Throughout this experience, you'll hear Fiji's ocean tides from October 10, 2024. Because sea level rise is in the background of our lives. It's music that plays on without us having much control over the ending.

Our destiny also depends on the world's choices. At the end of your journey, the game will randomly select one of three global climate scenarios:

1.5°C warming (SSP1-1.9: A future of rapid, successful decarbonization)

3°C warming (SSP2-4.5: A future of partial progress and dangerous warming)

5°C warming (SSP5-8.5: A future of high emissions and limited climate action)

The same October tides you hear now will sound very different 25 years later.

Enjoy the game—see you in the future.`,
      textColor: "text-orange-100",
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

      {/* Block 1: The Vision & The Purpose - Full-screen background */}
      <section 
        data-scroll-section
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${introAA})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        id="section-0"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Centered text content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8" data-scroll data-scroll-speed="0.3">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white animate-fade-in">
            {sections[0].title}
          </h2>
          <div className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white animate-fade-in">
            {sections[0].content}
          </div>
        </div>
      </section>

      {/* Block 2: The Game Mechanics & Your Challenge - Two-column grid */}
      <section 
        data-scroll-section
        className="min-h-screen bg-black"
        id="section-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 max-w-6xl mx-auto min-h-screen">
          {/* Image on the left */}
          <div className="order-2 md:order-1 flex justify-center" data-scroll data-scroll-speed="0.3">
            <img 
              src={introI}
              alt="Pacific village scene"
              className="w-full max-w-lg rounded-xl object-cover"
            />
          </div>
          
          {/* Text on the right */}
          <div className="order-1 md:order-2 space-y-6" data-scroll data-scroll-speed="0.5">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white animate-fade-in">
              {sections[1].title}
            </h2>
            <div className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white animate-fade-in">
              {sections[1].content}
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: The Immersive Journey & The Global Context - Two-column grid (reversed) */}
      <section 
        data-scroll-section
        className="min-h-screen bg-black"
        id="section-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 max-w-6xl mx-auto min-h-screen">
          {/* Text on the left */}
          <div className="space-y-6" data-scroll data-scroll-speed="0.5">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white animate-fade-in">
              {sections[2].title}
            </h2>
            <div className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white animate-fade-in">
              {sections[2].content}
            </div>
            
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
          </div>
          
          {/* Image on the right */}
          <div className="flex justify-center" data-scroll data-scroll-speed="0.3">
            <img 
              src={introH}
              alt="Person looking to the future"
              className="w-full max-w-lg rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}