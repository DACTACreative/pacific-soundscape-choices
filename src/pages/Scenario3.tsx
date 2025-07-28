
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';

export default function Scenario3() {
  return (
    <div className="bg-black text-white min-h-screen relative">
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

        {/* Block 2: Sonification */}
        <BlockSection 
          imageUrl="/public/lovable-uploads/78d90a25-3910-4b66-a54b-d21c9d715656.png"
          imageLeft={true}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sonification – The Sound of a Dying Ocean
          </h2>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              The sonification for this 5°C future is an apocalyptic and overwhelming cacophony—the sound of a planet's life support systems failing. It is a wall of noise dominated by the deep, violent groan of an unstable sea, the explosive hiss of methane plumes erupting from the seafloor, and the unrelenting shriek of hyper-hurricanes.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-white">
              There are no distinct events, only a constant, multi-layered roar of destruction that is physically oppressive to hear. Any sound of life, human or animal, is long gone, buried under the sound of raw, elemental fury. The emotional tone is one of pure dread and finality. It is not a warning or a dirge; it is the sound of an ending, an auditory record of a world that has been pushed past its breaking point.
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
                onClick={() => window.location.href = '/scenario-2'}
              >
                SCENARIO 2
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => window.location.href = '/credits'}
              >
                SOURCES & CREDITS
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => window.location.href = '/'}
              >
                RESTART JOURNEY
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
