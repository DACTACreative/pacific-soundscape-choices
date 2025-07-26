import { useEffect, useRef, useState } from 'react';

interface StoryScrollSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  overlay?: string;
  parallax?: boolean;
  className?: string;
}

export default function StoryScrollSection({ 
  children, 
  backgroundImage, 
  backgroundColor = 'bg-ocean-deep',
  overlay = 'bg-black/50',
  parallax = false,
  className = ''
}: StoryScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen flex items-center justify-center ${backgroundColor} ${className}`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
            parallax ? 'transform-gpu' : ''
          }`}
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            transform: parallax ? 'translateZ(0)' : 'none'
          }}
        />
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />
      
      {/* Content */}
      <div 
        className={`relative z-10 max-w-4xl mx-auto px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    </section>
  );
}