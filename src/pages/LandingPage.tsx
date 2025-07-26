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

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 z-5" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center" style={{ padding: '5vh 10vw' }}>
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 
            className="text-white font-bold uppercase tracking-wider leading-none mb-4"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '800',
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: '1.1',
              letterSpacing: '0.03em'
            }}
          >
            BLUE PACIFIC 2050
          </h1>
          
          {/* Subtitle */}
          <h2 
            className="text-white font-bold uppercase tracking-wider leading-none mb-6"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '800',
              fontSize: 'clamp(42px, 5.5vw, 72px)',
              lineHeight: '1.1',
              letterSpacing: '0.03em'
            }}
          >
          AN IMMERSIVE EXPERIENCE INTO WHAT OUR FUTURE COULD LOOK LIKE
          </h2>
          
          {/* Tagline */}
          <p 
            className="text-white mb-6"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: '600',
              lineHeight: '1.3'
            }}
          >
            As the climate changes, can we shape a future that reflects our cultures, our knowledge, and our strength?
          </p>
          
          {/* Note */}
          <p 
            className="text-white/80 mb-12"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: '400'
            }}
          >
            Headphones recommended
          </p>
          
          {/* Minimalist Button */}
          <button
            onClick={handleStart}
            className="group relative text-white font-bold uppercase tracking-wider transition-all duration-300 hover:text-cyan-400 border border-white/30 hover:border-cyan-400 px-8 py-4 bg-transparent hover:bg-white/5"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '700',
              fontSize: 'clamp(18px, 2vw, 24px)',
              letterSpacing: '0.03em',
              borderRadius: '2px'
            }}
          >
            <span className="relative z-10">SHAPE OUR JOURNEY TO 2050</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>



      
          
        </div>
            

      </div>
    </div>
  );
}