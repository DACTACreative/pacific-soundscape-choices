import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Howl } from "howler";

export enum Scenario {
  Scenario0 = "scenario0",
  Scenario1 = "scenario1", 
  Scenario2 = "scenario2",
  Scenario3 = "scenario3",
}

interface AudioContextType {
  loading: boolean;
  audioEnabled: boolean;
  enableAudio: () => void;
  playScenario: (scenario: Scenario) => void;
  stop: () => void;
}

const AudioContext = createContext<AudioContextType>(null!);

const AUDIO_PATHS: Record<Scenario, string> = {
  [Scenario.Scenario0]: "/audio/scenario-0.m4a",
  [Scenario.Scenario1]: "/audio/scenario-1.m4a",
  [Scenario.Scenario2]: "/audio/scenario-2.m4a",
  [Scenario.Scenario3]: "/audio/scenario-3.m4a",
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [howls, setHowls] = useState<Record<Scenario, Howl>>({} as any);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<Scenario | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // 1) Preload all four files on mount
  useEffect(() => {
    const instances = {} as Record<Scenario, Howl>;
    const loaders: Promise<void>[] = [];

    (Object.keys(AUDIO_PATHS) as Scenario[]).forEach((sc) => {
      const hw = new Howl({
        src: [AUDIO_PATHS[sc]],
        loop: true,
        volume: 0,
        preload: true,
        onloaderror: (id, error) => {
          console.warn(`Audio load error for ${sc}:`, error);
          // Still resolve to prevent hanging
        },
        onload: () => {
          console.log(`Audio loaded successfully: ${sc}`);
        }
      });
      instances[sc] = hw;
      loaders.push(
        new Promise((res) => {
          hw.once("load", () => res());
          hw.once("loaderror", () => res()); // Resolve even on error
          // Add timeout fallback
          setTimeout(() => res(), 5000); // Max 5 seconds wait
        })
      );
    });

    Promise.all(loaders).then(() => {
      setHowls(instances);
      setLoading(false);
      console.log("Audio context loading complete");
    });

    // Fallback: Force loading to false after 8 seconds
    const fallbackTimer = setTimeout(() => {
      console.warn("Audio loading timeout, forcing ready state");
      setLoading(false);
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Enable audio (requires user interaction)
  const enableAudio = () => {
    setAudioEnabled(true);
    console.log("Audio enabled by user interaction");
  };

  // 2) Play or switch scenarios
  const playScenario = (scenario: Scenario) => {
    // Guard: don't play if still loading, howls not ready, or audio not enabled
    if (loading || !howls[scenario] || !audioEnabled) {
      console.log("Audio playback blocked:", { loading, hasHowl: !!howls[scenario], audioEnabled });
      return;
    }

    if (current && howls[current]) {
      howls[current].fade(howls[current].volume(), 0, 1000);
    }
    const sound = howls[scenario];
    sound.volume(0);
    sound.play();
    sound.fade(0, 0.3, 1000);
    setCurrent(scenario);
  };

  // 3) Fade out & stop
  const stop = () => {
    if (!current || !howls[current]) return;
    const sound = howls[current];
    sound.fade(sound.volume(), 0, 800);
    setTimeout(() => {
      sound.stop();
      setCurrent(null);
    }, 800);
  };

  return (
    <AudioContext.Provider value={{ loading, audioEnabled, enableAudio, playScenario, stop }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);