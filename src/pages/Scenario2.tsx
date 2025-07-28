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
          imageUrl="/public/lovable-uploads/449ec207-9ff8-4b64-9e5b-01da1a9f76e2.png"
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
          imageUrl="/public/lovable-uploads/78d90a25-3910-4b66-a54b-d21c9d715656.png"
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

        {/* Blue Pacific 2050 Reality */}
        <BlockSection 
          imageUrl="/public/lovable-uploads/c4274d0f-201f-4d6e-920a-1131b2022596.png"
          imageLeft={false}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Blue Pacific 2050 Reality
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-white mb-6">
            This spider chart visualizes how your choices shaped the Pacific region's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
          </p>
          <div className="w-full min-h-[70vh] relative z-10">
            <ThematicSpiderChart className="w-full h-full" />
          </div>
        </BlockSection>

        {/* Answer Blocks Section */}
        <AnswerBlockDisplay />

        {/* Blue Pacific Stories */}
        <BlockSection 
          imageUrl="/public/lovable-uploads/b8cf5f28-0332-46cb-83ac-a8bfe3679f10.png"
          imageLeft={true}
        >
          <BluePacificStoriesSection />
        </BlockSection>

        {/* Navigation */}
        <BlockSection 
          imageUrl="/public/lovable-uploads/c87e8f14-688e-4226-8644-0339ccb4e52d.png"
          imageLeft={false}
        >
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