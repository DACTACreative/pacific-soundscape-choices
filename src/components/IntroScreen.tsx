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
    content: `This piece was created to spark feeling.

To awaken a sense of belonging, of togetherness, of hope, a rare and sacred emotion when facing the planetary scale of climate change.

To shine light where despair often creeps in.

To invite more people into the conversations that shape our region, especially around the Blue Pacific 2050 Strategy.

To stitch connection across distant shores.

Because we are mostly sea, scattered, yet bound. So close… yet often made to feel far.

This is a game, yes, but it's also a call to feel.`,
    reversed: false,
    image: introImages[0]
  },
  {
    id: 2,
    title: "The Sound of Our Ocean",
    content: `The sea is what brings us together.
It is our memory, our movement, our story.

This piece focuses on sound, the sound of our ocean, to carry you through this journey.

When you begin, you’ll be immersed in Fiji.
The date: October 10, 2024.

The sound you hear is real.
It is the actual tide, sonified.

Each high tide = rising water.
Each low = its slow retreat six hours later.

This soundscape grounds us. Because for the Pacific, the ocean is not background, it’s home.`,
    reversed: true,
    image: introImages[1]
  },
  {
    id: 3,
    title: "The Reality We Face",
    content: `We are already living in a warmer world.

The Pacific emits less than 0.03% of global carbon emissions.
Yet we stand on the frontlines of its consequences.

Sea level rise is one of our most silent threats.
It does not roar like a cyclone, it creeps. Quietly.
And because it's invisible, we forget.

But like the sound of waves, always returning, the threat remains.

This is not alarmism. It’s presence. And we must respond with clarity and imagination.`,
    reversed: false,
    image: introImages[2]
  },
  {
    id: 4,
    title: "Your Role in This Journey",
    content: `As you enter this experience, you'll face a series of seven decisions.

Each is inspired by the Blue Pacific 2050 Implementation Plan, its real goals, real indicators, and real challenges.

Some choices reflect public policy. Others are visions of community-led futures, new models, small-scale utopias.

Why utopias?

Because in the Pacific, hope is not a luxury. It’s a lifeline.
And imagining better is how we resist being written out of the future.`,
    reversed: true,
    image: introImages[3]
  },
  {
    id: 5,
    title: "Why This Is a Game",
    content: `This is a simplification, a gamified journey.

It’s also a living form of Monitoring, Evaluation, and Learning (MEL).
Because data shouldn’t just live in spreadsheets.

Here, it becomes visual. Sensory. Emotional.

Frameworks matter. Indicators matter. 
But feelings move people. Stories hold power.

This experience invites you to reflect not just on numbers, but on what we value, and how we act.`,
    reversed: false,
    image: introImages[4]
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
You won’t get a score, you’ll get ripple effects. Shifting indicators. Lived futures.

Because in the real world, outcomes are rarely binary.`,
    reversed: true,
    image: introImages[5]
  },
  {
    id: 7,
    title: "But You Don’t Control the World",
    content: `Once your decisions are made, the world fast-forwards.
Welcome to the year 2050.

But here's the twist:
You do not control the global climate scenario.
It is assigned, at random, echoing real-life uncertainty.

You might land in:

• 1.5°C: A world of massive cooperation and restraint  
• 2.5°C: Partial action, delayed urgency  
• 3°C+: Inaction, division, irreversible loss

This randomness reflects the truth: the Pacific doesn't control the wheel, but we do prepare for the waves.`,
    reversed: false,
    image: introImages[6]
  },
  {
    id: 8,
    title: "Your Ripple Effects in 2050",
    content: `Once 2050 is revealed, so are the consequences.

Did your choices align with the Blue Pacific indicators?
What changed, and what stayed the same?

This section blends narrative and data. 
You’ll hear from fictional communities.
See ripple effects.
Explore what your leadership sparked.

Because decisions don’t just exist on paper, they shape lives, landscapes, and futures.`,
    reversed: true,
    image: introImages[7]
  },
  {
    id: 9,
    title: "One Last Thing Before You Begin",
    content: `Yes, the ocean is rising.
But so are we.

Every small decision sends a signal.
Every story is a compass.

This game is a reminder:
Hope is strategy.
Unity is strength.
And dreaming is action.

Let’s co-create a future shaped by us, not for us.

Let’s begin.`,
    reversed: false,
    isLast: true,
    image: introImages[8]
  }
];


  return (
    <div className="bg-black text-white min-h-screen">
      {/* Fixed Header */}
     <div className="fixed top-6 left-6 z-50">
  <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-3 text-white">BLUE PACIFIC 2050</h1>
  <p className="text-2xl md:text-4xl font-light tracking-wide text-white">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
</div>

      {/* Content Blocks */}
      <div className="pt-32">
        {blocks.map((block) => (
          <section key={block.id} className="min-h-screen py-48 flex items-center">
            <div className="w-full px-6 md:px-12">
              <div className={`flex flex-col lg:flex-row items-start gap-16 h-full ${block.reversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2">
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
                <div className="w-full lg:w-1/2">
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