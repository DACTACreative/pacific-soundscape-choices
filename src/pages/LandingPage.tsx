import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let p5Script: HTMLScriptElement;
    let vantaScript: HTMLScriptElement;
    
    const loadVanta = () => {
      // Load p5.js first
      p5Script = document.createElement('script');
      p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js';
      p5Script.onload = () => {
        // Then load vanta.trunk.min.js
        vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js';
        vantaScript.onload = () => {
          // Initialize Vanta effect after both scripts are loaded
          if (vantaRef.current && (window as any).VANTA && !vantaEffect.current) {
            vantaEffect.current = (window as any).VANTA.TRUNK({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x6f86d4,
              chaos: 8.00,
              backgroundColor: 0x1a365d
            });
          }
        };
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(p5Script);
    };

    // Check if scripts are already loaded
    if (!(window as any).VANTA) {
      loadVanta();
    } else {
      // Scripts already loaded, just initialize
      if (vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = (window as any).VANTA.TRUNK({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6f86d4,
          chaos: 8.00,
          backgroundColor: 0x1a365d
        });
      }
    }

    return () => {
      // Cleanup
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
      if (p5Script && p5Script.parentNode) {
        p5Script.parentNode.removeChild(p5Script);
      }
      if (vantaScript && vantaScript.parentNode) {
        vantaScript.parentNode.removeChild(vantaScript);
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
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Choose Your Pacific Future
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-lg">
            A sound-driven data journey exploring climate choices and their consequences by 2050
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-white/80 text-sm uppercase tracking-wide">
            Scroll to continue or click to start
          </p>
          <Button
            onClick={handleStart}
            size="hero"
            variant="ocean"
            className="text-lg px-8 py-4 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}