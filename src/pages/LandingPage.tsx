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
        <div className="flex flex-col items-center justify-center text-center max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white/80 text-sm font-semibold tracking-wide">
              Official Entry – Pacific DataViz Challenge 2025
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Choose Your Pacific Future
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-medium text-white/90 tracking-wide">
            A Climate Challenge from the Blue Pacific
          </h2>
          
          {/* Description */}
          <div className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl space-y-2">
            <p>An immersive experience through data, sound, and strategic decision-making.</p>
            <p>Headphones are recommended for the full experience.</p>
          </div>
          
          {/* Start Button */}
          <Button
            onClick={handleStart}
            size="hero"
            variant="ocean"
            className="text-xl px-12 py-6 bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold tracking-wide rounded-full border-none mt-8"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}