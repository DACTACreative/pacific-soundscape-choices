import { useEffect, useRef } from 'react';
import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import IntroBlock from './intro/IntroBlock';
import { introBlocks } from './intro/IntroContent';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      
      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
        });
      }
    };

    initLocomotiveScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };

  return (
    <div ref={scrollRef} data-scroll-container className="bg-black text-white">
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 text-white">BLUE PACIFIC 2050</h1>
        <p className="text-sm md:text-lg font-light tracking-wide text-white">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
      </div>

      {/* Intro Blocks */}
      {introBlocks.map((block) => (
        <IntroBlock
          key={block.id}
          id={block.id}
          content={block.content}
          imageBg={block.imageBg}
          imageAlt={block.imageAlt}
          imageFilename={block.imageFilename}
          isReversed={block.isReversed}
        />
      ))}

      {/* Final CTA Block */}
      <section data-scroll-section className="h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="w-full flex items-center gap-16">
            
            {/* Text Content */}
            <div className="w-1/2 flex justify-center" data-scroll data-scroll-speed="1">
              <div className="max-w-2xl text-white">
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  Yes, the ocean is rising.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  But <strong className="text-[#35c5f2]">so are we</strong>.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  And each action — however small — <strong className="text-[#35c5f2]">creates a wave</strong>.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  This experience is here to remind us:
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  <strong className="text-[#35c5f2]">Hope is an act. Strategy is a tool. And unity is our strength.</strong>
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Let's shape a future that looks like us — not one shaped without us.
                </p>

                <div className="mt-8">
                  <Button
                    onClick={handleStart}
                    disabled={loading}
                    size="lg"
                    className="group relative px-8 py-4 text-base font-semibold bg-transparent border-2 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
                  >
                    <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10">
                      {loading ? 'Loading Audio...' : 'SHAPE OUR JOURNEY TO 2050'}
                    </span>
                  </Button>
                  
                  <p className="mt-4 text-sm md:text-base text-white font-light">
                    Audio experience recommended for full immersion
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#final-cta">
              <div className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl relative">
                <img src="/placeholder.svg" alt="Future Hope" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                  block-09-future-hope.jpg
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}