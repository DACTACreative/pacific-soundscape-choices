import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Fixed Intro Title */}
      <div className="fixed top-6 left-6 z-50 text-white">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">BLUE PACIFIC 2050</h1>
        <p className="text-sm md:text-lg font-light tracking-wide">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
      </div>

      {/* Block 1 - Why This Project Exists - Text Left, Image Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            This piece was created to <strong className="text-[#35c5f2]">create feeling</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            To create a sense of belonging and hope — a rare feeling in the face of climate change.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            To show light.<br/>
            To involve more people into decisions that concern us — like the <strong className="text-[#35c5f2]">Blue Pacific 2050 Strategy</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            To bring us together as a region.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            We are mainly made of sea. We are so close… but so far.
          </p>
          <p className="text-sm md:text-lg text-[#35c5f2] font-light mt-6">
            The Pacific represents 10 million people across over 1,000 islands
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0b3d26]">
          <img src="/placeholder.svg" alt="Block 1 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block1-ocean-wave.jpg
          </div>
        </div>
      </div>

      {/* Block 2 - The Sound of Our Ocean - Image Left, Text Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0026d7]">
          <img src="/placeholder.svg" alt="Block 2 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block2-code-visualization.jpg
          </div>
        </div>
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            The sea is what brings us together.<br/>
            It's the backbone of our <strong className="text-[#35c5f2]">Pacific culture</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            When you begin the game, you will be projected into <strong className="text-[#35c5f2]">Fiji</strong>.<br/>
            The date is October 10, 2024.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            The sound you'll hear? It's <strong className="text-[#35c5f2]">real</strong>. The actual tide, sonified.
          </p>
          <p className="text-lg md:text-xl leading-tight">
            Each high tide = water rising.<br/>
            Each low = a retreat six hours later.
          </p>
          <p className="text-sm md:text-lg text-[#35c5f2] font-light mt-4">
            Sonification translates data into frequency-based sound.
          </p>
        </div>
      </div>

      {/* Block 3 - The Reality We Face - Text Left, Image Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            We are already on the path to a <strong className="text-red-400">warmer Earth</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            The Pacific contributes less than <strong className="text-[#35c5f2]">0.03%</strong> of global carbon emissions.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Yet we face the consequences just as much as any other region.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Sea level rise is one of our most <strong className="text-[#35c5f2]">silent threats</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight">
            So slow, so invisible… we forget.<br/>
            But it's always there — like the background sound of this ocean.
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-[#1b402f]">
          <img src="/placeholder.svg" alt="Block 3 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block3-foggy-summit.jpg
          </div>
        </div>
      </div>

      {/* Block 4 - Your Role in This Journey - Image Left, Text Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0026d7]">
          <img src="/placeholder.svg" alt="Block 4 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block4-idea-lightbulb.jpg
          </div>
        </div>
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            During this game, you'll be projected into a series of <strong className="text-[#35c5f2]">decisions</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Every one of them is connected to the themes and indicators from the <strong className="text-[#35c5f2]">Blue Pacific 2050 Implementation Plan</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Some are policy-based. Others are small-scale utopias.
          </p>
          <p className="text-xl md:text-2xl leading-tight">
            Why utopia? Because <strong className="text-[#35c5f2]">keeping hope is a form of resistance</strong>.
          </p>
        </div>
      </div>

      {/* Block 5 - The Game as Framework - Text Left, Image Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            This is a simplification. A <strong className="text-[#35c5f2]">gamification</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            A playable form of Monitoring, Evaluation, and Learning (MEL).
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Because sometimes impact gets buried in spreadsheets.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            And here — <strong className="text-[#35c5f2]">impact becomes immersive</strong>.<br/>
            It becomes personal.
          </p>
          <p className="text-xl md:text-2xl leading-tight">
            Frameworks and policies are crucial, yes.<br/>
            But <strong className="text-[#35c5f2]">emotion moves people</strong>. Feeling makes things real.
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0b3d26]">
          <img src="/placeholder.svg" alt="Block 5 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block5-laptop-surface.jpg
          </div>
        </div>
      </div>

      {/* Block 6 - Mechanics of the Game - Image Left, Text Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 h-full flex items-center justify-center bg-[#1b402f]">
          <img src="/placeholder.svg" alt="Block 6 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block6-programming-monitor.jpg
          </div>
        </div>
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            You'll make <strong className="text-[#35c5f2]">seven key decisions</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Each one maps directly to the seven Blue Pacific Strategy pillars:
          </p>
          <div className="text-lg md:text-xl leading-relaxed space-y-2 ml-4">
            <p><strong className="text-[#35c5f2]">Political Leadership</strong></p>
            <p><strong className="text-[#35c5f2]">People-Centered Development</strong></p>
            <p><strong className="text-[#35c5f2]">Peace & Security</strong></p>
            <p><strong className="text-[#35c5f2]">Resource & Economic Development</strong></p>
            <p><strong className="text-[#35c5f2]">Climate Change</strong></p>
            <p><strong className="text-[#35c5f2]">Oceans & Environment</strong></p>
            <p><strong className="text-[#35c5f2]">Technology & Connectivity</strong></p>
          </div>
          <p className="text-xl md:text-2xl leading-tight mt-4">
            Each decision will shape our region in subtle, <strong className="text-[#35c5f2]">measurable ways</strong>.
          </p>
        </div>
      </div>

      {/* Block 7 - The Twist - Text Left, Image Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Once your decisions are made, the world moves forward.<br/>
            <strong className="text-[#35c5f2]">Welcome to 2050</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            But here's the truth:
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            You do not decide the global climate scenario.<br/>
            It is assigned — <strong className="text-red-400">randomly</strong> — based on global uncertainty.
          </p>
          <div className="text-lg md:text-xl leading-relaxed space-y-2 ml-4 mb-4">
            <p><strong className="text-green-400">1.5°C:</strong> Achieved through massive global cooperation</p>
            <p><strong className="text-yellow-400">2.5°C:</strong> A fractured effort</p>
            <p><strong className="text-red-400">3°C+:</strong> Inaction, delay, loss</p>
          </div>
          <p className="text-xl md:text-2xl leading-tight">
            This randomness mirrors our <strong className="text-[#35c5f2]">power imbalance</strong> in real life.<br/>
            We are not the biggest polluters — yet we carry the weight.
          </p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0026d7]">
          <img src="/placeholder.svg" alt="Block 7 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block7-matrix-still.jpg
          </div>
        </div>
      </div>

      {/* Block 8 - Seeing Your Impact - Image Left, Text Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 h-full flex items-center justify-center bg-[#0b3d26]">
          <img src="/placeholder.svg" alt="Block 8 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block8-screens-display.jpg
          </div>
        </div>
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Once 2050 loads, you'll see the <strong className="text-[#35c5f2]">consequences</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            How did your choices align with the Blue Pacific indicators?<br/>
            How did they affect people on the ground?<br/>
            How did regional strategies hold under climate pressure?
          </p>
          <p className="text-xl md:text-2xl leading-tight">
            This section mixes <strong className="text-[#35c5f2]">narrative, visualisation, and strategy</strong>.<br/>
            You'll meet people. Hear how one decision affected them. See a dashboard of change.
          </p>
        </div>
      </div>

      {/* Block 9 - Last Words Before You Begin - Text Left, Image Right */}
      <div className="h-screen flex items-center sticky top-0">
        <div className="w-1/2 p-12 text-white font-bold tracking-tight">
          <p className="text-xl md:text-2xl leading-tight mb-4">
            Yes, the ocean is rising.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            But <strong className="text-[#35c5f2]">so are we</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            And each action — however small — <strong className="text-[#35c5f2]">creates a wave</strong>.
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-4">
            This experience is here to remind us:
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-6">
            <strong className="text-[#35c5f2]">Hope is an act. Strategy is a tool. And unity is our strength.</strong>
          </p>
          <p className="text-xl md:text-2xl leading-tight mb-8">
            Let's shape a future that looks like us — not one shaped without us.
          </p>

          <div className="mt-6">
            <Button
              onClick={handleStart}
              disabled={loading}
              size="lg"
              className="group relative px-8 py-4 text-lg font-semibold bg-transparent border-2 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
            >
              <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">
                {loading ? 'Loading Audio...' : 'SHAPE OUR JOURNEY TO 2050'}
              </span>
            </Button>
            
            <p className="mt-4 text-lg text-white font-bold">
              Audio experience recommended for full immersion
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-[#1b402f]">
          <img src="/placeholder.svg" alt="Block 9 Visual" className="w-4/5 h-3/5 object-cover rounded-lg shadow-lg" />
          <div className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 p-2 rounded">
            Image name: block9-deer-mountain.jpg
          </div>
        </div>
      </div>
    </div>
  );
}