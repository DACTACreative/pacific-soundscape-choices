import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';
import { ThematicInformationalCards } from '../components/ThematicInformationalCards';
import SimpleSeaLevelChart from '../components/SimpleSeaLevelChart';
import { useAudio, Scenario } from '../context/AudioContext';
import { useEffect } from 'react';

export default function Scenario2() {
  const { enableAudio, playScenario, audioEnabled } = useAudio();

  useEffect(() => {
    // Enable audio on page load and play scenario 2 sound
    if (!audioEnabled) {
      enableAudio();
    }
    // Small delay to ensure audio context is ready
    setTimeout(() => {
      playScenario(Scenario.Scenario2);
    }, 500);
  }, [enableAudio, playScenario, audioEnabled]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/"
          className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500"
        >
          ← RETURN TO JOURNEY
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Block 1: Scenario Description */}
        <BlockSection 
          imageUrl="/src/data/Scenario-k.png"
          imageLeft={false}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
            SCENARIO 2: DANGEROUS WARMING (3°C)
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Global Pathways: Promises Broken, Systems Strained
          </h2>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              By 2050, current policies and Paris Agreement pledges delivered partial results, putting the world on track for 2.4-3.3°C by 2100. Renewable energy expanded, some carbon capture was deployed, forest area increased—but not enough to prevent dangerous warming.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              The 2030s and 2040s saw climate impacts overwhelm adaptation capacity. Heat-humidity combinations became lethal for 711 million people annually. Groundwater systems collapsed. 43% of Himalayan glaciers disappeared, cutting water supplies for 800 million people.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              International cooperation fractured under mass migration and resource competition. The global mood shifted from hope to grim endurance.
            </p>
          </div>
        </BlockSection>

        {/* Block 2: Sea Level Chart */}
        <div className="w-full py-16">
          <SimpleSeaLevelChart scenario="tlim3.0win0.25" />
        </div>

        {/* Block 3: Blue Pacific 2050 Reality - Dedicated Chart Section */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-16">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Blue Pacific 2050 Reality
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-4xl mx-auto">
              This spider chart visualizes how your choices shaped the Pacific region's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
              The chart reveals significant gaps and stress points—a future where challenges outpaced solutions in many areas. It tells the story of a region fighting valiantly but ultimately struggling to maintain its foundations against overwhelming odds.
            </p>
            <div className="w-full max-w-5xl mx-auto">
              <ThematicSpiderChart className="w-full" />
            </div>
          </div>
        </div>

        {/* Block 3.5: Thematic Informational Cards */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <ThematicInformationalCards />
        </div>

        {/* Block 6: Navigation */}
        <BlockSection imageLeft={false} imageUrl="/src/data/Scenario-t.png">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Continue Your Journey
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => window.location.href = '/scenario-1'}
              >
                SCENARIO 1
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => window.location.href = '/scenario-3'}
              >
                SCENARIO 3
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => window.location.href = '/sources'}
              >
                SOURCES & CREDITS
              </Button>
            </div>
          </div>
        </BlockSection>
      </div>

      {/* Debug Panel for Development */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel />
      )}
    </div>
  );
}