import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimePassageLoadingProps {
  targetScenario: number;
  onComplete?: () => void;
}

export default function TimePassageLoading({ targetScenario, onComplete }: TimePassageLoadingProps) {
  const [currentYear, setCurrentYear] = useState(2025);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const startYear = 2025;
    const endYear = 2050;
    const totalYears = endYear - startYear;
    const duration = 6000; // 6 seconds total
    const intervalMs = 50; // Update every 50ms for smooth animation
    const totalSteps = duration / intervalMs;
    const yearsPerStep = totalYears / totalSteps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newProgress = (step / totalSteps) * 100;
      const newYear = Math.round(startYear + (step * yearsPerStep));
      
      setProgress(newProgress);
      setCurrentYear(Math.min(newYear, endYear));

      if (step >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
          navigate(`/scenario-${targetScenario}`);
        }, 500); // Small delay after completion
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [targetScenario, navigate, onComplete]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-12 px-8">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-300 uppercase">
            Time Passes
          </h1>
          <div className="w-24 h-px bg-white/30 mx-auto"></div>
        </div>

        {/* Year display */}
        <div className="space-y-6">
          <div className="text-8xl md:text-9xl font-light tracking-tight text-white font-mono">
            {currentYear}
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Decisions shape the future
          </p>
        </div>

        {/* Progress indicator */}
        <div className="space-y-4 max-w-md mx-auto">
          <div className="w-full h-px bg-white/20 relative">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 font-light">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Atmospheric text */}
        <div className="space-y-2 max-w-lg mx-auto">
          <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
            Your choices ripple through the decades...
          </p>
          <p className="text-xs text-gray-600 font-light">
            Preparing your Pacific future
          </p>
        </div>
      </div>

      {/* Subtle pulse animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}