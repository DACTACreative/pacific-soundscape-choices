import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  type: string;
  title: string;
  value: number;
  unit?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ 
  title, 
  value, 
  unit = '', 
  duration = 2000 
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.floor(startValue + (endValue - startValue) * easeOut);
      
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCurrentValue(endValue);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isVisible, value, duration]);

  return (
    <div ref={counterRef} className="counter-block text-center">
      <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
        {title}
      </h4>
      <div className="text-6xl md:text-8xl font-bold text-blue-300 mb-2">
        {currentValue.toLocaleString()}
        {unit && <span className="text-4xl md:text-6xl text-white/60">{unit}</span>}
      </div>
      <div className="w-16 h-1 bg-blue-300 mx-auto rounded-full"></div>
    </div>
  );
};

export default CountUp;