import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThematicSpiderChart from '../components/ThematicSpiderChart';
import AnswerBlockDisplay from '../components/AnswerBlockDisplay';
import BluePacificStoriesSection from '../components/BluePacificStoriesSection';
import DebugPanel from '../components/DebugPanel';
import BlockSection from '../components/BlockSection';
import { ThematicInformationalCards } from '../components/ThematicInformationalCards';
import SimpleSeaLevelChart from '../components/SimpleSeaLevelChart';
import BlueParadigmCarousel from '../components/BlueParadigmCarousel';
import { useAudio, Scenario } from '../context/AudioContext';
import { useEffect, useState } from 'react';

export default function Scenario2() {
  const { enableAudio, playScenario, audioEnabled } = useAudio();
  const navigate = useNavigate();
  const [showLines, setShowLines] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Enable audio on page load and play scenario 2 sound
    if (!audioEnabled) {
      enableAudio();
    }
    // Small delay to ensure audio context is ready
    setTimeout(() => {
      playScenario(Scenario.Scenario2);
    }, 500);

    // Animate text lines sequentially
    const delays = [500, 1000, 1500, 2000, 2500];
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setShowLines(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, delay);
    });
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
        {/* Block 1: Animated Scenario Content with Picture */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div 
                  className={`transition-all duration-1000 ${showLines[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                    Scenario 2: The Techno-Fix Muddle (3.0°C)
                  </h1>
                </div>
                
                <div 
                  className={`transition-all duration-1000 ${showLines[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <p className="text-xl md:text-2xl leading-relaxed text-white/80 mb-8">
                    A summary of the well-intentioned but insufficient global events between 2025 and 2050 that led to dangerous warming.
                  </p>
                </div>

                <div className="space-y-6">
                  <div 
                    className={`transition-all duration-1000 ${showLines[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <p className="text-lg md:text-xl leading-relaxed text-white">
                      The "hydrogen economy" hype bubble delayed real investment in effective renewables by a critical decade.
                    </p>
                  </div>

                  <div 
                    className={`transition-all duration-1000 ${showLines[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <p className="text-lg md:text-xl leading-relaxed text-white">
                      Oil companies rebranded as "Carbon Management Firms," using PR-friendly carbon capture to gain subsidies while changing little.
                    </p>
                  </div>

                  <div 
                    className={`transition-all duration-1000 ${showLines[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <p className="text-lg md:text-xl leading-relaxed text-white">
                      A complex global carbon "bazaar" created bizarre loopholes instead of actually reducing emissions.
                    </p>
                  </div>

                  <div 
                    className={`transition-all duration-1000 ${showLines[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <p className="text-lg md:text-xl leading-relaxed text-white">
                      Cities invested trillions in "smart" infrastructure to manage climate impacts, while ignoring the root cause of the emissions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Picture 1: Right side of intro */}
              <div className="flex justify-center lg:justify-end">
                <img 
                  src="/data/PANEL.png" 
                  alt="Pacific Climate Panel" 
                  className="max-w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: Sea Level Chart */}
        <div className="w-full max-w-7xl mx-auto px-8 py-16">
          <SimpleSeaLevelChart scenario="tlim3.0win0.25" />
        </div>

        {/* Block 3: Blue Pacific 2050 Reality - Dedicated Chart Section */}
        <div className="w-full max-w-7xl mx-auto px-8 py-24">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Blue Pacific 2050 Reality
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-4xl mx-auto">
                This spider chart visualizes how your choices shaped the Pacific region's future across the seven pillars of the Blue Pacific 2050 Strategy. Each axis represents a different thematic area, and the shape shows the cumulative impact of your decisions throughout the game.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                The chart reveals significant gaps and stress points—a future where challenges outpaced solutions in many areas. It tells the story of a region fighting valiantly but ultimately struggling to maintain its foundations against overwhelming odds.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <ThematicSpiderChart className="w-full max-w-4xl" />
            </div>
          </div>
        </div>


        {/* Block 3.5: Thematic Informational Cards */}
        <div className="w-full max-w-7xl mx-auto px-8 py-16">
          <ThematicInformationalCards />
        </div>

        {/* Block 4: Blue Paradigm Carousel */}
        <BlueParadigmCarousel />

        {/* Block 6: Navigation */}
        <BlockSection imageLeft={false} imageUrl="/data/INTERISLAND.png">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Continue Your Journey
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Experience the full immersive journey and create your own Pacific future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => navigate('/scenario-1')}
              >
                SCENARIO 1
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => navigate('/scenario-3')}
              >
                SCENARIO 3
              </Button>
              <Button 
                variant="pacific" 
                size="pacific"
                onClick={() => navigate('/credits')}
              >
                CREDITS
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