import { useAudio, Scenario } from '@/context/AudioContext';
import StoryScrollSection from './StoryScrollSection';
import { Button } from './ui/button';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };

  return (
    <div className="min-h-screen">
      {/* Story Scroll - Pacific Context (1) */}
      <StoryScrollSection 
        backgroundColor="bg-gradient-to-b from-ocean-deep to-ocean-mid"
        parallax
      >
        <div className="font-inter text-white">
          <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
            The Pacific Ocean is our home – a boundless blue that connects 10 million people across thousands of islands. We, the peoples of the Blue Pacific, are the custodians of <strong className="text-coral-warm font-semibold">nearly 20% of Earth's surface</strong> (our ocean and skies).
          </p>
          <p className="text-lg md:text-xl leading-relaxed font-light">
            Our ancestors navigated by stars and swells, binding our islands into one community. Today, that unity lives on in the concept of the Blue Pacific Continent – numerous voices, but one ocean, one canoe.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Climate Inequity (2) */}
      <StoryScrollSection 
        backgroundColor="bg-gradient-to-b from-ocean-mid to-ocean-deep"
        overlay="bg-black/60"
      >
        <div className="font-inter text-white">
          <p className="text-xl md:text-2xl leading-relaxed mb-6 font-light">
            Our islands release almost no carbon – only <strong className="text-orange-400 font-semibold">0.03% of global emissions</strong> – yet we face the fiercest storms. It isn't fair: climate change hits the Pacific first and worst.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6 font-light">
            Rising seas eat away at ancestral shores where our grandparents are buried. In a single generation, we could lose villages, languages, and traditions to the encroaching ocean.
          </p>
          <p className="text-lg md:text-xl leading-relaxed font-light">
            By 2050, up to <strong className="text-red-400 font-semibold">1.7 million Pacific Islanders</strong> may be displaced if the world stays on its current path. We are innocent navigators caught in a gathering storm.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Collective Action (3) */}
      <StoryScrollSection 
        backgroundColor="bg-gradient-to-b from-ocean-deep to-ocean-light"
        overlay="bg-blue-900/40"
      >
        <div className="font-inter text-white">
          <p className="text-xl md:text-2xl leading-relaxed mb-6 font-light">
            Yet, we are not merely victims. The Pacific Islands are leaders in resilience, teaching the world that <em className="text-wave-foam font-playfair text-2xl">"we are all in the same canoe."</em>
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-6 font-light">
            Our Blue Pacific family knows that <strong className="text-green-400 font-semibold">only through unity and bold action</strong> can we navigate these rising seas. Regional solidarity – from Fiji to Tuvalu, from Palau to Vanuatu – gives us strength.
          </p>
          <p className="text-lg md:text-xl leading-relaxed font-light">
            We raise our voices in unison at global forums, demand climate justice, and innovate homegrown solutions. If the world sails with us, we can chart a course to calmer waters.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Future at Stake (4) */}
      <StoryScrollSection 
        backgroundColor="bg-gradient-to-br from-ocean-deep via-ocean-mid to-orange-900/20"
        overlay="bg-gradient-to-t from-black/40 to-transparent"
      >
        <div className="font-inter text-white">
          <p className="text-lg md:text-xl leading-relaxed mb-8 font-light">
            The year is 2025. The tides are gentle today, and our islands remain. But on the horizon, 2050 looms with unanswered questions.
          </p>
          <div className="text-2xl md:text-3xl font-medium text-coral-warm mb-8 leading-tight">
            <p>Will our children inherit thriving reefs and secure homes –</p>
            <p>or will they inherit seawalls and uncertainty?</p>
          </div>
          <p className="text-lg md:text-xl leading-relaxed mb-6 font-light">
            The <strong className="text-accent font-semibold">choices we make now</strong> will ripple across decades. In our culture, when we plan, we think of the next generation and those after.
          </p>
          <p className="text-lg md:text-xl leading-relaxed font-light">
            This is your chance to do the same: to steer our canoe toward a future where the Pacific Ocean is a source of life and hope, not hardship.
          </p>
        </div>
      </StoryScrollSection>

      {/* Game Intro Blurb (Start Screen) */}
      <StoryScrollSection 
        backgroundColor="bg-ocean-deep"
        className="min-h-screen"
      >
        <div className="max-w-3xl mx-auto bg-card/10 backdrop-blur-sm border border-ocean-light/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-wave-foam mb-8 flex items-center justify-center gap-3">
            <span className="text-coral-warm">🧭</span>
            Your Mission
          </h2>
          
          <div className="font-inter text-white/90 space-y-6 text-lg leading-relaxed">
            <p>
              Make <strong className="text-coral-warm">10 choices</strong> for our Blue Pacific future. Each decision will affect our 2050 outcome – from the health of coral reefs to the height of the tides.
            </p>
            
            <p>
              <strong className="text-accent">No choice is trivial.</strong> Some will reduce global emissions, others will strengthen island resilience. Explore trade-offs, see the impacts, and discover the scenario you create.
            </p>
            
            <p className="text-wave-foam">
              Good luck, and <em className="font-playfair">vinaka vakalevu</em> (thank you) for taking the helm.
            </p>
            
            <p className="text-coral-warm/80 text-center font-medium">
              When you're ready, tap "Begin" to start the game.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={handleStart}
              disabled={loading}
              size="lg"
              className="px-12 py-6 text-xl font-semibold bg-coral-warm hover:bg-coral-warm/90 text-ocean-deep rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading Audio...' : 'Begin'}
            </Button>
            
            <p className="mt-6 text-sm text-wave-foam/60 font-light">
              Audio experience recommended for full immersion
            </p>
          </div>
        </div>
      </StoryScrollSection>
    </div>
  );
}