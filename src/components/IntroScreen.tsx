import { useEffect, useRef } from 'react';
import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

        // GSAP ScrollTrigger integration
        locomotiveScroll.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollRef.current, {
          scrollTop(value) {
            return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: scrollRef.current!.style.transform ? "transform" : "fixed"
        });

        // Fade transitions for images
        gsap.utils.toArray('.scroll-block__image').forEach((image: any, i) => {
          gsap.fromTo(image, 
            { opacity: 0 }, 
            {
              opacity: 1,
              scrollTrigger: {
                trigger: image,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
                scroller: scrollRef.current
              }
            });
        });

        ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
        ScrollTrigger.refresh();
      }
    };

    initLocomotiveScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };

  return (
    <div style={{ background: '#000000' }}>
      <div ref={scrollRef} data-scroll-container style={{ background: '#000000' }}>
        {/* Title Block */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper min-h-[120vh] relative px-[8vw] py-16">
            <div className="scroll-block__text w-full max-w-none relative z-10" data-scroll>
              <h1 className="text-white font-normal mb-4" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '0.1em' }}>
                BLUE PACIFIC 2050
              </h1>
              <p className="text-white leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Choose Your Pacific Future
              </p>
            </div>
          </div>
        </section>

        {/* Block 1 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
                  alt="Ocean Sound" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#d1d5db';
                  }}
                />
              </div>
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-normal mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                This piece was created to create feeling.
              </h2>
              <p className="text-white leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                To create a sense of belonging and hope — a rare feeling in the face of climate change.
              </p>
            </div>
          </div>
        </section>

        {/* Block 2 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10 order-1" data-scroll>
              <h2 className="text-[#35c5f2] font-normal mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Fiji's tide recorded on October 10, 2024
              </h2>
              <p className="text-white leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                This exact sound recording captures the natural rhythm of Suva's coastline. Your decisions will shape how this sound evolves by 2050.
              </p>
            </div>
            
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10 order-2" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="Fiji Tide" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#d1d5db';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Block 3 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                  alt="Climate Scenario" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#d1d5db';
                  }}
                />
              </div>
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-normal mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Your scenario is assigned randomly
              </h2>
              <p className="text-white leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Like climate change itself, the outcome isn't entirely predictable. Your journey ends in one of three possible 2050 scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Block 4 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10 order-1" data-scroll>
              <h2 className="text-[#35c5f2] font-normal mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Based on Blue Pacific Strategy indicators
              </h2>
              <p className="text-white leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Sea level rise, coral health, displacement, and resilience metrics drawn from Pacific data sources.
              </p>
            </div>
            
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10 order-2" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                  alt="Blue Pacific Strategy" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#d1d5db';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Block 5 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
                  alt="Resilience Choice" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#d1d5db';
                  }}
                />
              </div>
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-normal mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Every choice echoes to 2050
              </h2>
              <p className="text-white leading-relaxed font-normal mb-8" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Energy, adaptation, regional cooperation — your decisions shape the Pacific's climate future.
              </p>
              
              {!loading && (
                <Button
                  onClick={handleStart}
                  className="px-8 py-4 text-lg font-semibold bg-[#35c5f2] text-black hover:bg-[#0026d7] hover:text-white transition-all duration-300 rounded-lg"
                >
                  Begin Your Journey
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}