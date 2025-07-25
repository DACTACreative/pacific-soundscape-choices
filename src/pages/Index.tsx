import { useState } from 'react';
import IntroScreen from '@/components/IntroScreen';
import GameScreen from '@/components/GameScreen';
import ResultScreen from '@/components/ResultScreen';
import AudioManager from '@/components/AudioManager';
import type { ThemeScores, ThemeAnswers } from '@/types/game';

type GameState = 'intro' | 'playing' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [mitigationScore, setMitigationScore] = useState(0);
  const [themeScores, setThemeScores] = useState<ThemeScores>({
    Political_Leadership_and_Regionalism: 0,
    People_Centered_Development: 0,
    Peace_and_Security: 0,
    Resource_and_Economic_Development: 0,
    Climate_Change_and_Disasters: 0,
    Ocean_and_Environment: 0,
    Technology_and_Connectivity: 0
  });
  const [themeAnswers, setThemeAnswers] = useState<ThemeAnswers>({
    Political_Leadership_and_Regionalism: [],
    People_Centered_Development: [],
    Peace_and_Security: [],
    Resource_and_Economic_Development: [],
    Climate_Change_and_Disasters: [],
    Ocean_and_Environment: [],
    Technology_and_Connectivity: []
  });
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [scenarioAudio, setScenarioAudio] = useState<'low' | 'medium' | 'high' | null>(null);

  const handleGameStart = () => {
    setGameState('playing');
    setAudioPlaying(true);
    setMitigationScore(0);
    setThemeScores({
      Political_Leadership_and_Regionalism: 0,
      People_Centered_Development: 0,
      Peace_and_Security: 0,
      Resource_and_Economic_Development: 0,
      Climate_Change_and_Disasters: 0,
      Ocean_and_Environment: 0,
      Technology_and_Connectivity: 0
    });
    setThemeAnswers({
      Political_Leadership_and_Regionalism: [],
      People_Centered_Development: [],
      Peace_and_Security: [],
      Resource_and_Economic_Development: [],
      Climate_Change_and_Disasters: [],
      Ocean_and_Environment: [],
      Technology_and_Connectivity: []
    });
    setScenarioAudio(null);
  };

  const handleGameComplete = (mitigation: number, themes: ThemeScores, answers: ThemeAnswers) => {
    setMitigationScore(mitigation);
    setThemeScores(themes);
    setThemeAnswers(answers);
    setGameState('results');
    setAudioPlaying(false);
    
    // Determine which scenario audio to play
    let scenario: 'low' | 'medium' | 'high' = 'medium';
    if (mitigation >= 5) scenario = 'low';
    else if (mitigation >= 3) scenario = 'medium';
    else scenario = 'high';
    
    setScenarioAudio(scenario);
  };

  const handleReplay = () => {
    setGameState('playing');
    setAudioPlaying(true);
    setMitigationScore(0);
    setThemeScores({
      Political_Leadership_and_Regionalism: 0,
      People_Centered_Development: 0,
      Peace_and_Security: 0,
      Resource_and_Economic_Development: 0,
      Climate_Change_and_Disasters: 0,
      Ocean_and_Environment: 0,
      Technology_and_Connectivity: 0
    });
    setThemeAnswers({
      Political_Leadership_and_Regionalism: [],
      People_Centered_Development: [],
      Peace_and_Security: [],
      Resource_and_Economic_Development: [],
      Climate_Change_and_Disasters: [],
      Ocean_and_Environment: [],
      Technology_and_Connectivity: []
    });
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
          themeScores={themeScores}
          themeAnswers={themeAnswers}
          onReplay={handleReplay}
        />
      )}
    </>
  );
};

export default Index;
