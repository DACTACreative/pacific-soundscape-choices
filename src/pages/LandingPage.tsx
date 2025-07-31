import { ChevronDown } from 'lucide-react';
import IntroScreen from '@/components/IntroScreen';
import { useEffect, useRef } from 'react';

// Add TypeScript declarations
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export default function LandingPage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const handleGameStart = () => {
    window.location.href = '/game';
  };

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          console.log(`Script already loaded: ${src}`);
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
          console.log(`✅ Successfully loaded: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`❌ Failed to load: ${src}`);
          reject(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        console.log('🐦 Starting Vanta Birds initialization...');
        
        // Check if element exists
        if (!vantaRef.current) {
          console.error('❌ Vanta container element not found');
          return;
        }

        // Load Three.js first
        console.log('📦 Loading Three.js...');
        await loadScript('https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js');
        
        // Verify Three.js loaded
        if (!window.THREE) {
          console.error('❌ Three.js not available after loading');
          return;
        }
        console.log('✅ Three.js loaded successfully');
        
        // Load Vanta Birds
        console.log('📦 Loading Vanta Birds...');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
        
        // Wait a bit longer for scripts to initialize
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verify Vanta is available
        if (!window.VANTA || !window.VANTA.BIRDS) {
          console.error('❌ VANTA.BIRDS not available after loading');
          console.log('Available VANTA effects:', window.VANTA ? Object.keys(window.VANTA) : 'VANTA not found');
          return;
        }
        console.log('✅ Vanta Birds loaded successfully');
        
        // Clean up any existing effect
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }
        
        // Initialize Vanta Birds effect
        console.log('🎨 Initializing Vanta Birds effect...');
        vantaEffect.current = window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x000000,
          color1: 0xfbbf24, // Gold
          color2: 0x3b82f6, // Blue
          colorMode: "lerp",
          birdSize: 1.20,
          speedLimit: 3.00,
          separation: 50.00,
          alignment: 70.00,
          cohesion: 20.00,
          quantity: 4.00
        });
        
        if (vantaEffect.current) {
          console.log('🎉 Vanta Birds initialized successfully!');
        } else {
          console.error('❌ Failed to initialize Vanta Birds effect');
        }
        
      } catch (error) {
        console.error('💥 Error initializing Vanta:', error);
      }
    };

    // Start initialization after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup Vanta effect
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          console.log('🧹 Vanta effect cleaned up');
        } catch (error) {
          console.error('Error destroying Vanta effect:', error);
        }
      }
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Debug Button */}
      <button 
        onClick={() => console.log('VANTA check:', window.VANTA, window.THREE)}
        className="fixed top-4 right-4 bg-red-500 text-white p-2 z-50 rounded"
      >
        Debug
      </button>

      {/* Landing Page Hero */}
      <div 
        ref={vantaRef}
        id="vanta-hero" 
        className="h-screen w-full bg-black relative"
      >
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-between" style={{
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center z-20">
          <p className="text-sm mb-2 font-light">Scroll to explore</p>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Intro Screen - Direct content below */}
      <IntroScreen onStart={handleGameStart} />
    </div>
  );
}