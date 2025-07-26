import { useEffect, useRef } from 'react';
import { useAudio, Scenario } from '@/context/AudioContext';
import { Button } from './ui/button';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const { loading, playScenario } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      
      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
        });
      }
    };

    initLocomotiveScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  const handleStart = () => {
    playScenario(Scenario.Scenario0);
    onStart();
  };

  return (
    <div ref={scrollRef} data-scroll-container style={{ 
      background: '#000000',
      color: '#f4f4f0',
      fontFamily: 'Space Grotesk, sans-serif'
    }}>
      {/* Fixed Header */}
      <div className="fixed top-6 left-6 z-50">
        <h1 style={{ 
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(24px, 4vw, 48px)',
          lineHeight: '1.1',
          letterSpacing: '0.03em',
          color: '#ffffff',
          marginBottom: '0.25rem'
        }}>
          BLUE PACIFIC 2050
        </h1>
        <p style={{ 
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: '400',
          letterSpacing: '0.03em',
          color: '#ffffff'
        }}>
          AN IMMERSIVE EXPERIENCE INTO OUR FUTURE
        </p>
      </div>

      {/* Block 1 - Text Left, Image Right */}
      <section data-scroll-section style={{ position: 'relative', minHeight: '200vh' }}>
        {/* Fixed/Sticky Image */}
        <div 
          data-scroll 
          data-scroll-sticky 
          data-scroll-target="section"
          style={{
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 5vw',
            zIndex: 1
          }}
        >
          <div style={{ 
            aspectRatio: '3/4', 
            width: '400px',
            backgroundColor: '#0b3d26', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <img src="/placeholder.svg" alt="Ocean Sound" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              right: '1rem', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#f4f4f0'
            }}>
              block-01-ocean-sound.jpg
            </div>
          </div>
        </div>

        {/* Scrolling Text Overlay */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          left: '0',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(transparent 0%, #000000 20%, #000000 100%)',
          padding: '5vh 5vw',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              This piece was created to <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>create feeling</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              To create a sense of belonging and hope — a rare feeling in the face of climate change.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              To show light.<br/>
              To involve more people into decisions that concern us — like the <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Blue Pacific 2050 Strategy</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              To bring us together as a region.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              We are mainly made of sea. We are so close… but so far.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(20px, 2.5vw, 28px)', 
              color: '#35c5f2', 
              fontWeight: '400' 
            }}>
              The Pacific represents 10 million people across over 1,000 islands
            </p>
          </div>
        </div>
      </section>

      {/* Block 2 - Text Right, Image Left */}
      <section data-scroll-section style={{ position: 'relative', minHeight: '200vh' }}>
        {/* Fixed/Sticky Image */}
        <div 
          data-scroll 
          data-scroll-sticky 
          data-scroll-target="section"
          style={{
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 5vw',
            zIndex: 1
          }}
        >
          <div style={{ 
            aspectRatio: '3/4', 
            width: '400px',
            backgroundColor: '#0026d7', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <img src="/placeholder.svg" alt="Fiji Tide" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              left: '1rem', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#f4f4f0'
            }}>
              block-02-fiji-tide.jpg
            </div>
          </div>
        </div>

        {/* Scrolling Text Overlay */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          right: '0',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(transparent 0%, #000000 20%, #000000 100%)',
          padding: '5vh 5vw',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              The sea is what brings us together.<br/>
              It's the backbone of our <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Pacific culture</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              When you begin the game, you will be projected into <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Fiji</strong>.<br/>
              The date is October 10, 2024.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              The sound you'll hear? It's <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>real</strong>. The actual tide, sonified.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Each high tide = water rising.<br/>
              Each low = a retreat six hours later.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(20px, 2.5vw, 28px)', 
              color: '#35c5f2', 
              fontWeight: '400' 
            }}>
              <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Sonification</strong> translates data into frequency-based sound.
            </p>
          </div>
        </div>
      </section>

      {/* Block 3 - Text Left, Image Right */}
      <section data-scroll-section style={{ position: 'relative', minHeight: '200vh' }}>
        {/* Fixed/Sticky Image */}
        <div 
          data-scroll 
          data-scroll-sticky 
          data-scroll-target="section"
          style={{
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 5vw',
            zIndex: 1
          }}
        >
          <div style={{ 
            aspectRatio: '3/4', 
            width: '400px',
            backgroundColor: '#0b3d26', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <img src="/placeholder.svg" alt="Climate Scenario" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              right: '1rem', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#f4f4f0'
            }}>
              block-03-climate-scenario.jpg
            </div>
          </div>
        </div>

        {/* Scrolling Text Overlay */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          left: '0',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(transparent 0%, #000000 20%, #000000 100%)',
          padding: '5vh 5vw',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              We are already on the path to a <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>warmer Earth</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              The Pacific contributes less than <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>0.03%</strong> of global carbon emissions.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Yet we face the consequences just as much as any other region.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Sea level rise is one of our most <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>silent threats</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              color: '#ffffff'
            }}>
              So slow, so invisible… we forget.<br/>
              But it's always there — like the background sound of this ocean.
            </p>
          </div>
        </div>
      </section>

      {/* Block 4 - Text Right, Image Left */}
      <section data-scroll-section style={{ position: 'relative', minHeight: '200vh' }}>
        {/* Fixed/Sticky Image */}
        <div 
          data-scroll 
          data-scroll-sticky 
          data-scroll-target="section"
          style={{
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 5vw',
            zIndex: 1
          }}
        >
          <div style={{ 
            aspectRatio: '3/4', 
            width: '400px',
            backgroundColor: '#0026d7', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <img src="/placeholder.svg" alt="Blue Pacific Strategy" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              left: '1rem', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#f4f4f0'
            }}>
              block-04-blue-strategy.jpg
            </div>
          </div>
        </div>

        {/* Scrolling Text Overlay */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          right: '0',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(transparent 0%, #000000 20%, #000000 100%)',
          padding: '5vh 5vw',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              During this game, you'll be projected into a series of <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>decisions</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Every one of them is connected to the themes and indicators from the <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Blue Pacific 2050 Implementation Plan</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Some are policy-based. Others are small-scale utopias.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              color: '#ffffff'
            }}>
              Why utopia? Because <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>keeping hope is a form of resistance</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Block 5 - Text Left, Image Right */}
      <section data-scroll-section style={{ position: 'relative', minHeight: '200vh' }}>
        {/* Fixed/Sticky Image */}
        <div 
          data-scroll 
          data-scroll-sticky 
          data-scroll-target="section"
          style={{
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 5vw',
            zIndex: 1
          }}
        >
          <div style={{ 
            aspectRatio: '3/4', 
            width: '400px',
            backgroundColor: '#0b3d26', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <img src="/placeholder.svg" alt="Resilience Choice" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              right: '1rem', 
              fontSize: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              color: '#f4f4f0'
            }}>
              block-05-resilience-choice.jpg
            </div>
          </div>
        </div>

        {/* Scrolling Text Overlay */}
        <div style={{
          position: 'absolute',
          top: '100vh',
          left: '0',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(transparent 0%, #000000 20%, #000000 100%)',
          padding: '5vh 5vw',
          zIndex: 2
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              This is a simplification. A <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>gamification</strong>.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              A playable form of Monitoring, Evaluation, and Learning (MEL).
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              Because sometimes impact gets buried in spreadsheets.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              marginBottom: '2rem',
              color: '#ffffff'
            }}>
              And here — <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>impact becomes immersive</strong>.<br/>
              It becomes personal.
            </p>
            <p style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(24px, 3vw, 36px)', 
              fontWeight: '600',
              lineHeight: '1.3', 
              color: '#ffffff'
            }}>
              Frameworks and policies are crucial, yes.<br/>
              But <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>emotion moves people</strong>. Feeling makes things real.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section data-scroll-section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '5vh 5vw',
        background: '#000000'
      }}>
        <div style={{ 
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3vw, 36px)', 
            fontWeight: '600',
            lineHeight: '1.3', 
            marginBottom: '2rem',
            color: '#ffffff'
          }}>
            Yes, the ocean is rising.
          </p>
          <p style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3vw, 36px)', 
            fontWeight: '600',
            lineHeight: '1.3', 
            marginBottom: '2rem',
            color: '#ffffff'
          }}>
            But <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>so are we</strong>.
          </p>
          <p style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3vw, 36px)', 
            fontWeight: '600',
            lineHeight: '1.3', 
            marginBottom: '2rem',
            color: '#ffffff'
          }}>
            And each action — however small — <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>creates a wave</strong>.
          </p>
          <p style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3vw, 36px)', 
            fontWeight: '600',
            lineHeight: '1.3', 
            marginBottom: '3rem',
            color: '#ffffff'
          }}>
            <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Hope is an act. Strategy is a tool. And unity is our strength.</strong>
          </p>

          <button
            onClick={handleStart}
            disabled={loading}
            className="group relative text-white font-bold uppercase tracking-wider transition-all duration-300 hover:text-cyan-400 border border-white/30 hover:border-cyan-400 px-8 py-4 bg-transparent hover:bg-white/5"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: '700',
              fontSize: 'clamp(18px, 2vw, 24px)',
              letterSpacing: '0.03em',
              borderRadius: '2px'
            }}
          >
            <span className="relative z-10">
              {loading ? 'Loading Audio...' : 'SHAPE OUR JOURNEY TO 2050'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          
          <p style={{ 
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(20px, 2.5vw, 28px)', 
            color: '#ffffff', 
            fontWeight: '400',
            marginTop: '1.5rem',
            opacity: '0.8'
          }}>
            Audio experience recommended for full immersion
          </p>
        </div>
      </section>
    </div>
  );
}