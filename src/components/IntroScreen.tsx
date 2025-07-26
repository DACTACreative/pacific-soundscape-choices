import { useEffect, useRef } from 'react';
import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';

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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">BLUE PACIFIC 2050</h1>
        <p className="text-sm md:text-lg font-light tracking-wide">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
      </div>

      {/* Block 1 - Text Left, Image Right */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                This piece was created to <strong className="text-[#35c5f2]">create feeling</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                To create a sense of belonging and hope — a rare feeling in the face of climate change.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                To show light.<br/>
                To involve more people into decisions that concern us — like the <strong className="text-[#35c5f2]">Blue Pacific 2050 Strategy</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                To bring us together as a region.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                We are mainly made of sea. We are so close… but so far.
              </p>
              <p className="text-sm md:text-base text-[#35c5f2] font-light">
                The Pacific represents 10 million people across over 1,000 islands
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-01">
            <div id="block-01" className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Ocean Sound" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-01-ocean-sound.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2 - Text Right, Image Left */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                The sea is what brings us together.<br/>
                It's the backbone of our <strong className="text-[#35c5f2]">Pacific culture</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                When you begin the game, you will be projected into <strong className="text-[#35c5f2]">Fiji</strong>.<br/>
                The date is October 10, 2024.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                The sound you'll hear? It's <strong className="text-[#35c5f2]">real</strong>. The actual tide, sonified.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Each high tide = water rising.<br/>
                Each low = a retreat six hours later.
              </p>
              <p className="text-sm md:text-base text-[#35c5f2] font-light mt-4">
                <strong className="text-[#35c5f2]">Sonification</strong> translates data into frequency-based sound.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-02">
            <div id="block-02" className="w-full max-w-md aspect-[3/4] bg-[#0026d7] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Fiji Tide" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-02-fiji-tide.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3 - Text Left, Image Right */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                We are already on the path to a <strong className="text-red-400">warmer Earth</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                The Pacific contributes less than <strong className="text-[#35c5f2]">0.03%</strong> of global carbon emissions.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Yet we face the consequences just as much as any other region.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Sea level rise is one of our most <strong className="text-[#35c5f2]">silent threats</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                So slow, so invisible… we forget.<br/>
                But it's always there — like the background sound of this ocean.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-03">
            <div id="block-03" className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Climate Scenario" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-03-climate-scenario.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 - Text Right, Image Left */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                During this game, you'll be projected into a series of <strong className="text-[#35c5f2]">decisions</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Every one of them is connected to the themes and indicators from the <strong className="text-[#35c5f2]">Blue Pacific 2050 Implementation Plan</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Some are policy-based. Others are small-scale utopias.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Why utopia? Because <strong className="text-[#35c5f2]">keeping hope is a form of resistance</strong>.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-04">
            <div id="block-04" className="w-full max-w-md aspect-[3/4] bg-[#0026d7] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Resilience Response" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-04-resilience-response.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5 - Text Left, Image Right */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                This is a simplification. A <strong className="text-[#35c5f2]">gamification</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                A playable form of Monitoring, Evaluation, and Learning (MEL).
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Because sometimes impact gets buried in spreadsheets.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                And here — <strong className="text-[#35c5f2]">impact becomes immersive</strong>.<br/>
                It becomes personal.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Frameworks and policies are crucial, yes.<br/>
                But <strong className="text-[#35c5f2]">emotion moves people</strong>. Feeling makes things real.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-05">
            <div id="block-05" className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Blue Pacific Strategy" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-05-blue-pacific-strategy.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 6 - Text Right, Image Left */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                You'll make <strong className="text-[#35c5f2]">seven key decisions</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Each one maps directly to the seven <strong className="text-[#35c5f2]">Blue Pacific Strategy</strong> pillars:
              </p>
              <div className="text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-6">
                <p><strong className="text-[#35c5f2]">Political Leadership</strong></p>
                <p><strong className="text-[#35c5f2]">People-Centered Development</strong></p>
                <p><strong className="text-[#35c5f2]">Peace & Security</strong></p>
                <p><strong className="text-[#35c5f2]">Resource & Economic Development</strong></p>
                <p><strong className="text-[#35c5f2]">Climate Change</strong></p>
                <p><strong className="text-[#35c5f2]">Oceans & Environment</strong></p>
                <p><strong className="text-[#35c5f2]">Technology & Connectivity</strong></p>
              </div>
              <p className="text-lg md:text-xl leading-relaxed">
                Each decision will shape our region in subtle, <strong className="text-[#35c5f2]">measurable ways</strong>.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-06">
            <div id="block-06" className="w-full max-w-md aspect-[3/4] bg-[#0026d7] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="People Impacted" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-06-people-impacted.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 7 - Text Left, Image Right */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Once your decisions are made, the world moves forward.<br/>
                <strong className="text-[#35c5f2]">Welcome to 2050</strong>.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                But here's the truth:
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                You do not decide the global <strong className="text-[#35c5f2]">climate scenario</strong>.<br/>
                It is assigned — <strong className="text-red-400">randomly</strong> — based on global uncertainty.
              </p>
              <div className="text-base md:text-lg leading-relaxed space-y-2 ml-4 mb-6">
                <p><strong className="text-green-400">1.5°C:</strong> Achieved through massive global cooperation</p>
                <p><strong className="text-yellow-400">2.5°C:</strong> A fractured effort</p>
                <p><strong className="text-red-400">3°C+:</strong> Inaction, delay, loss</p>
              </div>
              <p className="text-lg md:text-xl leading-relaxed">
                This randomness mirrors our <strong className="text-[#35c5f2]">power imbalance</strong> in real life.<br/>
                We are not the biggest polluters — yet we carry the weight.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-07">
            <div id="block-07" className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Climate Uncertainty" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-07-climate-uncertainty.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 8 - Text Right, Image Left */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Once <strong className="text-[#35c5f2]">2050</strong> loads, you'll see the consequences.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                How did your choices align with the Blue Pacific indicators?<br/>
                How did they affect people on the ground?<br/>
                How did regional strategies hold under climate pressure?
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                This section mixes <strong className="text-[#35c5f2]">narrative, visualisation, and strategy</strong>.<br/>
                You'll meet people. Hear how one decision affected them. See a dashboard of change.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-08">
            <div id="block-08" className="w-full max-w-md aspect-[3/4] bg-[#0026d7] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Impact Dashboard" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-08-impact-dashboard.jpg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 9 - Final CTA - Text Left, Image Right */}
      <section data-scroll-section className="min-h-screen flex items-center px-6 md:px-12 py-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2" data-scroll data-scroll-speed="1">
            <div className="max-w-2xl">
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
          <div className="lg:w-1/2 flex justify-center" data-scroll data-scroll-sticky data-scroll-target="#block-09">
            <div id="block-09" className="w-full max-w-md aspect-[3/4] bg-[#0b3d26] rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg" alt="Future Hope" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-50 p-2 rounded">
                block-09-future-hope.jpg
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}