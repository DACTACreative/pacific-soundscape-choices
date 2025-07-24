import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  isPlaying: boolean;
  scenario?: 'low' | 'medium' | 'high' | null;
  onAmbientStart?: () => void;
  onScenarioStart?: () => void;
}

export default function AudioManager({ isPlaying, scenario, onAmbientStart, onScenarioStart }: AudioManagerProps) {
  const ambientRef = useRef<HTMLAudioElement>(null);
  const scenarioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Placeholder audio URLs - in production these would be real audio files
  const audioFiles = {
    ambient: '/audio/ambient.mp3', // Gentle ocean sounds loop
    low: '/audio/scenario-low.mp3', // Calm, peaceful ocean
    medium: '/audio/scenario-medium.mp3', // Moderate waves, some storm
    high: '/audio/scenario-high.mp3' // Dramatic storm, turbulent seas
  };

  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = 0.6;
      ambientRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && ambientRef.current && !scenario) {
      // Start ambient audio
      ambientRef.current.currentTime = 0;
      ambientRef.current.play().then(() => {
        onAmbientStart?.();
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    } else if (!isPlaying && ambientRef.current) {
      // Stop ambient audio
      ambientRef.current.pause();
    }
  }, [isPlaying, scenario, onAmbientStart]);

  useEffect(() => {
    if (scenario && ambientRef.current && scenarioRef.current) {
      // Fade out ambient and play scenario audio
      fadeOutAmbientAndPlayScenario();
    }
  }, [scenario]);

  const fadeOutAmbientAndPlayScenario = () => {
    if (!ambientRef.current || !scenarioRef.current || !scenario) return;

    const ambient = ambientRef.current;
    const scenarioAudio = scenarioRef.current;
    
    // Clear any existing fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const initialVolume = ambient.volume;
    const fadeDuration = 2000; // 2 seconds
    const fadeSteps = 20;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / fadeSteps;
      
      if (progress < 1) {
        ambient.volume = initialVolume * (1 - progress);
      } else {
        // Fade complete
        clearInterval(fadeIntervalRef.current!);
        ambient.pause();
        ambient.volume = initialVolume; // Reset for next time
        
        // Play scenario audio
        scenarioAudio.volume = 0.7;
        scenarioAudio.currentTime = 0;
        scenarioAudio.play().then(() => {
          onScenarioStart?.();
        }).catch(err => {
          console.log('Scenario audio play failed:', err);
        });
      }
    }, fadeDuration / fadeSteps);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Ambient ocean audio */}
      <audio
        ref={ambientRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={audioFiles.ambient} type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>

      {/* Scenario-specific audio */}
      <audio
        ref={scenarioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        {scenario && (
          <source src={audioFiles[scenario]} type="audio/mpeg" />
        )}
        Your browser does not support audio playback.
      </audio>
    </>
  );
}