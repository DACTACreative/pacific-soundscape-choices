import { useEffect, useState, useRef } from 'react';

export const useScrollReveal = () => {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-reveal');
            if (elementId && !visibleElements.includes(elementId)) {
              setVisibleElements(prev => [...prev, elementId]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('[data-reveal]');
    revealElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleElements]);

  const isVisible = (elementId: string) => visibleElements.includes(elementId);

  return { sectionRef, isVisible };
};