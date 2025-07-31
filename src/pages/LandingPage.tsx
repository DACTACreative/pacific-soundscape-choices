import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/context/AudioContext';
export default function LandingPage() {
  const navigate = useNavigate();
  const { enableAudio, audioEnabled } = useAudio();
  
  const handleStart = () => {
    if (!audioEnabled) {
      enableAudio();
    }
    navigate('/game');
  };
  return <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between" style={{
      padding: '5vh 10vw'
    }}>
        {/* Left side text content */}
        <div className="max-w-4xl lg:max-w-2xl">
          {/* Main Title */}
          <h1 className="text-white font-bold uppercase tracking-wider leading-none mb-4" style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: '1.1',
          letterSpacing: '0.03em'
        }}>BLUE PARADIGM</h1>
          
          {/* Subtitle */}
          <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          lineHeight: '1.1',
          letterSpacing: '0.03em'
        }} className="text-white uppercase tracking-wider leading-none mb-8">An Immersive Experience in Pacific Strategy</h2>
          
          {/* Description */}
          <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontWeight: '400',
          lineHeight: '1.4'
        }} className="mb-6 text-white/90">You are about to step into the heart of Pacific policy-making. For the next 25 years, you will guide the region's response to its greatest challenges, from climate change to economic development.</p>
          
          <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontWeight: '400',
          lineHeight: '1.4'
        }} className="mb-8 text-white/90">The 2050 Strategy for the Blue Pacific Continent provides the map, but you must choose the path.</p>
          
          {/* Note */}
          <p className="text-white/80 mb-12" style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: '400'
        }}>
            (Headphones Recommended for the full immersive experience)
          </p>
          
          {/* Minimalist Button */}
          <Button onClick={handleStart} variant="pacific" size="pacific">
            {audioEnabled ? "Start your Journey To 2050" : "ENABLE AUDIO & START"}
          </Button>



      
          
        </div>

        {/* Right side image placeholder */}
        <div className="hidden md:block flex-shrink-0 w-1/2 max-w-2xl">
          <div className="relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl border border-white/20">
            <img src="/lovable-uploads/0546b7e7-5117-4849-9466-37a58117c896.png" alt="Blue Pacific Future Vision" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>;
}