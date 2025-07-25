import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import GameScreen from '@/components/GameScreen';

type GameState = 'intro' | 'playing';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');

  const handleGameStart = () => {
    setGameState('playing');
  };

  const handleGameComplete = (selectedAnswerCodes: string[]) => {
    // Game now redirects directly to scenario pages
    // No need to handle completion here
  };

  return (
    <>      
      {gameState === 'intro' && (
        <IntroScreen onStart={handleGameStart} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen onComplete={handleGameComplete} />
      )}
    </>
  );
};

export default Index;