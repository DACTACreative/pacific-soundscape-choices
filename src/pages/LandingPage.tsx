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
        }}>BLUE LENSE</h1>
          
          {/* Subtitle */}
          <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(42px, 5.5vw, 72px)',
          lineHeight: '1.1',
          letterSpacing: '0.03em'
        }} className="text-white uppercase tracking-wider leading-none mb-6 text-4xl font-extrabold">AN IMMERSIVE EXPERIENCE INTO WHAT OUR FUTURE COULD LOOK LIKE</h2>
          
          {/* Tagline */}
          <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(24px, 3vw, 36px)',
          fontWeight: '600',
          lineHeight: '1.3'
        }} className="mb-6 text-4xl text-slate-50">As the climate changes, will you shape a future that reflects us?</p>
          
          {/* Note */}
          <p className="text-white/80 mb-12" style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: '400'
        }}>
            Headphones recommended
          </p>
          
          {/* Minimalist Button */}
          <Button onClick={handleStart} variant="pacific" size="pacific">
            {audioEnabled ? "SHAPE OUR JOURNEY TO 2050" : "ENABLE AUDIO & START"}
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