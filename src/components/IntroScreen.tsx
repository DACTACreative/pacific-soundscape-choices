import { useAudio, Scenario } from '@/context/AudioContext';
import StoryScrollSection from './StoryScrollSection';
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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll" style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}>
      {/* Fixed Intro Title */}
      <div className="fixed top-12 left-12 z-50 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">BLUE PACIFIC 2050</h1>
        <p className="text-xl md:text-2xl font-light tracking-wide">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
      </div>

      {/* Block 1 - Why This Project Exists */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            This piece was created to <strong className="text-coral-warm">create feeling</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            To create a sense of belonging and hope — a rare feeling in the face of climate change.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            To show light.<br/>
            To involve more people into decisions that concern us — like the <strong className="text-coral-warm">Blue Pacific 2050 Strategy</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            To bring us together as a region.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            We are mainly made of sea. We are so close… but so far.
          </p>
          <p className="text-2xl md:text-3xl text-coral-warm font-light mt-12">
            The Pacific represents 10 million people across over 1,000 islands
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 2 - The Sound of Our Ocean */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            The sea is what brings us together.<br/>
            It's the backbone of our <strong className="text-coral-warm">Pacific culture</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            When you begin the game, you will be projected into <strong className="text-coral-warm">Fiji</strong>.<br/>
            The date is October 10, 2024.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            The sound you'll hear? It's <strong className="text-coral-warm">real</strong>. The actual tide, sonified.
          </p>
          <p className="text-3xl md:text-4xl leading-tight">
            Each high tide = water rising.<br/>
            Each low = a retreat six hours later.
          </p>
          <p className="text-xl md:text-2xl text-coral-warm font-light mt-8">
            Sonification translates data into frequency-based sound.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 3 - The Reality We Face */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            We are already on the path to a <strong className="text-red-400">warmer Earth</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            The Pacific contributes less than <strong className="text-coral-warm">0.03%</strong> of global carbon emissions.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Yet we face the consequences just as much as any other region.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Sea level rise is one of our most <strong className="text-coral-warm">silent threats</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            So slow, so invisible… we forget.<br/>
            But it's always there — like the background sound of this ocean.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 4 - Your Role in This Journey */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            During this game, you'll be projected into a series of <strong className="text-coral-warm">decisions</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Every one of them is connected to the themes and indicators from the <strong className="text-coral-warm">Blue Pacific 2050 Implementation Plan</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Some are policy-based. Others are small-scale utopias.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            Why utopia? Because <strong className="text-coral-warm">keeping hope is a form of resistance</strong>.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 5 - The Game as Framework */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            This is a simplification. A <strong className="text-coral-warm">gamification</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            A playable form of Monitoring, Evaluation, and Learning (MEL).
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Because sometimes impact gets buried in spreadsheets.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            And here — <strong className="text-coral-warm">impact becomes immersive</strong>.<br/>
            It becomes personal.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            Frameworks and policies are crucial, yes.<br/>
            But <strong className="text-coral-warm">emotion moves people</strong>. Feeling makes things real.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 6 - Mechanics of the Game */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            You'll make <strong className="text-coral-warm">seven key decisions</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Each one maps directly to the seven Blue Pacific Strategy pillars:
          </p>
          <div className="text-3xl md:text-4xl leading-relaxed space-y-4 ml-8">
            <p><strong className="text-coral-warm">Political Leadership</strong></p>
            <p><strong className="text-coral-warm">People-Centered Development</strong></p>
            <p><strong className="text-coral-warm">Peace & Security</strong></p>
            <p><strong className="text-coral-warm">Resource & Economic Development</strong></p>
            <p><strong className="text-coral-warm">Climate Change</strong></p>
            <p><strong className="text-coral-warm">Oceans & Environment</strong></p>
            <p><strong className="text-coral-warm">Technology & Connectivity</strong></p>
          </div>
          <p className="text-4xl md:text-6xl leading-tight mt-8">
            Each decision will shape our region in subtle, <strong className="text-coral-warm">measurable ways</strong>.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 7 - The Twist */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Once your decisions are made, the world moves forward.<br/>
            <strong className="text-coral-warm">Welcome to 2050</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            But here's the truth:
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            You do not decide the global climate scenario.<br/>
            It is assigned — <strong className="text-red-400">randomly</strong> — based on global uncertainty.
          </p>
          <div className="text-3xl md:text-4xl leading-relaxed space-y-4 ml-8 mb-8">
            <p><strong className="text-green-400">1.5°C:</strong> Achieved through massive global cooperation</p>
            <p><strong className="text-yellow-400">2.5°C:</strong> A fractured effort</p>
            <p><strong className="text-red-400">3°C+:</strong> Inaction, delay, loss</p>
          </div>
          <p className="text-4xl md:text-6xl leading-tight">
            This randomness mirrors our <strong className="text-coral-warm">power imbalance</strong> in real life.<br/>
            We are not the biggest polluters — yet we carry the weight.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 8 - Seeing Your Impact */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Once 2050 loads, you'll see the <strong className="text-coral-warm">consequences</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            How did your choices align with the Blue Pacific indicators?<br/>
            How did they affect people on the ground?<br/>
            How did regional strategies hold under climate pressure?
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            This section mixes <strong className="text-coral-warm">narrative, visualisation, and strategy</strong>.<br/>
            You'll meet people. Hear how one decision affected them. See a dashboard of change.
          </p>
        </div>
      </StoryScrollSection>

      {/* Block 9 - Last Words Before You Begin */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight max-w-4xl text-center">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            Yes, the ocean is rising.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            But <strong className="text-coral-warm">so are we</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            And each action — however small — <strong className="text-coral-warm">creates a wave</strong>.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            This experience is here to remind us:
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-12">
            <strong className="text-coral-warm">Hope is an act. Strategy is a tool. And unity is our strength.</strong>
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-16">
            Let's shape a future that looks like us — not one shaped without us.
          </p>

          <div className="mt-12 text-center">
            <Button
              onClick={handleStart}
              disabled={loading}
              size="lg"
              className="group relative px-12 py-6 text-xl font-semibold bg-transparent border-2 border-coral-warm text-coral-warm hover:text-ocean-deep overflow-hidden transition-all duration-500"
            >
              <span className="absolute inset-0 bg-coral-warm transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">
                {loading ? 'Loading Audio...' : 'SHAPE OUR JOURNEY TO 2050'}
              </span>
            </Button>
            
            <p className="mt-6 text-2xl text-white font-bold">
              Audio experience recommended for full immersion
            </p>
          </div>
        </div>
      </StoryScrollSection>
    </div>
  );
}