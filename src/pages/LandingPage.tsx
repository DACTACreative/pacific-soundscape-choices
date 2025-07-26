import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    
    const initVanta = () => {
      if (!mounted || !vantaRef.current) return;
      
      if ((window as any).VANTA && (window as any).VANTA.CELLS) {
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
        } catch (error) {
          console.error('Error initializing Vanta:', error);
        }
      } else {
        loadScripts();
      }
    };

    const loadScripts = () => {
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => loadVantaScript();
        threeScript.onerror = () => console.error('Failed to load THREE.js');
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
          if (mounted) setTimeout(initVanta, 100);
        };
        vantaScript.onerror = () => console.error('Failed to load Vanta.js');
        document.head.appendChild(vantaScript);
      } else {
        initVanta();
      }
    };

    initVanta();

    return () => {
      mounted = false;
      if (vantaEffect.current) {
        try {
          if (typeof vantaEffect.current.destroy === 'function') {
            vantaEffect.current.destroy();
          }
        } catch (error) {
          console.warn('Error during Vanta cleanup:', error);
        }
        vantaEffect.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    navigate('/game');
  };

  const titleStyle = {
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: '800',
    fontSize: 'clamp(36px, 4vw, 64px)',
    lineHeight: '1.1',
    letterSpacing: '0.03em'
  };

  const bodyStyle = {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 'clamp(18px, 2vw, 24px)',
    lineHeight: '1.4',
    fontWeight: '400'
  };

  const sectionStyle = {
    padding: '8vh 10vw',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <div className="relative w-full bg-black overflow-x-hidden">
      {/* Fixed Vanta Background */}
      <div 
        ref={vantaRef}
        className="fixed inset-0 w-full h-full z-0"
      />
      <div className="fixed inset-0 bg-black/60 z-5" />

      {/* Hero Section - Fixed Title */}
      <section className="relative z-10 h-screen flex items-center" style={sectionStyle}>
        <div className="max-w-4xl">
          <h1 className="text-white font-bold uppercase tracking-wider leading-none mb-4" style={titleStyle}>
            BLUE PACIFIC 2050
          </h1>
          <h2 className="text-white font-bold uppercase tracking-wider leading-none" style={{...titleStyle, fontSize: 'clamp(28px, 3vw, 48px)'}}>
            AN IMMERSIVE EXPERIENCE INTO OUR FUTURE
          </h2>
        </div>
      </section>

      {/* Block 1 - Why This Project Exists */}
      <section className="relative z-10 bg-black" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">This piece was created to create feeling.</p>
            <p className="mb-6">To create a sense of belonging and hope — a rare feeling in the face of climate change.</p>
            <p className="mb-6">To show light.</p>
            <p className="mb-6">To involve more people into decisions that concern us — like the Blue Pacific 2050 Strategy.</p>
            <p className="mb-6">To bring us together as a region.</p>
            <p className="mb-8 text-cyan-300 font-semibold">We are mainly made of sea. We are so close… but so far.</p>
            <p className="text-white/70 text-sm">The Pacific represents 10 million people across over 1,000 islands</p>
          </div>
        </div>
      </section>

      {/* Block 2 - The Sound of Our Ocean */}
      <section className="relative z-10 bg-gradient-to-b from-black to-gray-900" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">The sea is what brings us together.</p>
            <p className="mb-6">It's the backbone of our Pacific culture.</p>
            <p className="mb-6">That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.</p>
            <p className="mb-6">When you begin the game, you will be projected into Fiji.</p>
            <p className="mb-6 text-cyan-300 font-semibold">The date is October 10, 2024.</p>
            <p className="mb-6">The sound you'll hear? It's real. The actual tide, sonified.</p>
            <p className="mb-6">Each high tide = water rising. Each low = a retreat six hours later.</p>
            <p className="text-white/70 text-sm">Sonification translates data into frequency-based sound.</p>
          </div>
        </div>
      </section>

      {/* Block 3 - The Reality We Face */}
      <section className="relative z-10 bg-gray-900" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6 text-red-400 font-semibold">We are already on the path to a warmer Earth.</p>
            <p className="mb-6">The Pacific contributes less than 0.03% of global carbon emissions.</p>
            <p className="mb-6">Yet we face the consequences just as much as any other region.</p>
            <p className="mb-6">Sea level rise is one of our most silent threats.</p>
            <p className="mb-6">So slow, so invisible… we forget.</p>
            <p className="text-cyan-300">But it's always there — like the background sound of this ocean.</p>
          </div>
        </div>
      </section>

      {/* Block 4 - Your Role */}
      <section className="relative z-10 bg-gradient-to-b from-gray-900 to-black" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">During this game, you'll be projected into a series of decisions.</p>
            <p className="mb-6">Every one of them is connected to the themes and indicators from the Blue Pacific 2050 Implementation Plan.</p>
            <p className="mb-6">Some are policy-based. Others are small-scale utopias.</p>
            <p className="mb-6 text-cyan-300 font-semibold">Why utopia? Because keeping hope is a form of resistance.</p>
          </div>
        </div>
      </section>

      {/* Block 5 - The Game as Framework */}
      <section className="relative z-10 bg-black" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">This is a simplification. A gamification.</p>
            <p className="mb-6">A playable form of Monitoring, Evaluation, and Learning (MEL).</p>
            <p className="mb-6">Because sometimes impact gets buried in spreadsheets.</p>
            <p className="mb-6 text-cyan-300 font-semibold">And here — impact becomes immersive. It becomes personal.</p>
            <p className="mb-6">Frameworks and policies are crucial, yes.</p>
            <p className="text-yellow-400">But emotion moves people. Feeling makes things real.</p>
          </div>
        </div>
      </section>

      {/* Block 6 - Mechanics */}
      <section className="relative z-10 bg-gradient-to-b from-black to-gray-800" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">You'll make seven key decisions.</p>
            <p className="mb-6">Each one maps directly to the seven Blue Pacific Strategy pillars:</p>
            <div className="ml-6 mb-6 space-y-2 text-cyan-300">
              <p>• Political Leadership</p>
              <p>• People-Centered Development</p>
              <p>• Peace & Security</p>
              <p>• Resource & Economic Development</p>
              <p>• Climate Change</p>
              <p>• Oceans & Environment</p>
              <p>• Technology & Connectivity</p>
            </div>
            <p className="text-white">Each decision will shape our region in subtle, measurable ways.</p>
            <p className="text-white/70">Your answers affect data points and Pacific indicators.</p>
          </div>
        </div>
      </section>

      {/* Block 7 - The Twist */}
      <section className="relative z-10 bg-gray-800" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">Once your decisions are made, the world moves forward.</p>
            <p className="mb-6 text-cyan-300 font-semibold">Welcome to 2050.</p>
            <p className="mb-6 text-red-400">But here's the truth: You do not decide the global climate scenario.</p>
            <p className="mb-6">It is assigned — randomly — based on global uncertainty.</p>
            <p className="mb-4">You'll land in one of three outcomes:</p>
            <div className="ml-6 mb-6 space-y-2">
              <p className="text-green-400">1.5°C: Achieved through massive global cooperation</p>
              <p className="text-yellow-400">2.5°C: A fractured effort</p>
              <p className="text-red-400">3°C+: Inaction, delay, loss</p>
            </div>
            <p className="text-cyan-300">This randomness mirrors our power imbalance in real life.</p>
            <p className="text-white/80">We are not the biggest polluters — yet we carry the weight.</p>
          </div>
        </div>
      </section>

      {/* Block 8 - Seeing Impact */}
      <section className="relative z-10 bg-gradient-to-b from-gray-800 to-black" style={sectionStyle}>
        <div className="max-w-4xl">
          <div className="text-white" style={bodyStyle}>
            <p className="mb-6">Once 2050 loads, you'll see the consequences.</p>
            <p className="mb-6">How did your choices align with the Blue Pacific indicators?</p>
            <p className="mb-6">How did they affect people on the ground?</p>
            <p className="mb-6">How did regional strategies hold under climate pressure?</p>
            <p className="text-cyan-300">This section mixes narrative, visualisation, and strategy.</p>
            <p className="text-white/80">You'll meet people. Hear how one decision affected them. See a dashboard of change.</p>
          </div>
        </div>
      </section>

      {/* Block 9 - Final CTA */}
      <section className="relative z-10 bg-black" style={{...sectionStyle, minHeight: '100vh', justifyContent: 'center'}}>
        <div className="max-w-4xl text-center">
          <div className="text-white mb-12" style={bodyStyle}>
            <p className="mb-6">Yes, the ocean is rising.</p>
            <p className="mb-6 text-cyan-300 font-semibold">But so are we.</p>
            <p className="mb-8">And each action — however small — creates a wave.</p>
            <p className="mb-6">This experience is here to remind us:</p>
            <p className="mb-6 text-yellow-400">Hope is an act. Strategy is a tool. And unity is our strength.</p>
            <p className="mb-12">Let's shape a future that looks like us — not one shaped without us.</p>
          </div>
          
          <button
            onClick={handleStart}
            className="group relative text-white font-bold uppercase tracking-wider transition-all duration-300 hover:text-cyan-300 bg-transparent border-none p-0"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '700',
              fontSize: 'clamp(18px, 2vw, 24px)',
              letterSpacing: '0.03em'
            }}
          >
            <span className="relative pb-2">
              SHAPE OUR JOURNEY TO 2050
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}