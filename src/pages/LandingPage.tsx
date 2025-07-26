import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    
    const initVanta = () => {
      // Check if element still exists and component is mounted
      if (!mounted || !vantaRef.current) return;
      
      // Check if VANTA is available
      if ((window as any).VANTA && (window as any).VANTA.CELLS) {
        console.log('Initializing Vanta CELLS effect');
        try {
          vantaEffect.current = (window as any).VANTA.CELLS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            color1: 0x26d7,
            color2: 0x35c5f2,
            size: 5.00,
            speed: 1.20
          });
          console.log('Vanta CELLS effect initialized successfully');
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      } else {
        console.log('VANTA not available, loading scripts...');
        loadScripts();
      }
    };

    const loadScripts = () => {
      // Check if THREE.js is already loaded
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => {
          console.log('THREE.js loaded');
          loadVantaScript();
        };
        threeScript.onerror = () => {
          console.error('Failed to load THREE.js');
        };
        document.head.appendChild(threeScript);
      } else {
        loadVantaScript();
      }
    };

    const loadVantaScript = () => {
      if (!(window as any).VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js';
        vantaScript.onload = () => {
          console.log('Vanta.js loaded');
          if (mounted) {
            setTimeout(initVanta, 100); // Small delay to ensure everything is ready
          }
        };
        vantaScript.onerror = () => {
          console.error('Failed to load Vanta.js');
        };
        document.head.appendChild(vantaScript);
      } else {
        initVanta();
      }
    };

    // Start the loading process
    initVanta();

    return () => {
      mounted = false;
      console.log('Cleaning up Vanta effect');
      
      // Safe cleanup with error handling
      if (vantaEffect.current) {
        try {
          if (typeof vantaEffect.current.destroy === 'function') {
            vantaEffect.current.destroy();
          }
        } catch (error) {
          console.warn('Error during Vanta cleanup (this is usually safe to ignore):', error);
        }
        vantaEffect.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center max-w-4xl">
          {/* Headphone Warning */}
          <div className="flex items-center space-x-2 mb-8 text-white/80 text-lg italic font-light">
            <span className="text-2xl">🎧</span>
            <p>For the best experience, please wear headphones.</p>
          </div>
          
          {/* Main Narrative */}
          <div className="text-white drop-shadow-2xl leading-relaxed space-y-6">
            <p className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              This journey is as much <strong>heard</strong> as it is seen. Close your eyes for a moment and listen – that's the sound of the Pacific's gentle tides today.
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight my-8">
              Choose Your Pacific Future
            </h1>
            
            <p className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              is about to take <strong>you</strong> on an immersive voyage from now to 2050. In this interactive story, you will guide the Blue Pacific through critical decisions. With each choice, data-driven visuals will show the impact – and an evolving soundscape will <strong>sonify</strong> our changing ocean.
            </p>
            
            <p className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mt-8">
              Are you ready to chart a course for the future?
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center space-y-4 animate-bounce">
          <p className="text-white/90 text-lg font-medium tracking-wide">
            (Scroll to begin your journey...)
          </p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <Button
            onClick={handleStart}
            size="hero"
            variant="ocean"
            className="text-xl px-12 py-6 bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold tracking-wide rounded-full border-none"
          >
            BEGIN
          </Button>
        </div>
      </div>
    </div>
  );
}