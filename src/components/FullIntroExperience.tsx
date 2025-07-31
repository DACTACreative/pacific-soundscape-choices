import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface FullIntroExperienceProps {
  onComplete: () => void;
  showAudioControls?: boolean;
}

export default function FullIntroExperience({ onComplete, showAudioControls = true }: FullIntroExperienceProps) {
  const { loading, playScenario } = useAudio();
  const [currentSection, setCurrentSection] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const handleStart = () => {
    try {
      if (isAudioEnabled) {
        playScenario(Scenario.Scenario0);
      }
      // Use proper navigation instead of window.location
      setTimeout(() => {
        onComplete();
      }, 100);
    } catch (error) {
      console.error('Error starting scenario:', error);
      // Fallback navigation if audio fails
      onComplete();
    }
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const sections = [
    {
      id: 1,
      title: "Feeling: A Call for Pacific Resilience",
      content: `This "game" is a call to action — to create feeling that transcends vast ocean distances separating Pacific nations.

Isolation comes easily when 30 million km² of sea spreads between communities. Yet connection runs deeper than geography.

This experience calls for a new paradigm: a Resilient Pacific reflecting Pacific culture, Pacific knowledge, and Pacific connection to land that must be cared for to perpetuate customs and ways of life.

The Blue Pacific 2050 Implementation Framework was mapped to 47 measurable indicators across 7 strategic pillars, transforming abstract policy into experiential decision-making.

Because frameworks matter. Indicators matter. But feelings move people toward the resilient future Pacific communities need.`,
      backgroundColor: "from-blue-900 to-cyan-900",
      textColor: "text-cyan-100"
    },
    {
      id: 2,
      title: "The Sound of Our Ocean: Data Sonification.",
        content: `Real ocean tide data from Fiji (October 10, 2024) forms this experience's foundation.

Every high tide = rising water. Every low = retreat six hours later.

This isn't ambient sound — it's live environmental data converted to audio.

For Pacific communities, the ocean isn't background noise — it's the constant connecting 15 nations across 30 million km² of sea.

Data becomes visceral. Policy becomes personal. The sound of the ocean grounds every decision you'll make.`,
       backgroundColor: "from-teal-900 to-blue-900",
      textColor: "text-teal-100"
    },
    {
      id: 3,
      title: "The Reality We Face",
      content: `We are already living in a warmer world.

The Pacific emits less than 0.03% of global carbon emissions.
Yet we stand on the frontlines of its consequences.

Sea level rise is one of our most silent threats.
It does not roar like a cyclone — it creeps. Quietly.
And because it's invisible, we forget.

But like the sound of waves — always returning — the threat remains.

This is not alarmism. It's presence. And we must respond with clarity and imagination.`,
      backgroundColor: "from-orange-900 to-red-900",
      textColor: "text-orange-100"
    },
    {
      id: 4,
      title: "Your Role in This Journey",
      content: `As you enter this experience, you'll face a series of seven decisions.

Each is inspired by the Blue Pacific 2050 Implementation Plan — its real goals, real indicators, and real challenges.

Some choices reflect public policy. Others are visions of community-led futures — new models, small-scale utopias.

Why utopias?

Because in the Pacific, hope is not a luxury. It's a lifeline.
And imagining better is how we resist being written out of the future.`,
      backgroundColor: "from-purple-900 to-indigo-900",
      textColor: "text-purple-100"
    },
    {
      id: 5,
      title: "Why This Is a Game",
      content: `This is a simplification — a gamified journey.

It's also a living form of Monitoring, Evaluation, and Learning (MEL).
Because data shouldn't just live in spreadsheets.

Here, it becomes visual. Sensory. Emotional.

Frameworks matter. Indicators matter. 
But feelings move people. Stories hold power.

This experience invites you to reflect not just on numbers — but on what we value, and how we act.`,
      backgroundColor: "from-green-900 to-teal-900",
      textColor: "text-green-100"
    },
    {
      id: 6,
      title: "Your Decisions Shape the Region",
      content: `You will make seven key decisions.

Each one maps directly to a pillar of the Blue Pacific Strategy:

• Political Leadership
• People-Centered Development
• Peace & Security
• Resource & Economic Development
• Climate Change
• Oceans & Environment
• Technology & Connectivity

Your choices affect these domains in subtle, interconnected ways.
You won't get a score — you'll get ripple effects. Shifting indicators. Lived futures.

Because in the real world, outcomes are rarely binary.`,
      backgroundColor: "from-cyan-900 to-blue-900",
      textColor: "text-cyan-100"
    },
    {
      id: 7,
      title: "But You Don't Control the World",
      content: `Your seven decisions shape the Pacific — but they don't control global forces.

Climate change accelerates regardless of your local actions.
Global politics shift beyond Pacific influence.
Economic pressures mount from distant markets.

This tension is real.

Pacific nations lead on climate action — yet depend on the world to follow.
We innovate — yet need resources from elsewhere.
We adapt — yet face limits beyond our control.

Your choices matter enormously. But they exist within larger currents.`,
      backgroundColor: "from-slate-900 to-gray-900",
      textColor: "text-slate-100"
    },
    {
      id: 8,
      title: "The Ripple Effects in 2050",
      content: `At the end of this journey, you'll see how your decisions ripple through time.

Not as simple wins or losses — but as complex, interconnected changes.

Some effects will be immediate.
Others will emerge slowly, like rising tides.

You'll see data. You'll hear projections.
But mostly, you'll encounter stories.

Because the future is not just numbers.
It's the texture of daily life in 2050.
It's the sound of that ocean — transformed.`,
      backgroundColor: "from-emerald-900 to-cyan-900",
      textColor: "text-emerald-100"
    },
    {
      id: 9,
      title: "Last Words Before You Begin",
      content: `Yes, the ocean is rising.
But so are we.

Every small decision sends a signal.
Every story is a compass.

This game is a reminder:
Hope is strategy.
Unity is strength.
And dreaming is action.

Let's co-create a future shaped by us — not for us.

Let's begin.`,
      backgroundColor: "from-indigo-900 to-purple-900",
      textColor: "text-indigo-100",
      isLast: true
    }
  ];

  const currentSectionData = sections[currentSection];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSectionData.backgroundColor} transition-all duration-1000 ease-in-out`}>
      {/* Audio Controls */}
      {showAudioControls && (
        <div className="fixed top-6 right-6 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'bg-white scale-125' 
                  : index < currentSection 
                    ? 'bg-white/60' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Counter */}
          <div className={`text-sm font-medium mb-4 ${currentSectionData.textColor} opacity-70`}>
            {currentSection + 1} of {sections.length}
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 ${currentSectionData.textColor} animate-fade-in`}>
            {currentSectionData.title}
          </h1>

          {/* Content */}
          <div className={`text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 ${currentSectionData.textColor} animate-fade-in max-w-3xl mx-auto`}>
            {currentSectionData.content.split('\n').map((line, index) => (
              <div key={index} className="mb-4">
                {line}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-6">
            {currentSectionData.isLast ? (
              <div className="text-center">
                <Button
                  onClick={handleStart}
                  disabled={loading}
                  size="lg"
                  className="group relative px-12 py-6 text-2xl md:text-3xl font-bold bg-transparent border-4 border-white text-white hover:text-black overflow-hidden transition-all duration-500"
                >
                  <span className="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">
                    {loading ? 'Loading Audio...' : 'START YOUR JOURNEY TO 2050'}
                  </span>
                </Button>
                
                {isAudioEnabled && (
                  <p className="mt-4 text-sm md:text-base text-white/70">
                    Audio experience recommended for full immersion
                  </p>
                )}
              </div>
            ) : (
              <Button
                onClick={handleNextSection}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg"
              >
                Continue
                <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Hint */}
      {!currentSectionData.isLast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      )}
    </div>
  );
}