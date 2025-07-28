import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';

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
        {/* Block 1: Scenarios 1 & 2 - Content Left, Image Right */}
        <BlockSection imageLeft={false} imageUrl="/lovable-uploads/c87e8f14-688e-4226-8644-0339ccb4e52d.png">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                SCENARIO 1: MANAGED TRANSITION (1.5°C)
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-300">
                Global Pathways: Urgent Action Delivered Fragile Hope
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                By 2050, the world achieved 1.5°C through unprecedented global cooperation that began in the late 2020s. 
                
                Immediate, radical emissions cuts transformed energy systems within two decades. 
                
                Carbon removal technologies scaled rapidly. 
                
                Temperatures briefly exceeded 1.5°C in the 2040s before stabilizing.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                This pathway required sacrificing fossil fuel industries, restructuring entire economies, and mobilizing resources on a wartime scale. 
                
                International climate cooperation became the defining political force of the 2030s and 2040s.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                Yet even this "success" story carries profound costs: 30,000 annual heat deaths in Europe alone, massive ecosystem disruption, and the near-complete loss of coral reefs.
              </p>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-300 pt-4">
                Sonification – Fiji's Resilient Tides
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                The sonification reflects Fiji's tides in 2050 under managed climate change. 
                
                Sea levels have risen 20cm (median projection), with high tides reaching 35cm above 2020 levels during extreme events.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                The sound carries tension—familiar tidal rhythms stretched and intensified. 
                
                Each tide cycle sounds slightly more urgent, more forceful than in 2020. 
                
                There are pauses, moments of calm, but the underlying pulse has quickened.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                This is the sound of an ocean under stress but still recognizable. 
                
                The rhythm of Pacific life continues, altered but not broken.
              </p>
            </div>
            
            <div className="space-y-6 pt-8 border-t border-white/20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                SCENARIO 2: DANGEROUS WARMING (3°C)
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-300">
                Global Pathways: Promises Broken, Systems Strained
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                By 2050, current policies and Paris Agreement pledges delivered partial results, putting the world on track for 2.4-3.3°C by 2100. 
                
                Renewable energy expanded, some carbon capture was deployed, forest area increased—but not enough to prevent dangerous warming.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                The 2030s and 2040s saw climate impacts overwhelm adaptation capacity. 
                
                Heat-humidity combinations became lethal for 711 million people annually. 
                
                Groundwater systems collapsed. 
                
                43% of Himalayan glaciers disappeared, cutting water supplies for 800 million people.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                International cooperation fractured under mass migration and resource competition. 
                
                The global mood shifted from hope to grim endurance.
              </p>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-orange-300 pt-4">
                Sonification – Fiji's Disrupted Rhythms
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                In 2050, sea levels have risen 47cm (median projection), with extreme high tides reaching 78cm above 2020 levels. 
                
                The sonification reflects this disrupted reality.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                Familiar tidal patterns are broken by irregular surges and extended high-water periods. 
                
                The sound includes new elements—the grinding of coral being scoured away, the hiss of saltwater infiltrating freshwater systems, the hollow echo of waves in newly submerged areas.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
                The ocean's voice has become more aggressive, less predictable.
              </p>
            </div>
          </div>
        </BlockSection>

        {/* Block 2: Scenario 3 - Image Left, Content Right */}
        <BlockSection imageLeft={true} imageUrl="/lovable-uploads/78d90a25-3910-4b66-a54b-d21c9d715656.png">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              SCENARIO 3: EXTREME EMISSIONS (5°C)
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-300">
              Global Pathways: Systemic Collapse
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              By 2050, aggressive fossil fuel expansion and complete abandonment of international climate cooperation triggered systemic collapse. 
              
              The 2040s saw critical tipping points: Amazon rainforest collapse, massive permafrost methane release, Antarctic ice sheet destabilization.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              4.7 billion people experience potentially lethal heat annually. 
              
              Global food systems collapsed. 
              
              Ocean acidification and oxygen depletion triggered marine ecosystem collapse.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              International relations dissolved into resource wars. 
              
              The global mood: raw survivalism in the face of self-inflicted planetary catastrophe.
            </p>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-red-300 pt-4">
              Sonification – Fiji's Final Song
            </h3>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              In 2050, sea levels have risen 92cm (median projection), with extreme events reaching 1.5 meters above 2020 levels. 
              
              Much of Fiji is submerged or uninhabitable.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              The sonification is an apocalyptic cacophony—the sound of a planet's life support systems failing. 
              
              Deep, violent groans of unstable seas. 
              
              Explosive hiss of methane plumes. 
              
              The unrelenting shriek of hyper-hurricanes.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white">
              No distinct tidal events remain, only constant destruction. 
              
              This is the sound of an ending.
            </p>
          </div>
        </BlockSection>

        {/* Block 4: Blue Pacific Reality */}
        <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 xl:px-16 py-24">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Blue Pacific 2050 Reality
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-4xl mx-auto">
                This spider chart visualizes how your choices shaped the Pacific region's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                The chart's broad but imperfect shape illustrates a future built on successful yet realistic trade-offs. It's a living portrait of the Pacific's navigation through uncertainty, strength, and resilience.
              </p>
            </div>
            <div className="w-full min-h-[70vh] relative z-10">
              <ThematicSpiderChart className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Block 5: User Choices Display */}
        <AnswerBlockDisplay />

        {/* Block 6: Blue Pacific Stories - Image Left, Content Right */}
        <BlockSection imageLeft={true} imageUrl="/lovable-uploads/449ec207-9ff8-4b64-9e5b-01da1a9f76e2.png">
          <div className="space-y-6">
            <BluePacificStoriesSection />
          </div>
        </BlockSection>

        {/* Block 7: Navigation - Content Left, Image Right */}
        <BlockSection imageLeft={false} imageUrl="/lovable-uploads/33e5c143-7349-48dd-b270-01b8573f2161.png">
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
                onClick={() => window.location.href = '/scenario-2'}
              >
                EXPLORE SCENARIO 2
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
      
      {/* Debug Panel - Only in development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>;
}