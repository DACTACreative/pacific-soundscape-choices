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
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-white tracking-wider">
            BLUE PACIFIC 2050
          </h1>
        </div>
      </div>

      <div ref={scrollRef} data-scroll-container style={{ background: '#000000' }}>
        {/* Block 1 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <img 
                src="/images/block-01-ocean-sound.jpg" 
                alt="Ocean Sound" 
                className="w-full h-auto block rounded-xl"
              />
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-bold mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                This piece was created to <span className="text-[#35c5f2]">create feeling</span>.
              </h2>
              <p className="text-[#f4f4f0] leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                To create a sense of belonging and hope — a rare feeling in the face of climate change.
              </p>
            </div>
          </div>
        </section>

        {/* Block 2 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10 order-1" data-scroll>
              <h2 className="text-[#35c5f2] font-bold mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Fiji's tide recorded on <span className="text-[#35c5f2]">October 10, 2024</span>
              </h2>
              <p className="text-[#f4f4f0] leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                This exact sound recording captures the natural rhythm of Suva's coastline. Your decisions will shape how this sound evolves by 2050.
              </p>
            </div>
            
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10 order-2" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <img 
                src="/images/block-02-fiji-tide.jpg" 
                alt="Fiji Tide" 
                className="w-full h-auto block rounded-xl"
              />
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
              <img 
                src="/images/block-03-climate-scenario.jpg" 
                alt="Climate Scenario" 
                className="w-full h-auto block rounded-xl"
              />
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-bold mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Your scenario is assigned <span className="text-[#35c5f2]">randomly</span>
              </h2>
              <p className="text-[#f4f4f0] leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Like climate change itself, the outcome isn't entirely predictable. Your journey ends in one of three possible 2050 scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Block 4 */}
        <section data-scroll-section className="scroll-block">
          <div className="scroll-block__wrapper flex items-center justify-between min-h-[120vh] relative px-[8vw] py-16">
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10 order-1" data-scroll>
              <h2 className="text-[#35c5f2] font-bold mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Based on <span className="text-[#35c5f2]">Blue Pacific Strategy</span> indicators
              </h2>
              <p className="text-[#f4f4f0] leading-relaxed font-normal" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
                Sea level rise, coral health, displacement, and resilience metrics drawn from Pacific data sources.
              </p>
            </div>
            
            <div 
              className="scroll-block__image w-[45%] max-w-[500px] relative z-10 order-2" 
              data-scroll 
              data-scroll-sticky 
              data-scroll-target=".scroll-block__wrapper"
            >
              <img 
                src="/images/block-04-blue-strategy.jpg" 
                alt="Blue Pacific Strategy" 
                className="w-full h-auto block rounded-xl"
              />
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
              <img 
                src="/images/block-05-resilience-choice.jpg" 
                alt="Resilience Choice" 
                className="w-full h-auto block rounded-xl"
              />
            </div>
            
            <div className="scroll-block__text w-[45%] max-w-[500px] relative z-10" data-scroll>
              <h2 className="text-[#35c5f2] font-bold mb-4" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
                Every choice echoes to <span className="text-[#35c5f2]">2050</span>
              </h2>
              <p className="text-[#f4f4f0] leading-relaxed font-normal mb-8" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: '1.6' }}>
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