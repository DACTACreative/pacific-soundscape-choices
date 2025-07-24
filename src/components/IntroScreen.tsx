import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-pacific-future.jpg';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background hero image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-ocean opacity-80" />
      
      <Card className="max-w-2xl mx-auto p-8 bg-card/10 backdrop-blur-md border-ocean-light/30 shadow-deep text-center animate-fade-in relative z-10">
        <div className="space-y-6">
          {/* Title with wave animation */}
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-br from-wave-foam via-accent to-coral-warm bg-clip-text animate-wave-gentle">
            Choose Your Pacific Future
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-coral-warm font-medium">
            A Sound-Driven Climate Journey to 2050
          </p>
          
          {/* Description */}
          <div className="space-y-4 text-card-foreground text-lg leading-relaxed">
            <p>
              Welcome to an immersive journey through time. You are about to make 10 critical decisions 
              that will shape Fiji's future by the year 2050.
            </p>
            <p>
              Each choice you make affects two key areas: <span className="text-accent font-semibold">climate mitigation</span> 
              {' '}(reducing global emissions) and <span className="text-coral-warm font-semibold">local resilience</span> 
              {' '}(preparing communities for change).
            </p>
            <p>
              Listen carefully as gentle ocean sounds guide you through the present, 
              and discover how your decisions transform the soundscape of tomorrow.
            </p>
          </div>
          
          {/* Call to action */}
          <div className="pt-8">
            <button 
              onClick={onStart}
              className="group relative px-12 py-4 text-lg font-light tracking-wider text-wave-foam/80 
                         border border-ocean-light/20 bg-transparent backdrop-blur-sm
                         hover:text-wave-foam hover:border-ocean-light/40 hover:bg-ocean-light/5
                         transition-all duration-700 ease-out
                         before:absolute before:inset-0 before:border before:border-wave-foam/10 
                         before:scale-0 before:opacity-0 before:transition-all before:duration-500
                         hover:before:scale-100 hover:before:opacity-100
                         after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent 
                         after:via-wave-foam/5 after:to-transparent after:translate-x-[-100%] 
                         hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
            >
              <span className="relative z-10">enter the future</span>
            </button>
          </div>
          
          {/* Subtle hint */}
          <div className="pt-6 text-xs text-wave-foam/40 font-light tracking-wide">
            <p>audio recommended</p>
          </div>
        </div>
        
        {/* Animated wave decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-wave opacity-20 animate-wave-gentle" />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-ocean-light/10 to-transparent animate-wave-gentle" style={{ animationDelay: '1s' }} />
        </div>
      </Card>
    </div>
  );
}