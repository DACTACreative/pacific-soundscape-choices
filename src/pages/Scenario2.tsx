import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';

export default function Scenario2() {
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

        {/* Block 2: Sonification */}
        <BlockSection 
          imageUrl="/src/data/Scenario-l.png"
          imageLeft={true}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sonification – Fiji's Disrupted Rhythms
          </h2>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              In 2050, sea levels have risen 47cm (median projection), with extreme high tides reaching 78cm above 2020 levels. The sonification reflects this disrupted reality.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              The sound reflects a Fiji in constant transition. Entire communities have moved to higher ground as coastal villages disappear beneath regular flooding. The coral reefs that once protected shorelines are bleached and broken, their protective barriers weakened. Saltwater intrudes into freshwater wells, forcing families to rely on rainwater collection and desalination. Traditional ceremonies are held on new beaches, carved from what were once inland areas. The sound of displacement—a culture adapting to the rhythm of an increasingly unpredictable ocean.
            </p>
          </div>
        </BlockSection>

        {/* Block 3: Blue Pacific 2050 Reality */}
        <BlockSection imageLeft={true} imageUrl="/src/data/Scenario-l.png">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blue Pacific 2050 Reality
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-white mb-6">
              This spider chart visualizes how your choices shaped the Pacific region's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
            </p>
            <div className="w-full min-h-[70vh] relative z-10">
              <ThematicSpiderChart className="w-full h-full" />
            </div>
          </div>
        </BlockSection>

        {/* Block 4: Answer Blocks Section */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <img src="/src/data/Scenario-m.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
            <img src="/src/data/Scenario-n.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
            <img src="/src/data/Scenario-o.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
            <img src="/src/data/Scenario-p.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
            <img src="/src/data/Scenario-q.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
            <img src="/src/data/Scenario-r.png" alt="Scenario visualization" className="w-full h-auto rounded-lg" />
          </div>
          <AnswerBlockDisplay />
        </div>

        {/* Block 5: Blue Pacific Stories */}
        <BlockSection imageLeft={true} imageUrl="/src/data/Scenario-s.png">
          <div className="space-y-6">
            <BluePacificStoriesSection />
          </div>
        </BlockSection>

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
                onClick={() => window.location.href = '/credits'}
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