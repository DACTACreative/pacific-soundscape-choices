import { Link } from 'react-router-dom';
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
        {/* Block 1: Hero Section - Content Left, Image Right */}
        <BlockSection imageLeft={false} imageUrl="/lovable-uploads/c87e8f14-688e-4226-8644-0339ccb4e52d.png">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white">
              Limiting Warming to Well Below 2°C
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              By 2050, Fiji embodies a future earned through the foresight and resilience of the 2020s, showcasing a successful adaptation to a changed climate. Decades-old marine protected areas have fostered recovering coral reefs and sustainable fisheries, while communities have gracefully relocated from rising seas, guided by traditional wisdom. The nation now runs on 85% renewable energy, with solar and wind power having replaced the fossil-fuel infrastructure of the past. This transformation, born from difficult but necessary choices, has elevated the Blue Pacific from a region pleading for action to a respected global leader, demonstrating how stewardship and development can forge a thriving, resilient future for both the people and the ocean.
            </p>
          </div>
        </BlockSection>

        {/* Block 2: Global Pathways - Image Left, Content Right */}
        <BlockSection imageLeft={true} imageUrl="/lovable-uploads/78d90a25-3910-4b66-a54b-d21c9d715656.png">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              What Happened during the last 25 Years
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              A sustainable future was secured by 2050 through a wave of unprecedented global cooperation that began in the late 2020s. Major emitters like China, the US, and the EU implemented transformative climate policies, while international agreements such as a Fossil Fuel Non-Proliferation Treaty and a global carbon price catalyzed a rapid phase-out of fossil fuels, causing global emissions to peak before 2030. This era of collaboration was critically defined by climate justice, as wealthy nations finally delivered on finance pledges and, spurred by the moral leadership of Pacific nations, established a Loss and Damage fund to support vulnerable regions with green technology and resilient infrastructure. By choosing cooperation, the world bent the curve on greenhouse gas accumulation, put the planet on track to meet the 1.5°C Paris Agreement goal, and demonstrated that collective action could steer humanity toward a more stable and equitable future.
            </p>
          </div>
        </BlockSection>

        {/* Block 3: Sonification - Content Left, Image Right */}
        <BlockSection imageLeft={false} imageUrl="/lovable-uploads/33e5c143-7349-48dd-b270-01b8573f2161.png">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white lg:text-6xl">
              The Sound of the Ocean Sonified
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/80">
              (As you read this scenario, take a moment to listen to its unique soundscape.)
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white">
              This low-emissions future is expressed through "sonification," where the ocean's soundscape tells a story of hope and successful climate action. The accompanying audio features the gentle, steady hush of calm waves, sonically representing positive data such as reduced cyclone intensity and successful coastal protection. In this auditory experience, tranquil wave patterns signify fewer extreme weather events, while sounds like wind chimes might symbolize the hum of wind turbines, transforming abstract metrics into a tangible sense of a manageable future. Drawing on the Pacific tradition of storytelling through song, this soundscape allows the ocean itself to become the storyteller, murmuring a tale that our collective choices were the right ones, resulting in a future where the sea remains a nurturing force rather than a constant threat.
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
            <Link to="/scenario-2" className="group relative inline-block px-8 md:px-12 py-6 md:py-8 text-2xl md:text-3xl lg:text-4xl font-bold bg-transparent border-4 border-[#35c5f2] text-[#35c5f2] hover:text-black overflow-hidden transition-all duration-500">
              <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">
                EXPLORE SCENARIO 2 →
              </span>
            </Link>
          </div>
        </BlockSection>
      </div>
      
      {/* Debug Panel - Only in development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>;
}