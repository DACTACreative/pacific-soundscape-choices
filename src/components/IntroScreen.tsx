import heroImage from '@/assets/hero-pacific-future.jpg';
import { useAudio, Scenario } from '@/context/AudioContext';

interface IntroScreenProps {
  onStart: () => void;
}

const dataStats = [
  {
    title: "98%",
    description: "of Pacific territory is ocean",
    source: "Blue Pacific 2050 / SPC"
  },
  {
    title: "0.03%",
    description: "of global emissions come from Pacific nations",
    source: "UN ESCAP / Climate Analytics"
  },
  {
    title: "1.7 million",
    description: "Pacific Islanders may be displaced by 2050",
    source: "World Bank / Internal Displacement Monitoring Centre"
  },
  {
    title: "99%",
    description: "coral loss projected in high-emissions scenario",
    source: "IPCC AR6 / Fiji Reef Resilience Study"
  },
  {
    title: "830",
    description: "Fijian communities at risk of relocation (worst case)",
    source: "Fiji Climate Ministry / Dashboard projections"
  }
];

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };
  return (
    <div className="min-h-screen bg-gradient-ocean relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/95 to-ocean-deep" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-wide text-wave-foam mb-4">
            Sonification 2050
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-coral-warm to-transparent mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-light text-coral-warm/80 tracking-wide">
            Choose Your Pacific Future
          </p>
        </div>

        {/* Hero block */}
        <div className="mb-20 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-light text-wave-foam mb-8 leading-relaxed">
            The ocean is rising. Will we rise with it?
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-card-foreground/90 leading-relaxed">
            <p>
              Sonification 2050 is not just a game — it's a sound-driven journey through possible futures.
            </p>
            <p>
              You are invited to decide: Will Fiji meet the Blue Pacific 2050 goals?<br />
              What will our shared ocean sound like in 25 years?
            </p>
          </div>
        </div>

        {/* Flowing narrative */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-3xl mx-auto space-y-8 text-lg text-card-foreground/80 leading-relaxed">
            <p>
              This project started from a simple desire: to create something beautiful, engaging — and a little alarming. Something that stirs you.
            </p>
            <p>
              As Pacific people, our truth is unlike anywhere else. We are made of <strong className="text-accent">98% ocean</strong>. Scattered islands. Rich and diverse cultures. And what connects us is also what isolates us: the sea.
            </p>
            <p>
              The ocean feeds us. It holds our stories. And now, it is rising.
            </p>
            <p>
              <strong className="text-coral-warm">Sonification 2050</strong> is built around that truth. You will make 10 real-world choices about energy, land use, migration, tourism and more — and those decisions will shape Fiji's future.
            </p>
            <div className="border-l-2 border-coral-warm/30 pl-6 my-8">
              <p className="text-card-foreground/90">
                At the end, you'll receive:<br />
                • A narrative of your 2050 outcome<br />
                • A sonified soundtrack based on sea-level data<br />
                • A dashboard of what changed — coral, communities, emissions, energy
              </p>
            </div>
            <p className="text-coral-warm/90 font-medium">
              This is a story made of data — and you are in it.
            </p>
          </div>
        </div>

        {/* Data carousel */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dataStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 border border-ocean-light/20 bg-card/5 backdrop-blur-sm"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="text-4xl font-light text-coral-warm mb-2">{stat.title}</div>
                <div className="text-card-foreground/80 mb-3 leading-snug">{stat.description}</div>
                <div className="text-xs text-wave-foam/50 font-light">{stat.source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote block */}
        <div className="mb-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light text-wave-foam/90 leading-relaxed italic mb-4">
              "Too long have we followed — colonisation, globalisation, occidentalisation. It's time to lead. This is about reclaiming our voice, our ocean, our power."
            </blockquote>
            <cite className="text-coral-warm/70 text-sm tracking-wide">— Sonification 2050 narrative</cite>
          </div>
        </div>

        {/* Final section */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="max-w-3xl mx-auto text-lg text-card-foreground/80 leading-relaxed space-y-6">
            <p>
              Each choice you make is mapped to real indicators from the <strong className="text-accent">Blue Pacific 2050 strategy</strong>:
            </p>
            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="text-center p-4">
                <div className="text-coral-warm font-medium">Choose eco-tourism:</div>
                <div className="text-sm text-card-foreground/70">support marine protected areas</div>
              </div>
              <div className="text-center p-4">
                <div className="text-coral-warm font-medium">Switch to solar:</div>
                <div className="text-sm text-card-foreground/70">grow energy independence</div>
              </div>
              <div className="text-center p-4">
                <div className="text-coral-warm font-medium">Relocate now:</div>
                <div className="text-sm text-card-foreground/70">protect lives and reduce GDP loss</div>
              </div>
            </div>
            <p>
              Will Fiji stay on course toward these goals — or drift?
            </p>
            <p className="text-coral-warm/90">
              This is your chance to explore that future, with your ears, your heart, and your mind.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <button 
            onClick={handleStart}
            disabled={loading}
            className="group relative px-16 py-5 text-lg font-extralight tracking-[0.3em] text-wave-foam/70 
                       border border-ocean-light/30 bg-transparent backdrop-blur-sm
                       hover:text-wave-foam hover:border-coral-warm/50 
                       transition-all duration-1000 ease-out uppercase
                       before:absolute before:inset-0 before:border before:border-coral-warm/20 
                       before:scale-95 before:opacity-0 before:transition-all before:duration-700
                       hover:before:scale-100 hover:before:opacity-100
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {loading ? 'loading audio...' : 'start the journey'}
            </span>
          </button>
          
          <div className="mt-8 text-xs text-wave-foam/30 font-extralight tracking-widest">
            audio recommended for full experience
          </div>
        </div>
      </div>
    </div>
  );
}