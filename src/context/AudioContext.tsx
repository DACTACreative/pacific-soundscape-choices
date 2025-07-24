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
  playScenario: (scenario: Scenario) => void;
  stop: () => void;
}

const AudioContext = createContext<AudioContextType>(null!);

const AUDIO_PATHS: Record<Scenario, string> = {
  [Scenario.Scenario0]: encodeURI(
    "/audio/Scenario 0 Tide Fiji Suva 10.10.2024- 18.1416° S, 178.4419° E - 24.07.25, 16.25.m4a"
  ),
  [Scenario.Scenario1]: encodeURI(
    "/audio/Scenario 1 Tide Fiji Suva 10.10.2024- 18.1416° S, 178.4419° E - 24.07.25, 16.04.m4a"
  ),
  [Scenario.Scenario2]: encodeURI(
    "/audio/Scenario 2 Tide Fiji Suva 10.10.2024- 18.1416° S, 178.4419° E - 24.07.25, 16.04.m4a"
  ),
  [Scenario.Scenario3]: encodeURI(
    "/audio/Scenario 3 Tide Fiji Suva 10.10.2024- 18.1416° S, 178.4419° E - 24.07.25, 16.03.m4a"
  ),
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [howls, setHowls] = useState<Record<Scenario, Howl>>({} as any);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<Scenario | null>(null);

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
      });
      instances[sc] = hw;
      loaders.push(
        new Promise((res) => hw.once("load", () => res()))
      );
    });

    Promise.all(loaders).then(() => {
      setHowls(instances);
      setLoading(false);
    });
  }, []);

  // 2) Play or switch scenarios
  const playScenario = (scenario: Scenario) => {
    if (current && howls[current]) {
      howls[current].fade(howls[current].volume(), 0, 1000);
    }
    const sound = howls[scenario]!;
    sound.volume(0);
    sound.play();
    sound.fade(0, 0.3, 1000);
    setCurrent(scenario);
  };

  // 3) Fade out & stop
  const stop = () => {
    if (!current) return;
    const sound = howls[current]!;
    sound.fade(sound.volume(), 0, 800);
    setTimeout(() => {
      sound.stop();
      setCurrent(null);
    }, 800);
  };

  return (
    <AudioContext.Provider value={{ loading, playScenario, stop }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);