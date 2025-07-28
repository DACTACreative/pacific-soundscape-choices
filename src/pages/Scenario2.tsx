import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';

export default function Scenario2() {
  return <div className="min-h-screen bg-black text-white relative">

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
        {/* Scenario Title */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                SCENARIO 2: MEDIUM EMISSIONS
              </h1>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, Fiji endures the consequences of the world's partial success in combating climate change, a reality defined by a roughly 2°C temperature rise that has caused significant sea-level rise and widespread coral bleaching. This has transformed daily life, turning coastal flooding into a routine and forcing communities to adapt through a mix of ingenuity and necessity; while some thrive in planned resilience hubs, others have been forced into a managed retreat from the encroaching sea. Fiji's economy has also shifted, with tourism now highlighting resilience and aquaculture supplementing diminished fish catches. Through this struggle, Fiji and its Pacific neighbors have found a stronger moral voice on the global stage, advocating for climate justice while demonstrating a future of survival and ingenuity in a permanently altered, and more challenging, world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Pathways */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Global Pathways to 2050: A World of Partial Progress
              </h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  By 2050, the world reflects a story of partial climate progress, a patchwork of inconsistent policies and uneven technological adoption that successfully averted catastrophic warming but failed to prevent significant, irreversible damage. Global CO₂ emissions peaked around 2035 and began a slow decline, driven by a surge in renewable energy to over half of global electricity, yet a persistent reliance on oil and gas in major economies and hard-to-decarbonize sectors meant the world overshot the 1.5°C target in the 2030s. Consequently, a future of approximately 2°C warming became locked in, unleashing frequent extreme weather, noticeable sea-level rise, and devastating ecosystem losses like the near-total die-off of coral reefs. While international cooperation was fractured but functional—yielding moderate pacts and a new Loss and Damage fund—support for vulnerable nations like Fiji remained insufficient. The global mood is therefore a mix of pride for having avoided the worst-case scenarios and profound regret for the delayed, incomplete action that forced the most vulnerable to endure a future defined by adaptation and loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sonification */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Sonification – The Sound of an Unsettled Ocean
              </h2>
              <div className="max-w-5xl mx-auto space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-justify">
                  In this moderate scenario, the sonification of Fiji's 2050 ocean is an uneasy and restless soundscape, reflecting a future of partial progress and persistent volatility. The audio translates climate data into an emotionally discernible experience, blending the gentle lapping of waves with the intermittent rumble of distant thunder and surging swells. Listeners can hear specific metrics as distinct sounds: rising tones represent the increased frequency of moderate floods, a gradual increase in wave volume signifies sea-level rise, the jangling of wind chimes in a gust evokes more common cyclones, and an underlying crackle intensifies to mark coral bleaching from marine heatwaves. The overall emotional tone is one of vigilance, creating an audible diary of a climate that is neither a tranquil lullaby nor a chaotic dirge, but an unresolved ballad of resilience where periods of calm are always shadowed by the knowledge that the next storm is never far away.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blue Pacific 2050 Reality */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                  Blue Pacific 2050 Reality
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed text-white max-w-4xl mx-auto">
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
        </section>

        {/* Answer Blocks Section */}
        <AnswerBlockDisplay />

        {/* Blue Pacific Stories */}
        <section className="min-h-screen py-24 md:py-48 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto">
              <BluePacificStoriesSection />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="min-h-screen py-24 flex items-center justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto text-center space-y-8">
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
          </div>
        </section>
      </div>
    </div>
  );
}