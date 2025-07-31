import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';
import { ThematicInformationalCards } from '../components/ThematicInformationalCards';
import AnimatedSeaLevelChart from '../components/AnimatedSeaLevelChart';
export default function Scenario3() {
  return <div className="min-h-screen bg-black text-white relative">
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/" className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500">
          ← RETURN TO JOURNEY
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Block 1: Scenario Description */}
        <BlockSection imageUrl="/src/data/Scenario-u.png" imageLeft={false}>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
            SCENARIO 3: EXTREME EMISSIONS (5°C)
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Global Pathways: Systems Collapse
          </h2>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              By 2050, in a world scorched by a catastrophic global temperature rise approaching 5°C, the nation of Fiji has effectively ceased to exist. Relentless and rapid sea-level rise, measured in meters rather than centimeters, has submerged virtually all coastal areas and low-lying islands, making the archipelago largely uninhabitable.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              The concept of daily life has been replaced by a permanent state of emergency and mass exodus. The society has fractured, with the government long since collapsed and its population scattered across the globe as part of a desperate diaspora of climate refugees.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              The ocean is a toxic, anoxic dead zone. There is no economy, no tourism, and no agriculture—only the haunting ruins of a drowned culture. The voice of Fiji is no longer a plea for aid but a silent testament to the ultimate cost of a world that ignored every warning.
            </p>
          </div>
        </BlockSection>

        {/* Block 2: Animated Sea-Level Chart */}
        <div className="w-full h-screen">
          <AnimatedSeaLevelChart scenario="tlim5.0win0.25" />
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
              The chart shows a collapsed framework—gaps so severe they threaten the very existence of the Pacific community. This is a portrait of systemic failure, where isolated strengths couldn't compensate for fundamental breakdowns across multiple domains.
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

        {/* Block 4: Answer Blocks Section */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <AnswerBlockDisplay />
        </div>

        {/* Block 5: Blue Pacific Stories */}
        <BlockSection imageLeft={true} imageUrl="/src/data/Scenario-g.png">
          <div className="space-y-6">
            <BluePacificStoriesSection />
          </div>
        </BlockSection>

        {/* Block 6: Navigation */}
        <BlockSection imageLeft={false} imageUrl="/src/data/Scenario-h.png">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Continue Your Journey
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Explore different pathways and their consequences for the Pacific's future.
            </p>
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
                onClick={() => window.location.href = '/scenario-2'}
              >
                SCENARIO 2
              </Button>
              <Button variant="pacific" size="pacific" onClick={() => window.location.href = '/credits'}>
                SOURCES & CREDITS
              </Button>
            </div>
          </div>
        </BlockSection>
      </div>

      {/* Debug Panel for Development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>;
}