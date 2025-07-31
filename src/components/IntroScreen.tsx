import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
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
import scenarioO from '@/data/Scenario-o.png';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario, enableAudio, audioEnabled } = useAudio();

  const handleStart = () => {
    try {
      if (!audioEnabled) {
        enableAudio();
      }
      playScenario(Scenario.Scenario0);
      onStart();
    } catch (error) {
      console.error('Error starting scenario:', error);
    }
  };

  const sections = [
    {
      id: 1,
      title: "Let's create a new paradigm: a Resilient Pacific",
      content: `A **Resilient Pacific** reflecting **Pacific culture**, **Pacific knowledge & Customs**, A pacific that **Protect our connection to the land** & **perpetuate our way of life**.

The **2050 Strategy** features **10 commitments** that Pacific Leaders have made to strengthen collective action and deepen regionalism. This piece was created to link stories to frameworks—to share and simplify by **gamifying** the great vision that our leaders have for our region.`,
      image: introAA,
      imageAlt: "The Earth, focused on the Pacific",
      imageLeft: true
    },
    {
      id: 2,
      title: "Stories & Indicators",
      content: `**Quantitative indicators** show what changed, but **qualitative stories** show **why it matters**. This experience blends indicators with stories because **Pacific policy** works best when it **speaks our language**. Because In **small island contexts**, a **2% GDP shift** affects every family and a **10cm sea level rise** reshapes entire communities.`,
      image: introI,
      imageAlt: "The village scene",
      imageLeft: false
    },
    {
      id: 3,
      title: "The Strategy's Seven Thematic Areas",
      content: `The Strategy brings together **seven interconnected thematic areas**: **Political Leadership and Regionalism**, **People-Centered Development**, **Peace and Security**, **Resource and Economic Development**, **Climate Change and Disasters**, **Ocean and Environment**, and **Technology and Connectivity**. 

This work analyzed each thematic area and its outcomes, anchoring **strategy indicators** (like **% of women in parliament**) in fictional stories that bridge policy complexity with lived reality.`,
      image: introD,
      imageAlt: "The large banyan tree, symbolizing interconnectedness",
      imageLeft: true
    },
    {
      id: 4,
      title: "Game Mechanics and Your Impact",
      content: `Each **game choice** connects to a specific strategy outcomes and indicators, demonstrating how decisions create **ripple effects** toward the **2050 goals**.

Each decision will impact the type of Pacific you build. Will your choices lean toward people development while leaving economic power behind? Or will you manage to make decisions that reflect all main thematics while meeting their **levels of ambition**?

Each answer directly impacts one thematic but can also contribute to others—that's the magic we often miss when measuring **impact**: **TIME**. After each answer, you'll be projected directly into the **grounded reality** of your decision by hearing the **story and impact** it has on someone's life.

And the game begins—Will you stay on track with the **Blue Pacific thematics**, or will you prioritize one decision above another? Will you be able to identify the outcomes they support and their potential **ripple effects** on others?`,
      image: introF,
      imageAlt: "The serene ocean and beach",
      imageLeft: false
    },
    {
      id: 5,
      title: "Your Journey to 2050",
      content: `Throughout this experience, you'll hear **Fiji's ocean tides** from October 10, 2024. Because **sea level rise** is in the background of our lives. It's music that plays on without us having much control over the ending.

And while we build a **resilient future**, representing less than **2% of global emissions** across **20% of Earth's surface** means our destiny depends on the **world's choices**.

At the end, the game will randomly choose one of three **climate scenarios**:

**1.5°C warming** (SSP1-1.9: Paris Agreement target, rapid decarbonization)

**3°C warming** (SSP2-4.5: Paris Agreement target, rapid decarbonization)

**5°C warming** (SSP5-8.5: high emissions pathway, limited climate action)

The same October tides will sound very different 25 years later.

Enjoy the game—see you in the future.`,
      image: introH,
      imageAlt: "The person on the beach, looking to the future",
      imageLeft: true,
      isLast: true
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-black border-b border-white/10">
        <div className="px-8 py-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">BLUE PACIFIC 2050</h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/80">AN IMMERSIVE EXPERIENCE INTO OUR FUTURE</p>
        </div>
      </div>

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="min-h-screen bg-black py-16 scroll-snap-start"
          id={`section-${section.id}`}
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center min-h-[80vh]">
              {/* Text Content - Always takes 70% width */}
              <div 
                className={`lg:col-span-7 space-y-6 ${
                  section.imageLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                }`}
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
                  {section.title}
                </h2>
                <div 
                  className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
                
                {/* Show button only on the last section */}
                {section.isLast && (
                  <div className="mt-12">
                    <Button
                      onClick={handleStart}
                      disabled={loading}
                      variant="pacific"
                      size="pacific"
                      className="group relative overflow-hidden"
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
              
              {/* Image Content - Always takes 30% width */}
              <div 
                className={`lg:col-span-3 ${
                  section.imageLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                }`}
              >
                <div className="relative">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-auto rounded-2xl object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}