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

  const blocks = [
    {
      id: 1,
      title: "Creating Feeling",
      content: `This piece was created to create feeling.
To create a sense of belonging and hope — a rare feeling in the face of climate change.

To show light.
To involve more people into decisions that concern us — like the Blue Pacific 2050 Strategy.
To bring us together as a region.

We are mainly made of sea.
We are so close… but so far.`,
      reversed: false
    },
    {
      id: 2,
      title: "The Sound of Our Ocean",
      content: `The sea is what brings us together.
It's the backbone of our Pacific culture.

That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.

When you begin the game, you will be projected into Fiji.
The date is October 10, 2024.

The sound you'll hear? It's real. The actual tide, sonified.
Each high tide = water rising.
Each low = a retreat six hours later.`,
      reversed: true
    },
    {
      id: 3,
      title: "The Reality We Face",
      content: `We are already on the path to a warmer Earth.

The Pacific contributes less than 0.03% of global carbon emissions.
Yet we face the consequences just as much as any other region.

Sea level rise is one of our most silent threats.
So slow, so invisible… we forget.
But it's always there — like the background sound of this ocean.`,
      reversed: false
    },
    {
      id: 4,
      title: "Your Role in This Journey",
      content: `During this game, you'll be projected into a series of decisions.

Every one of them is connected to the themes and indicators from the Blue Pacific 2050 Implementation Plan.
Some are policy-based. Others are small-scale utopias.

Why utopia?
Because keeping hope is a form of resistance.`,
      reversed: true
    },
    {
      id: 5,
      title: "Block 5 – The Game as Framework",
      content: `This is a simplification. A gamification.

A playable form of Monitoring, Evaluation, and Learning (MEL).
Because sometimes impact gets buried in spreadsheets.

And here — impact becomes immersive.
It becomes personal.

Frameworks and policies are crucial, yes.
But emotion moves people.
Feeling makes things real.`,
      reversed: false
    },
    {
      id: 6,
      title: "Mechanics of the Game",
      content: `You'll make seven key decisions.
Each one maps directly to the seven Blue Pacific Strategy pillars:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Each decision will shape our region in subtle, measurable ways.
Your answers affect data points and Pacific indicators.`,
      reversed: true
    },
    {
      id: 7,
      title: "The Twist",
      content: `Once your decisions are made, the world moves forward.
Welcome to 2050.

But here's the truth:
You do not decide the global climate scenario.
It is assigned — randomly — based on global uncertainty.

You'll land in one of three outcomes:

• 1.5°C: Achieved through massive global cooperation
• 2.5°C: A fractured effort
• 3°C+: Inaction, delay, loss

This randomness mirrors our power imbalance in real life.
We are not the biggest polluters — yet we carry the weight.`,
      reversed: false
    },
    {
      id: 8,
      title: "Seeing Your Impact",
      content: `Once 2050 loads, you'll see the consequences.

How did your choices align with the Blue Pacific indicators?
How did they affect people on the ground?
How did regional strategies hold under climate pressure?

This section mixes narrative, visualisation, and strategy.
You'll meet people.
Hear how one decision affected them.
See a dashboard of change.`,
      reversed: true
    },
    {
      id: 9,
      title: "Last Words Before You Begin",
      content: `Yes, the ocean is rising.
But so are we.

And each action — however small — creates a wave.

This experience is here to remind us:
Hope is an act.
Strategy is a tool.
And unity is our strength.

Let's shape a future that looks like us —
Not one shaped without us.`,
      reversed: false,
      isLast: true
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Fixed Header Block */}
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-white">BLUE PACIFIC 2050</h1>
          <p className="text-2xl md:text-4xl font-light tracking-wide text-white">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
        </div>
      </section>

      {/* Content Blocks */}
      <div>
        {blocks.map((block) => (
          <section key={block.id} className="min-h-screen flex items-start py-12">
            <div className="w-full px-6 md:px-12">
              <div className={`flex flex-col lg:flex-row items-start gap-16 min-h-screen ${block.reversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex items-start pt-12">
                  <div className="w-full max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">{block.title}</h2>
<div className="text-2xl md:text-3xl leading-relaxed whitespace-pre-line text-white">
  {block.content}
</div>

                    
                    {block.isLast && (
                      <div className="mt-12">
                        <Button
                          onClick={handleStart}
                          disabled={loading}
                          size="lg"
                          className="group relative px-12 py-8 text-4xl md:text-5xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
                        >
                          <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                          <span className="relative z-10">
                            {loading ? 'Loading Audio...' : 'START YOUR JOURNEY TO 2050'}
                          </span>
                        </Button>
                        
                        <p className="mt-6 text-2xl md:text-3xl text-white font-light">
                          Audio experience recommended for full immersion
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2 flex items-start pt-12">
                  <div className="w-full max-w-md mx-auto aspect-[4/3] bg-gradient-to-br from-[#0b3d26] to-[#0026d7] rounded-lg overflow-hidden shadow-2xl relative">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🖼️</span>
                        </div>
                        <p className="text-sm">Image Placeholder</p>
                        <p className="text-xs mt-1">Block {block.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}