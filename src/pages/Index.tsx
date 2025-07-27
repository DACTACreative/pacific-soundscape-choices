import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import GameScreen from '@/components/GameScreen';
import MinimalTest from '@/components/MinimalTest';

type GameState = 'intro' | 'playing';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');

  const handleGameStart = () => {
    console.log('Game starting...');
    setGameState('playing');
  };

  const handleGameComplete = () => {
    console.log('Game completed, returning to intro');
    setGameState('intro');
  };

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    try {
      console.log('Index component rendering, gameState:', gameState);
    } catch (error) {
      console.error('Error in Index component:', error);
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error Loading Game</h1>
            <p className="text-xl">Check console for details</p>
          </div>
        </div>
      );
    }
  }

  try {
    return (
      <div className="min-h-screen">
        {gameState === 'intro' ? (
          <IntroScreen onStart={handleGameStart} />
        ) : (
          <GameScreen onComplete={handleGameComplete} />
        )}
      </div>
    );
  } catch (error) {
    console.error('Render error in Index:', error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Render Error</h1>
          <p className="text-xl">Something went wrong rendering the game</p>
          <pre className="mt-4 text-sm text-red-400">{String(error)}</pre>
        </div>
      </div>
    );
  }
};

export default Index;