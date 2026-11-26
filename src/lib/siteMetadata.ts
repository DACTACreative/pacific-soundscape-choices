export const SITE_URL = "https://blueparadigm.dactacreative.com";

export const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Blue Paradigm 2050 | A Sound-Driven Pacific Climate Journey",
    description: "Explore Pacific futures with Blue Paradigm 2050, Eunice Rigo's interactive climate story combining data, sound and choices, with Fiji as a case study.",
  },
  "/game": {
    title: "Choose Your Pacific Future | Blue Paradigm 2050",
    description: "Make choices across seven Blue Pacific themes and explore how climate action and community resilience shape possible futures for Fiji and the Pacific.",
  },
  "/scenario-1": {
    title: "The Great Re-Think: Scenario 1 | Blue Paradigm 2050",
    description: "Explore The Great Re-Think, a fictional Pacific future shaped by climate action, with Fiji sea-level projections, soundscapes and the seven Blue Pacific themes.",
  },
  "/scenario-2": {
    title: "The Techno-Fix Muddle: Scenario 2 | Blue Paradigm 2050",
    description: "Explore The Techno-Fix Muddle, a fictional Pacific future with uneven climate action, through Fiji sea-level projections, soundscapes and Blue Pacific themes.",
  },
  "/scenario-3": {
    title: "The Great Distraction: Scenario 3 | Blue Paradigm 2050",
    description: "Explore The Great Distraction, a fictional Pacific future facing severe climate pressures, through Fiji sea-level projections, soundscapes and Blue Pacific themes.",
  },
  "/credits": {
    title: "Credits, Sources and Methodology | Blue Paradigm 2050",
    description: "Discover Blue Paradigm 2050's creator Eunice Rigo, data sources, sound design and methodology, informed by the 2050 Strategy for the Blue Pacific.",
  },
};

export function getPageMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = pageMetadata[path];
  return page
    ? { ...page, canonical: `${SITE_URL}${path === "/" ? "/" : path}`, robots: "index, follow" }
    : { title: "Page Not Found | Blue Paradigm 2050", description: "This Blue Paradigm page could not be found.", canonical: null, robots: "noindex, follow" };
}