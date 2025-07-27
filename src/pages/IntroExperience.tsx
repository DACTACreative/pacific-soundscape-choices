import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullIntroExperience from '@/components/FullIntroExperience';
import { AudioProvider } from '@/context/AudioContext';

export default function IntroExperience() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Navigate to the main game or wherever you want
    navigate('/game');
  };

  return (
    <AudioProvider>
      <FullIntroExperience 
        onComplete={handleComplete}
        showAudioControls={true}
      />
    </AudioProvider>
  );
}