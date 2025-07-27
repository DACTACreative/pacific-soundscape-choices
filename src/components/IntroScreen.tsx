import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';

// Updated image imports to use absolute GitHub URLs for Lovable compatibility
const introA = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-a.png';
const introAA = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-aa.png';
const introB = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-b.png';
const introC = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-c.png';
const introD = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-d.png';
const introE = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-e.png';
const introF = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-f.png';
const introG = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-g.png';
const introH = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-h.png';
const introI = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-i.png';
const introJ = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/intro-j.png';
const scenarioO = 'https://raw.githubusercontent.com/DACTACreative/pacific-soundscape-choices/main/public/data/Scenario-o.png';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const locoScrollRef = useRef<any>(null);
  const [isLocoLoaded, setIsLocoLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleStart = () => {
    try {
      playScenario(Scenario.Scenario0);
      onStart();
    } catch (error) {
      console.error('Error starting scenario:', error);
    }
  };

  // Reordered to have introAA first, then introA, then the rest in order
  const introImages = [introAA, introA, introJ, introC, introD, introE, introF, introG, introH, introI, introB];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      console.log('🖼️ Preloading images...');
      const imagePromises = [scenarioO, ...introImages].map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log('✅ Image loaded:', src.split('/').pop());
            resolve(src);
          };
          img.onerror = () => {
            console.warn('❌ Image failed to load:', src.split('/').pop());
            resolve(src); // Resolve anyway to not block the process
          };
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
      console.log('🖼️ All images preloaded');
    };

    preloadImages();
  }, []);

  // Initialize Locomotive Scroll after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    const initLocomotiveScroll = async () => {
      try {
        console.log('🚂 Initializing Locomotive Scroll...');
        
        // Wait for DOM to be ready
        await new Promise(resolve => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
          } else {
            resolve(void 0);
          }
        });

        // Additional delay to ensure all images are rendered
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dynamically import locomotive-scroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (scrollRef.current && !locoScrollRef.current) {
          console.log('🚂 Creating Locomotive Scroll instance...');
          
          locoScrollRef.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: window.innerWidth > 768,
            multiplier: 0.8,
            class: 'is-revealed',
            smartphone: {
              smooth: false
            },
            tablet: {
              smooth: false
            },
            reloadOnContextChange: true,
            resetNativeScroll: true
          });
          
          // Wait for locomotive to fully initialize
          setTimeout(() => {
            if (locoScrollRef.current) {
              locoScrollRef.current.update();
              setIsLocoLoaded(true);
              console.log('✅ Locomotive Scroll initialized successfully');
            }
          }, 500);

          // Update on window resize
          const handleResize = () => {
            if (locoScrollRef.current) {
              setTimeout(() => {
                locoScrollRef.current.update();
              }, 100);
            }
          };

          window.addEventListener('resize', handleResize);
          
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }
      } catch (error) {
        console.error('❌ Error initializing Locomotive Scroll:', error);
        setIsLocoLoaded(true); // Set to true even if locomotive fails
      }
    };

    const timeoutId = setTimeout(initLocomotiveScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      if (locoScrollRef.current) {
        console.log('🚂 Destroying Locomotive Scroll...');
        try {
          locoScrollRef.current.destroy();
          locoScrollRef.current = null;
        } catch (error) {
          console.warn('Warning destroying Locomotive Scroll:', error);
        }
      }
    };
  }, [imagesLoaded]);

  // Debug logging
  useEffect(() => {
    console.log('IntroScreen state:', {
      loading,
      imagesLoaded,
      isLocoLoaded,
      firstImageSrc: scenarioO
    });
  }, [loading, imagesLoaded, isLocoLoaded]);

  const blocks = [
    {
      id: 1,
      title: "Creating Feeling",
      content: `To awaken a sense of belonging, of togetherness, of hope — a rare and sacred emotion when facing the planetary scale of climate change.

To shine light where despair often creeps in.

To invite more people into the conversations that shape our region — especially around the Blue Pacific 2050 Strategy.

To stitch connection across distant shores.

Because we are mostly sea — scattered, yet bound. So close… yet often made to feel far.

This is a game, yes — but it's also a call to feel.`,
      reversed: false
    },
    {
      id: 2,
      title: "The Sound of Our Ocean",
      content: `The sea is what brings us together.
It is our memory, our movement, our story.

This piece focuses on sound — the sound of our ocean — to carry you through this journey.

When you begin, you’ll be immersed in Fiji.
The date: October 10, 2024.

The sound you hear is real.
It is the actual tide — sonified.

Each high tide = rising water.
Each low = its slow retreat six hours later.

This soundscape grounds us. Because for the Pacific, the ocean is not background — it’s home.`,
      reversed: true
    },
    {
      id: 3,
      title: "The Reality We Face",
      content: `We are already living in a warmer world.

The Pacific emits less than 0.03% of global carbon emissions.
Yet we stand on the frontlines of its consequences.

Sea level rise is one of our most silent threats.
It does not roar like a cyclone — it creeps. Quietly.
And because it's invisible, we forget.

But like the sound of waves — always returning — the threat remains.

This is not alarmism. It’s presence. And we must respond with clarity and imagination.`,
    reversed: false
    },
    {
      id: 4,
      title: "Your Role in This Journey",
      content: `As you enter this experience, you'll face a series of seven decisions.

Each is inspired by the Blue Pacific 2050 Implementation Plan — its real goals, real indicators, and real challenges.

Some choices reflect public policy. Others are visions of community-led futures — new models, small-scale utopias.

Why utopias?

Because in the Pacific, hope is not a luxury. It’s a lifeline.
And imagining better is how we resist being written out of the future.`,
    reversed: true
    },
    {
      id: 5,
      title: "Why This Is a Game",
      content: `This is a simplification — a gamified journey.

It’s also a living form of Monitoring, Evaluation, and Learning (MEL).
Because data shouldn’t just live in spreadsheets.

Here, it becomes visual. Sensory. Emotional.

Frameworks matter. Indicators matter. 
But feelings move people. Stories hold power.

This experience invites you to reflect not just on numbers — but on what we value, and how we act.`,
      reversed: false
    },
    {
      id: 6,
      title: "Your Decisions Shape the Region",
      content: `You will make seven key decisions.

Each one maps directly to a pillar of the Blue Pacific Strategy:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Your choices affect these domains in subtle, interconnected ways.
You won’t get a score — you’ll get ripple effects. Shifting indicators. Lived futures.

Because in the real world, outcomes are rarely binary.`,
    reversed: true
    },
    {
      id: 7,
      title: "But You Don’t Control the World",
      content: `You will make seven key decisions.

Each one maps directly to a pillar of the Blue Pacific Strategy:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Your choices affect these domains in subtle, interconnected ways.
You won’t get a score — you’ll get ripple effects. Shifting indicators. Lived futures.

Because in the real world, outcomes are rarely binary.`,
   reversed: false
    },
    {
      id: 8,
      title: "The Ripple Effects in 2050",
      content: `You will make seven key decisions.

Each one maps directly to a pillar of the Blue Pacific Strategy:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Your choices affect these domains in subtle, interconnected ways.
You won’t get a score — you’ll get ripple effects. Shifting indicators. Lived futures.

Because in the real world, outcomes are rarely binary.`,
     reversed: true
    },
    {
      id: 9,
      title: "Last Words Before You Begin",
      content: `Yes, the ocean is rising.
But so are we.

Every small decision sends a signal.
Every story is a compass.

This game is a reminder:
Hope is strategy.
Unity is strength.
And dreaming is action.

Let’s co-create a future shaped by us — not for us.

Let’s begin.`,
   reversed: false,
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

      {/* First Block - Full Page Layout */}
      <section 
        key={blocks[0].id} 
        data-scroll-section
        className="relative h-screen flex flex-col lg:flex-row"
        id="section-0"
      >
        {/* Sticky Image Container for first section - Hidden on mobile */}
        <div className="sticky-section hidden lg:block" style={{ position: 'relative', height: '100vh' }}>
          <div 
            className="fixed-image"
            data-scroll
            data-scroll-sticky
            data-scroll-target="#section-0"
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
                src={scenarioO}
                alt="Blue Pacific 2050 Experience"
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Image - Visible only on mobile */}
        <div className="lg:hidden w-full min-h-[50vh] flex items-center justify-center p-4 bg-black">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={scenarioO}
              alt="Blue Pacific 2050 Experience"
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>
        </div>

        {/* Text Content - Left Side */}
        <div className="w-full lg:w-[60%] h-full flex items-center p-8 lg:p-16 bg-black">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              {blocks[0].title}
            </h2>
            <div className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white">
              {blocks[0].content}
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the blocks with sticky behavior */}
      {blocks.slice(1).map((block, index) => (
        <section 
          key={block.id} 
          data-scroll-section
          className="relative"
          id={`section-${index + 1}`}
        >
          {/* Fixed Image Container for this section - Hidden on mobile */}
          <div className="sticky-section hidden lg:block" style={{ position: 'relative', height: '100vh' }}>
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
          <div className="lg:hidden w-full min-h-[50vh] flex items-center justify-center p-4 bg-black">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={introImages[index + 1] || introImages[0]}
                alt="Blue Pacific 2050 Experience"
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
              />
            </div>
          </div>

          {/* Scrolling Text Content */}
          <div className="scroll-text lg:mr-[40vw] mr-0 p-8 lg:p-16 min-h-screen flex items-center bg-black">
            <div className="max-w-2xl">
              <h2 
                className="text-4xl md:text-6xl font-bold text-white mb-8"
                data-scroll
                data-scroll-speed="0.5"
              >
                {block.title}
              </h2>
              <div 
                className="text-xl md:text-2xl leading-relaxed whitespace-pre-line text-white"
                data-scroll
                data-scroll-speed="0.3"
              >
                {block.content}
              </div>
              
              {block.isLast && (
                <div className="mt-12" data-scroll data-scroll-speed="0.2">
                  <Button
                    onClick={handleStart}
                    disabled={loading}
                    size="lg"
                    className="group relative px-8 py-6 text-2xl md:text-3xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
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