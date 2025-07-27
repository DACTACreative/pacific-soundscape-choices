import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import scenarioO from '@/data/Scenario-o.png';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();

  const handleStart = () => {
    try {
      playScenario(Scenario.Scenario0);
      onStart();
    } catch (error) {
      console.error('Error starting scenario:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          BLUE PACIFIC 2050
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide text-white/80">
          AN IMMERSIVE EXPERIENCE INTO OUR FUTURE
        </p>
      </div>

      {/* Main Image */}
      <div className="mb-8">
        <img 
          src={scenarioO}
          alt="Blue Pacific 2050 Experience"
          className="max-w-full max-h-[60vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Creating Feeling
        </h2>
        <div className="text-lg md:text-xl leading-relaxed text-white/90 mb-12">
          To awaken a sense of belonging, of togetherness, of hope — a rare and sacred emotion when facing the planetary scale of climate change.
          <br /><br />
          To shine light where despair often creeps in.
          <br /><br />
          To invite more people into the conversations that shape our region — especially around the Blue Pacific 2050 Strategy.
          <br /><br />
          This is a game, yes — but it's also a call to feel.
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={loading}
          size="lg"
          className="group relative px-8 py-6 text-2xl md:text-3xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500"
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
    </div>
  );
}