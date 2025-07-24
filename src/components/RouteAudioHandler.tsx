import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAudio, Scenario } from "../context/AudioContext";

export default function RouteAudioHandler() {
  const { playScenario, stop, loading } = useAudio();
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't play audio if still loading
    if (loading) return;

    if (pathname.startsWith("/scenario-1")) {
      playScenario(Scenario.Scenario1);
    } else if (pathname.startsWith("/scenario-2")) {
      playScenario(Scenario.Scenario2);
    } else if (pathname.startsWith("/scenario-3")) {
      playScenario(Scenario.Scenario3);
    } else if (pathname === "/") {
      // On the main game page, start with Scenario0 (baseline audio)
      playScenario(Scenario.Scenario0);
    } else {
      // on any other route (e.g. results, home) fade out
      stop();
    }
  }, [pathname, playScenario, stop, loading]);

  return null;
}