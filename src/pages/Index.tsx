import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import GameScreen from '@/components/GameScreen';
import ResultScreen from '@/components/ResultScreen';
import AudioManager from '@/components/AudioManager';

type GameState = 'intro' | 'playing' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [mitigationScore, setMitigationScore] = useState(0);
  const [resilienceScore, setResilienceScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [scenarioAudio, setScenarioAudio] = useState<'low' | 'medium' | 'high' | null>(null);

  const handleGameStart = () => {
    setGameState('playing');
    setAudioPlaying(true);
    setMitigationScore(0);
    setResilienceScore(0);
    setScenarioAudio(null);
  };

  const handleGameComplete = (mitigation: number, resilience: number) => {
    setMitigationScore(mitigation);
    setResilienceScore(resilience);
    setGameState('results');
    setAudioPlaying(false);
    
    // Determine which scenario audio to play
    let scenario: 'low' | 'medium' | 'high' = 'medium';
    if (mitigation >= 4) scenario = 'low';
    else if (mitigation <= -4) scenario = 'high';
    
    setScenarioAudio(scenario);
  };

  const handleReplay = () => {
    setGameState('playing');
    setAudioPlaying(true);
    setMitigationScore(0);
    setResilienceScore(0);
    setScenarioAudio(null);
  };

  return (
    <>
      <AudioManager 
        isPlaying={audioPlaying}
        scenario={scenarioAudio}
      />
      
      {gameState === 'intro' && (
        <IntroScreen onStart={handleGameStart} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen onComplete={handleGameComplete} />
      )}
      
      {gameState === 'results' && (
        <ResultScreen 
          mitigationScore={mitigationScore}
          resilienceScore={resilienceScore}
          onReplay={handleReplay}
        />
      )}
    </>
  );
};

export default Index;
