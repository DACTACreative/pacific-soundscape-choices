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
          fontSize: 'clamp(24px, 4vw, 48px)',
          fontWeight: '700',
          letterSpacing: '-0.03em',
          color: '#0026d7',
          marginBottom: '0.25rem'
        }}>
          BLUE PACIFIC 2050
        </h1>
        <p style={{ 
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: '300',
          letterSpacing: '0.05em',
          color: '#f4f4f0'
        }}>
          AN IMMERSIVE EXPERIENCE INTO OUR FUTURE
        </p>
      </div>

      {/* Block 1 - Text Left, Image Right */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content scroll-block--left" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem' 
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            flex: '1', 
            maxWidth: '70ch' 
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              This piece was created to <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>create feeling</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              To create a sense of belonging and hope — a rare feeling in the face of climate change.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              To show light.<br/>
              To involve more people into decisions that concern us — like the <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Blue Pacific 2050 Strategy</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              To bring us together as a region.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              We are mainly made of sea. We are so close… but so far.
            </p>
            <p style={{ 
              fontSize: 'clamp(14px, 1.8vw, 18px)', 
              color: '#35c5f2', 
              fontWeight: '300' 
            }}>
              The Pacific represents 10 million people across over 1,000 islands
            </p>
          </div>

          <div className="scroll-block__image" data-scroll data-scroll-sticky data-scroll-target=".scroll-block" style={{ 
            flex: '0 0 auto', 
            width: '100%', 
            maxWidth: '450px' 
          }}>
            <div style={{ 
              aspectRatio: '3/4', 
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
        </div>
      </section>

      {/* Block 2 - Text Right, Image Left */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content scroll-block--right" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem',
          flexDirection: 'row-reverse'
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            flex: '1', 
            maxWidth: '70ch' 
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              The sea is what brings us together.<br/>
              It's the backbone of our <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Pacific culture</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              That's why this piece focuses on sound — the sound of this ocean — to accompany your journey.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              When you begin the game, you will be projected into <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Fiji</strong>.<br/>
              The date is October 10, 2024.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              The sound you'll hear? It's <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>real</strong>. The actual tide, sonified.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Each high tide = water rising.<br/>
              Each low = a retreat six hours later.
            </p>
            <p style={{ 
              fontSize: 'clamp(14px, 1.8vw, 18px)', 
              color: '#35c5f2', 
              fontWeight: '300' 
            }}>
              <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Sonification</strong> translates data into frequency-based sound.
            </p>
          </div>

          <div className="scroll-block__image" data-scroll data-scroll-sticky data-scroll-target=".scroll-block" style={{ 
            flex: '0 0 auto', 
            width: '100%', 
            maxWidth: '450px' 
          }}>
            <div style={{ 
              aspectRatio: '3/4', 
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
        </div>
      </section>

      {/* Block 3 - Text Left, Image Right */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content scroll-block--left" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem' 
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            flex: '1', 
            maxWidth: '70ch' 
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              We are already on the path to a <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>warmer Earth</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              The Pacific contributes less than <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>0.03%</strong> of global carbon emissions.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Yet we face the consequences just as much as any other region.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Sea level rise is one of our most <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>silent threats</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              color: '#f4f4f0'
            }}>
              So slow, so invisible… we forget.<br/>
              But it's always there — like the background sound of this ocean.
            </p>
          </div>

          <div className="scroll-block__image" data-scroll data-scroll-sticky data-scroll-target=".scroll-block" style={{ 
            flex: '0 0 auto', 
            width: '100%', 
            maxWidth: '450px' 
          }}>
            <div style={{ 
              aspectRatio: '3/4', 
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
        </div>
      </section>

      {/* Block 4 - Text Right, Image Left */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content scroll-block--right" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem',
          flexDirection: 'row-reverse'
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            flex: '1', 
            maxWidth: '70ch' 
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              During this game, you'll be projected into a series of <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>decisions</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Every one of them is connected to the themes and indicators from the <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Blue Pacific 2050 Implementation Plan</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Some are policy-based. Others are small-scale utopias.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              color: '#f4f4f0'
            }}>
              Why utopia? Because <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>keeping hope is a form of resistance</strong>.
            </p>
          </div>

          <div className="scroll-block__image" data-scroll data-scroll-sticky data-scroll-target=".scroll-block" style={{ 
            flex: '0 0 auto', 
            width: '100%', 
            maxWidth: '450px' 
          }}>
            <div style={{ 
              aspectRatio: '3/4', 
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
        </div>
      </section>

      {/* Block 5 - Text Left, Image Right */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content scroll-block--left" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '3rem' 
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            flex: '1', 
            maxWidth: '70ch' 
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              This is a simplification. A <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>gamification</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              A playable form of Monitoring, Evaluation, and Learning (MEL).
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Because sometimes impact gets buried in spreadsheets.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              And here — <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>impact becomes immersive</strong>.<br/>
              It becomes personal.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              color: '#f4f4f0'
            }}>
              Frameworks and policies are crucial, yes.<br/>
              But <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>emotion moves people</strong>. Feeling makes things real.
            </p>
          </div>

          <div className="scroll-block__image" data-scroll data-scroll-sticky data-scroll-target=".scroll-block" style={{ 
            flex: '0 0 auto', 
            width: '100%', 
            maxWidth: '450px' 
          }}>
            <div style={{ 
              aspectRatio: '3/4', 
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
        </div>
      </section>

      {/* Final CTA - Text Center with Button */}
      <section data-scroll-section className="scroll-block" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2rem' 
      }}>
        <div className="scroll-block__content" style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          textAlign: 'center'
        }}>
          <div className="scroll-block__text" data-scroll data-scroll-speed="1" style={{ 
            maxWidth: '70ch',
            margin: '0 auto'
          }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              Yes, the ocean is rising.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              But <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>so are we</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              And each action — however small — <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>creates a wave</strong>.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '1.5rem',
              color: '#f4f4f0'
            }}>
              This experience is here to remind us:
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '2rem',
              color: '#f4f4f0'
            }}>
              <strong style={{ color: '#35c5f2', fontWeight: 'bold' }}>Hope is an act. Strategy is a tool. And unity is our strength.</strong>
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 22px)', 
              lineHeight: '1.5', 
              marginBottom: '3rem',
              color: '#f4f4f0'
            }}>
              Let's shape a future that looks like us — not one shaped without us.
            </p>

            <div style={{ marginTop: '2rem' }}>
              <Button
                onClick={handleStart}
                disabled={loading}
                size="lg"
                style={{
                  padding: '1rem 2rem',
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: '700',
                  backgroundColor: 'transparent',
                  border: '2px solid #35c5f2',
                  color: '#35c5f2',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="group relative hover:text-black"
              >
                <span className="absolute inset-0 bg-[#35c5f2] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">
                  {loading ? 'Loading Audio...' : 'SHAPE OUR JOURNEY TO 2050'}
                </span>
              </Button>
              
              <p style={{ 
                marginTop: '1rem', 
                fontSize: 'clamp(14px, 1.8vw, 18px)', 
                color: '#f4f4f0', 
                fontWeight: '300' 
              }}>
                Audio experience recommended for full immersion
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}