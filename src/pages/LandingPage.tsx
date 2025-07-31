import { ChevronDown } from 'lucide-react';
import IntroScreen from '@/components/IntroScreen';
import { useEffect } from 'react';

export default function LandingPage() {
  const handleGameStart = () => {
    window.location.href = '/game';
  };

  useEffect(() => {
    let vantaEffect: any = null;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
          console.log(`Loaded: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`Failed to load: ${src}`);
          reject(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // Load Three.js first
        await loadScript('https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js');
        
        // Load Vanta Birds
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
        
        // Small delay to ensure scripts are fully loaded
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Initialize Vanta Birds effect
        if (window.VANTA && window.VANTA.BIRDS) {
          console.log('Initializing Vanta Birds...');
          vantaEffect = window.VANTA.BIRDS({
            el: "#vanta-hero",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x000000,
            color1: 0xfbbf24,
            color2: 0xff7f50,
            colorMode: "lerp",
            birdSize: 0.70,
            speedLimit: 4.00,
            separation: 99.00,
            alignment: 85.00,
            cohesion: 1.00,
            quantity: 3.00
          });
          console.log('Vanta Birds initialized successfully');
        } else {
          console.error('VANTA.BIRDS not available');
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    initVanta();

    return () => {
      // Cleanup Vanta effect
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.error('Error destroying Vanta effect:', error);
        }
      }
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Landing Page Hero */}
      <div id="vanta-hero" className="h-screen w-full bg-black relative">
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
            }} className="mb-8 text-white/90">The 2050 Strategy for the Blue Pacific provides the map, but you must choose the path.</p>
            
            {/* Headphones note */}
            <p className="text-white/80" style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: '400'
            }}>
              (Headphones Recommended for the full immersive experience)
            </p>
          </div>

          {/* Right side image */}
          <div className="hidden md:block flex-shrink-0 w-1/2 max-w-2xl">
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl border border-white/20">
              <img src="/lovable-uploads/0546b7e7-5117-4849-9466-37a58117c896.png" alt="Blue Pacific Future Vision" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center">
          <p className="text-sm mb-2 font-light">Scroll to explore</p>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Intro Screen - Direct content below */}
      <IntroScreen onStart={handleGameStart} />
    </div>
  );
}