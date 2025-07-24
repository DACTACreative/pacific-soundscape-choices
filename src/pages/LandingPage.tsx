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
      if ((window as any).VANTA && (window as any).VANTA.TRUNK) {
        console.log('Initializing Vanta TRUNK effect');
        try {
          vantaEffect.current = (window as any).VANTA.TRUNK({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4A90E2,      // Beautiful blue for the trunk structures
            chaos: 8.00,
            backgroundColor: 0x000000  // Pure black background
          });
          console.log('Vanta TRUNK effect initialized successfully');
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      } else {
        console.log('VANTA not available, loading scripts...');
        loadScripts();
      }
    };

    const loadScripts = () => {
      // Check if p5 is already loaded
      if (!(window as any).p5) {
        const p5Script = document.createElement('script');
        p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
        p5Script.onload = () => {
          console.log('p5.js loaded');
          loadVantaScript();
        };
        p5Script.onerror = () => {
          console.error('Failed to load p5.js');
        };
        document.head.appendChild(p5Script);
      } else {
        loadVantaScript();
      }
    };

    const loadVantaScript = () => {
      if (!(window as any).VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js';
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
      <div className="relative z-10 flex h-full flex-col items-center justify-between p-8">
        {/* Top Content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <h1 className="text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
            WELCOME TO PACIFIC FUTURE
          </h1>
          <p className="text-2xl text-white/90 max-w-3xl drop-shadow-lg mb-6 leading-relaxed">
            AN IMMERSIVE VISUALISATION INTO OUR FUTURE
          </p>
          <p className="text-xl text-white/80 max-w-2xl drop-shadow-lg mb-4">
            PARTICIPATE INTO DECISION MAKING<br />
            AND MAKE AN IMPACT TO CHANGE THE COURSE<br />
            OF OUR OCEAN
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center space-y-6">
          <p className="text-white/90 text-lg font-medium tracking-wide">
            (PUT YOUR HEADPHONES OR SOUND UP)
          </p>
          <Button
            onClick={handleStart}
            size="hero"
            variant="ocean"
            className="text-xl px-12 py-6 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold tracking-wide"
          >
            START YOUR JOURNEY TO 2050
          </Button>
        </div>
      </div>
    </div>
  );
}