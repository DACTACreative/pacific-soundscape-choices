import { Button } from './ui/button';

// Import intro images
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

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const handleStart = () => {
    onStart();
  };

  // Array of intro images to use
  const introImages = [introA, introB, introC, introD, introE, introF, introG, introH, introI, introJ, introAA];

  const blocks = [
    {
      id: 1,
      title: "Creating Feeling",
      content: `This experience was created to stir something in you.
To evoke belonging. To make space for the feeling of hope — that rare emotion when facing climate collapse.

To hold light.
To draw more of us into decisions that shape our region — like the Blue Pacific 2050 Strategy.
To remind us we are not isolated nations, but a collective body.

We are mostly made of ocean.
We are close… but distant.
This piece brings us together.`,
      reversed: false,
      image: introImages[9] // Using introJ image instead
    },
    {
      id: 2,
      title: "The Sound of Our Ocean",
      content: `The sea is our mother, our corridor, our food source, our song.
It's the one voice that connects us across the Pacific.

That's why this game begins with sound — the sound of our ocean — sonified.
Each high tide is rendered in tone.
Each low tide retreats, like breath.

You begin your journey in Fiji.
The date: October 10, 2024.
The sound you hear is real — tide data turned into rhythm.

Listen closely. The ocean speaks.`,
      reversed: true,
      image: introImages[0] // Using introA image as requested
    },
    {
      id: 3,
      title: "The Reality We Face",
      content: `The Earth is already warming.
The Pacific emits less than 0.03% of global emissions.
Yet, we feel the waves first.

Sea level rise doesn't arrive like a storm.
It creeps — slow, quiet, constant.
We barely notice it until the water laps at our door.

But the sound? The sound is always there.
A gentle warning. A low hum of urgency.
A background tide we must choose to hear.`,
      reversed: false,
      image: introImages[2]
    },
    {
      id: 4,
      title: "Your Role in This Journey",
      content: `This is not a passive story. It's a path — and you are part of it.

You'll make seven decisions.
Each one maps to a key theme from the Blue Pacific 2050 Implementation Plan.

Some will feel small. Some will feel big.
All are rooted in real dilemmas we face as a region.
Many are inspired by what already exists — seeds of utopia in motion.

This is a call to imagination.
Because hope itself is a kind of resistance.`,
      reversed: true,
      image: introImages[3]
    },
    {
      id: 5,
      title: "Why This Is a Game",
      content: `What you're about to play is a framework in disguise.

A simplified form of Monitoring, Evaluation, and Learning (MEL).
Because spreadsheets rarely stir emotion — but this can.
This lets us feel impact.

In this game, frameworks become story.
Strategies become sound.
Data becomes lived experience.

We are not rejecting systems. We are expanding them — into something you can see, hear, and feel.`,
      reversed: false,
      image: introImages[4]
    },
    {
      id: 6,
      title: "Your Decisions Shape the Region",
      content: `There are seven decisions to make.
Each one aligns to a Blue Pacific strategic pillar:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Your answers shape the map.
Each choice nudges indicators, themes, and future possibilities.
You won't see everything at once — just like in real life.`,
      reversed: true,
      image: introImages[5]
    },
    {
      id: 7,
      title: "But You Don't Control the World",
      content: `Once your decisions are done, we fast forward.
You land in the year 2050.

But here's the twist:
You don't choose the climate scenario. The world does.
Just like now — where the actions of distant nations shape our shores.

You may land in one of three futures:

• 1.5°C — a world of global cooperation
• 2.5°C — a fractured, messy middle
• 3°C+ — delayed action, heavy loss

This isn't about fairness. It's about realism.
We are not the biggest polluters.
But we are among the first to adapt.`,
      reversed: false,
      image: introImages[6]
    },
    {
      id: 8,
      title: "Your Ripple Effects in 2050",
      content: `Then comes reflection.

How did your decisions align with the Blue Pacific indicators?
Which communities benefited? What ripples did you create?

This section blends narrative, visualisation, and score.
It's where your story meets the region's story.
You'll hear from people. You'll see outcomes.

Not everything you did will be perfect.
But impact is rarely tidy.
This is a place to learn — and keep shaping.`,
      reversed: true,
      image: introImages[7]
    },
    {
      id: 9,
      title: "One Last Thing Before You Begin",
      content: `The ocean is rising.
But so are we.

Each small action sends a wave.
Each decision builds a current.

This isn't just a game — it's a reflection.
A way to remind ourselves:

Hope is an act.
Strategy is a tool.
Unity is our strength.

Let's create a future that looks like us —
Not one shaped without us.`,
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
          <section key={block.id} className="min-h-screen py-24 md:py-48 flex items-center">
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 h-full max-w-7xl mx-auto ${block.reversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                  <div className={`w-full ${block.reversed ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'}`}>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8">{block.title}</h2>
                    <div className="text-lg md:text-xl lg:text-2xl leading-relaxed whitespace-pre-line text-white text-justify">
                      {block.content}
                    </div>

                    {block.isLast && (
                      <div className="mt-8 lg:mt-12">
                        <Button
                          onClick={handleStart}
                          size="lg"
                          className="group relative px-8 md:px-12 py-6 md:py-8 text-2xl md:text-3xl lg:text-4xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
                        >
                          <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                          <span className="relative z-10">
                            START YOUR JOURNEY TO 2050
                          </span>
                        </Button>
                        
                        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white font-light">
                          Audio experience recommended for full immersion
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className={`w-full max-w-lg mx-auto ${block.reversed ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'}`}>
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                      <img 
                        src={block.image} 
                        alt={`Illustration for ${block.title}`}
                        className="w-full h-auto object-contain"
                      />
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