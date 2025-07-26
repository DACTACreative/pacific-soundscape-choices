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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Story Scroll - Pacific Context (1) */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            The Pacific Ocean is our home – a boundless blue that connects 10 million people across thousands of islands. We, the peoples of the Blue Pacific, are the custodians of <strong className="text-coral-warm">nearly 20% of Earth's surface</strong> (our ocean and skies).
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            Our ancestors navigated by stars and swells, binding our islands into one community. Today, that unity lives on in the concept of the Blue Pacific Continent – numerous voices, but one ocean, one canoe.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Climate Inequity (2) */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight">
          <p className="text-4xl md:text-6xl leading-tight mb-6">
            Our islands release almost no carbon – only <strong className="text-orange-400">0.03% of global emissions</strong> – yet we face the fiercest storms. It isn't fair: climate change hits the Pacific first and worst.
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-6">
            Rising seas eat away at ancestral shores where our grandparents are buried. In a single generation, we could lose villages, languages, and traditions to the encroaching ocean.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            By 2050, up to <strong className="text-red-400">1.7 million Pacific Islanders</strong> may be displaced if the world stays on its current path. We are innocent navigators caught in a gathering storm.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Collective Action (3) */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight">
          <p className="text-4xl md:text-6xl leading-tight mb-6">
            Yet, we are not merely victims. The Pacific Islands are leaders in resilience, teaching the world that <em className="text-coral-warm font-bold italic">"we are all in the same canoe."</em>
          </p>
          <p className="text-4xl md:text-6xl leading-tight mb-6">
            Our Blue Pacific family knows that <strong className="text-green-400">only through unity and bold action</strong> can we navigate these rising seas. Regional solidarity – from Fiji to Tuvalu, from Palau to Vanuatu – gives us strength.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            We raise our voices in unison at global forums, demand climate justice, and innovate homegrown solutions. If the world sails with us, we can chart a course to calmer waters.
          </p>
        </div>
      </StoryScrollSection>

      {/* Story Scroll - Future at Stake (4) */}
      <StoryScrollSection>
        <div className="text-white font-bold tracking-tight">
          <p className="text-4xl md:text-6xl leading-tight mb-8">
            The year is 2025. The tides are gentle today, and our islands remain. But on the horizon, 2050 looms with unanswered questions.
          </p>
          <div className="text-4xl md:text-6xl font-bold text-coral-warm mb-8 leading-tight">
            <p>Will our children inherit thriving reefs and secure homes –</p>
            <p>or will they inherit seawalls and uncertainty?</p>
          </div>
          <p className="text-4xl md:text-6xl leading-tight mb-6">
            The <strong className="text-coral-warm">choices we make now</strong> will ripple across decades. In our culture, when we plan, we think of the next generation and those after.
          </p>
          <p className="text-4xl md:text-6xl leading-tight">
            This is your chance to do the same: to steer our canoe toward a future where the Pacific Ocean is a source of life and hope, not hardship.
          </p>
        </div>
      </StoryScrollSection>

      {/* Game Intro Blurb (Start Screen) */}
      <StoryScrollSection>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-coral-warm mb-8 tracking-tight leading-tight flex items-center justify-center gap-3">
            <span>🧭</span>
            Your Mission
          </h2>
          
          <div className="text-white space-y-6 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            <p>
              Make <strong className="text-coral-warm">10 choices</strong> for our Blue Pacific future. Each decision will affect our 2050 outcome – from the health of coral reefs to the height of the tides.
            </p>
            
            <p>
              <strong className="text-coral-warm">No choice is trivial.</strong> Some will reduce global emissions, others will strengthen island resilience. Explore trade-offs, see the impacts, and discover the scenario you create.
            </p>
            
            <p className="text-coral-warm">
              Good luck, and <em className="font-bold italic">vinaka vakalevu</em> (thank you) for taking the helm.
            </p>
            
            <p className="text-coral-warm/80 font-bold">
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
            
            <p className="mt-6 text-2xl text-white font-bold">
              Audio experience recommended for full immersion
            </p>
          </div>
        </div>
      </StoryScrollSection>
    </div>
  );
}