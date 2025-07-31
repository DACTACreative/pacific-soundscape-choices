import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';
import { ThematicInformationalCards } from '../components/ThematicInformationalCards';
export default function Scenario1() {
  return <div className="min-h-screen bg-black text-white relative">

      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/" className="text-white/60 hover:text-white font-light tracking-wider text-sm uppercase transition-colors duration-500">
          ← RETURN TO JOURNEY
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Block 1: Scenario Description - Content Left, Image Right */}
        <BlockSection imageLeft={false} imageUrl="/src/data/Scenario-a.png">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
              SCENARIO 1: MANAGED TRANSITION (1.5°C)
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Global Pathways: Urgent Action Delivered Fragile Hope
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              By 2050, the world achieved 1.5°C through unprecedented global cooperation that began in the late 2020s. Immediate, radical emissions cuts transformed energy systems within two decades. Carbon removal technologies scaled rapidly. Temperatures briefly exceeded 1.5°C in the 2040s before stabilizing.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              This pathway required sacrificing fossil fuel industries, restructuring entire economies, and mobilizing resources on a wartime scale. International climate cooperation became the defining political force of the 2030s and 2040s.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              Yet even this "success" story carries profound costs: 30,000 annual heat deaths in Europe alone, massive ecosystem disruption, and the near-complete loss of coral reefs.
            </p>
          </div>
        </BlockSection>

        {/* Block 2: Sonification - Image Left, Content Right */}
        <BlockSection imageLeft={true} imageUrl="/src/data/Scenario-b.png">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white lg:text-6xl">
              Sonification – Fiji's Resilient Tides
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              The sonification reflects Fiji's tides in 2050 under managed climate change. Sea levels have risen 20cm (median projection), with high tides reaching 35cm above 2020 levels during extreme events.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              The sound carries tension—familiar tidal rhythms stretched and intensified. Each tide cycle sounds slightly more urgent, more forceful than in 2020. There are pauses, moments of calm, but the underlying pulse has quickened.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              This is the sound of an ocean under stress but still recognizable. The rhythm of Pacific life continues, altered but not broken.
            </p>
          </div>
        </BlockSection>

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
              The chart's broad but imperfect shape illustrates a future built on successful yet realistic trade-offs. It's a living portrait of the Pacific's navigation through uncertainty, strength, and resilience.
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

        {/* Block 4: User Choices Display */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8">
          <AnswerBlockDisplay />
        </div>

        {/* Block 5: Blue Pacific Stories */}
        <BlockSection imageLeft={true} imageUrl="/src/data/Scenario-j.png">
          <div className="space-y-6">
            <BluePacificStoriesSection />
          </div>
        </BlockSection>

        {/* Block 6: Navigation */}
        <BlockSection imageLeft={false} imageUrl="/src/data/Scenario-k.png">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Continue Your Journey
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Explore different pathways and their consequences for the Pacific's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="pacific" size="pacific" onClick={() => window.location.href = '/scenario-2'}>
                EXPLORE SCENARIO 2
              </Button>
              <Button variant="pacific" size="pacific" onClick={() => window.location.href = '/credits'}>
                SOURCES & CREDITS
              </Button>
            </div>
          </div>
        </BlockSection>
      </div>
      
      {/* Debug Panel - Only in development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>;
}