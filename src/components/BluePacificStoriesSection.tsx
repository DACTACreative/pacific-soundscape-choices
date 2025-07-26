import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface ThemeData {
  thematic_summary: string;
  level_of_ambition: string;
  present_day_problematic: string;
  bp2050_indicators: string;
}

interface PlayerChoice {
  theme: string;
  answer: string;
  narrative: string;
  impact: string;
  outcome: string;
}

const THEME_DATA: Record<string, ThemeData> = {
  "Political Leadership and Regionalism": {
    thematic_summary: "Strong and unified political leadership, both within nations and across the Pacific region has been the compass for navigating climate challenges. This theme is about governance, regional solidarity, and visionary leadership.",
    level_of_ambition: "All Pacific peoples will benefit from our Forum Leaders working together to safeguard, secure, and progress the Blue Pacific Continent, achieving regional priorities through a united and cohesive political leadership supported by the Pacific Islands Forum and a responsive regional architecture that aligns to the region's priorities and values. Partners recognise and respect our collective approach as the Blue Pacific Continent.",
    present_day_problematic: "Many remote villages felt left behind by national policies, and regional institutions often struggled to enforce agreements. In 2025, there was a gap between lofty regional statements and implementation on the ground. Fragmented governance, limited inclusion of women and youth, and external political pressures all threatened Pacific unity.",
    bp2050_indicators: "Inclusive Governance & Regional Coordination. Key measures include the number of Pacific states with formalized traditional governance integration (by 2050, more than 5 countries) and the existence of a binding regional climate treaty (achieved by 2030, with full compliance by 2050). Another indicator is the percentage of national budgets allocated to climate resilience, reflecting political commitment – Fiji, for example, devoted a world-leading portion of its budget to green investment by the 2040s."
  },
  "People Centered Development": {
    thematic_summary: "At its heart, climate action is about people – their health, education, culture, and well-being. People-Centered Development means no one is left behind. It's about strengthening communities, investing in health and education systems, and preserving cultural identity amidst change.",
    level_of_ambition: "All Pacific peoples continue to draw deep cultural and spiritual attachment to their land and the ocean, and all are assured safety, security, gender equality, and access to education, health, sport and other services so that no one is left behind.",
    present_day_problematic: "Public health systems in the Pacific were uneven – rural and outer island communities had limited access to doctors and hospitals. Non-communicable diseases were on the rise. Educational opportunities beyond primary school were lacking in remote areas, causing youth to migrate or miss out. Cultural erosion was a concern as younger generations drifted from traditions.",
    bp2050_indicators: "Key metrics here include the Human Development Index (HDI) for Pacific nations (by 2050 Fiji's HDI is among the highest in its income group), the Universal Health Coverage index (rising dramatically as noted), and Cultural Participation rates (measured by things like language fluency and festival attendance – which saw an uptick, indicating culture thriving)."
  },
  "Peace and Security": {
    thematic_summary: "Climate change is not just an environmental issue – it's a security issue. Peace and Security in the Pacific context means safeguarding the sovereignty of nations, the safety of communities, and the stability needed for development, even as the climate shifts.",
    level_of_ambition: "A peaceful, safe, and secure Blue Pacific region which respects national sovereignty, and where people can realise their full potentials as individuals, communities and nations, and where the region delivers Pacific-coordinated responses to security challenges and contributes to building global peace and security.",
    present_day_problematic: "Rising seas threatened territorial integrity (Would disappearing islands mean lost EEZs and fishing rights? Would displaced people cause regional disputes?). Also, a legacy of limited military capacity and reliance on larger powers left Pacific nations feeling vulnerable. Internally, land disputes or post-disaster stress sometimes heightened tensions.",
    bp2050_indicators: "Statehood & Sovereignty secured: The number of Pacific nations with legally protected statehood regardless of land loss (achieved for two atoll nations and set as global norm). Conflict prevention: Metrics like the Global Peace Index score for Pacific countries improved or held steady, even as other parts of the world saw climate-related conflict spikes."
  },
  "Resource and Economic Development": {
    thematic_summary: "How can Pacific nations develop their economies sustainably, leveraging natural resources without depleting them? Resource and Economic Development covers sustainable industries, fair investments, and the pursuit of prosperity that doesn't compromise culture or environment.",
    level_of_ambition: "All Pacific peoples benefit from a sustainable and resilient model of economic development, including enabling public policy and a vibrant private sector and others, that brings improved socio-economic wellbeing by ensuring access to employment, entrepreneurship, trade and investment in the region.",
    present_day_problematic: "The allure of quick money through unsustainable means was strong. Foreign investors knocked with proposals for things like large logging operations, deep-sea mining, or fossil fuel projects, which threatened to harm the environment and community livelihoods. Local businesses struggled to access capital and markets.",
    bp2050_indicators: "Look at metrics like the Green GDP or Adjusted Net National Income (accounting for resource depletion) – in Fiji these indices went up, meaning growth came without degrading natural assets. The proportion of GDP from sustainable industries (renewables, sustainable tourism, agroforestry, etc.) is another indicator, climbing significantly."
  },
  "Climate Change and Disasters": {
    thematic_summary: "This theme lies at the very core of our 2050 vision – Climate Change and Disasters encapsulates mitigation, adaptation, and disaster risk management. It asks: did we reduce the climate threat (mitigation), and did we protect our communities from the changes we couldn't avoid (adaptation)?",
    level_of_ambition: "All Pacific Peoples remain resilient to the impacts of climate change and disasters and are able to lead safe, secure and prosperous lives. The region continues to play a leadership role in global climate action.",
    present_day_problematic: "The science was clear that the Pacific would face more intense cyclones, sea level rise, coral bleaching, and droughts. Yet in 2025, adaptation efforts were underfunded and patchy. Early warning systems were not universally in place. Many communities had plans on paper but few resources to implement them.",
    bp2050_indicators: "Key measures of success in this theme are stark and meaningful. Climate mitigation: Pacific's combined emissions in 2050 are a fraction of 2025 levels. Adaptation: Coastal flood days per year – held to single digits in most places, a remarkable feat. Coral reef health index – while global reef decline was severe, Pacific coral refugia and restoration meant some reefs survived."
  },
  "Ocean and Environment": {
    thematic_summary: "The ocean is the lifeblood of the Pacific. This theme is about how Fiji and its neighbors protected and restored the natural world – from coral reefs and fisheries to forests and biodiversity. In 2050, under the sustainable scenario, the Ocean and Environment are in a state of hopeful recovery.",
    level_of_ambition: "All Pacific people live in a sustainably managed Blue Pacific Continent, while steadfastly maintaining resilience to threats to its environment.",
    present_day_problematic: "Pacific ecosystems were under multiple assaults – warming and acidifying oceans bleaching coral and shifting fish stocks, overfishing (often by distant fleets) reducing fisheries, plastic pollution washing ashore, and invasive species threatening island biodiversity.",
    bp2050_indicators: "The percentage of marine Key Biodiversity Areas under protection is one – in this scenario, over 30% of critical marine habitats are safeguarded. Another indicator is forest cover change – several countries see net increases in forest cover by 2050 thanks to reforestation. The reef health index improves or holds steady where it would have plummeted without action."
  },
  "Technology and Connectivity": {
    thematic_summary: "Even amid the vast Pacific Ocean, connectivity – both digital and physical – became a lifeline by 2050. Technology and Connectivity encompasses bridging distances with digital infrastructure, using tech innovation for climate solutions, and ensuring communities are connected to information and each other.",
    level_of_ambition: "All Pacific Peoples benefit from access to affordable, safe and reliable land, air and sea transport and ICT infrastructure, systems and operations, while ensuring culturally sensitive user-protection and cyber security.",
    present_day_problematic: "The Pacific's geographic isolation meant many communities were 'off the grid' digitally. Internet access was expensive or nonexistent outside main towns. This hindered education, business, and disaster response. Additionally, the region risked being left behind in technological advancements.",
    bp2050_indicators: "We measure success in connectivity by looking at the proportion of population with reliable internet access – which exceeded 90% in Fiji and is continually improving in others. The digital gender divide closed to near zero, ensuring equity. Tech is also measured by outcomes: for instance, lead time for disaster warnings dropped dramatically thanks to networks."
  }
};

export default function BluePacificStoriesSection() {
  const [playerChoices, setPlayerChoices] = useState<PlayerChoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load selected answer codes from sessionStorage
    const selectedCodes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    
    console.log('📖 Stories Section - Selected codes:', selectedCodes);
    
    if (selectedCodes.length === 0) {
      console.log('📖 No selected codes found for stories section');
      setLoading(false);
      return;
    }

    // Load mapping CSV data
    fetch('/data/Mapping - Question BPC - Sheet1.csv')
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          transform: (value, field) => {
            if (typeof value === 'string') {
              return value.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            }
            return value;
          },
          complete: (results) => {
            console.log('📖 CSV parsed for stories:', results.data.length, 'rows');
            
            // Find matching answers for selected codes
            const matchedAnswers = selectedCodes.map((code: string) => {
              const row = results.data.find((row: any) => row.code && row.code.trim() === code.trim()) as any;
              if (row) {
                console.log(`📖 Found match for ${code}:`, {
                  theme: row.theme,
                  answer: row.answer?.substring(0, 50) + '...',
                  narrative: row.narrative?.substring(0, 50) + '...'
                });
                return {
                  theme: (row.theme as string)?.trim() || '',
                  answer: (row.answer as string)?.trim() || '',
                  narrative: (row.narrative as string)?.trim() || '',
                  impact: (row.impact as string)?.trim() || '',
                  outcome: (row.outcome as string)?.trim() || ''
                };
              }
              console.log(`📖 No match found for code: ${code}`);
              return null;
            }).filter((item): item is PlayerChoice => item !== null);
            
            console.log('📖 Final matched answers:', matchedAnswers.length);
            setPlayerChoices(matchedAnswers as PlayerChoice[]);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error('📖 Failed to load story data:', err);
        setLoading(false);
      });
  }, []);

  // Group choices by theme
  const choicesByTheme = playerChoices.reduce((acc: Record<string, PlayerChoice[]>, choice) => {
    if (choice.theme && THEME_DATA[choice.theme]) {
      if (!acc[choice.theme]) {
        acc[choice.theme] = [];
      }
      acc[choice.theme].push(choice);
    }
    return acc;
  }, {});
  
  console.log('📖 Choices grouped by theme:', choicesByTheme);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading Pacific stories...</div>
      </div>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12">
      {/* Section Header */}
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Blue Pacific Stories of Impact & Outcome Mapping
        </h2>
        <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
          In this section, we delve deeper into specific thematic areas to illustrate the impact of decisions and initiatives that shaped the Pacific region's journey to 2050. Each theme is part of the Blue Pacific Strategy and represents a critical arena where policy choices translated into real-world outcomes. These are the human stories behind the spider chart's data points – "Blue Pacific" stories of impact that show how collective action and innovation made a difference.
        </p>
      </div>

      {/* Thematic Blocks */}
      {Object.entries(THEME_DATA).map(([themeName, themeData]) => {
        const playerChoice = choicesByTheme[themeName];
        
        return (
          <div key={themeName} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              {themeName}
            </h2>

            <p className="text-lg text-white/80 font-light mb-4">
              <strong>Thematic Summary:</strong> {themeData.thematic_summary}
            </p>

            <p className="text-lg text-white/80 font-light mb-4">
              <strong>Level of Ambition:</strong> {themeData.level_of_ambition}
            </p>

            <p className="text-lg text-white/80 font-light mb-8">
              <strong>Present-Day Problematic (2025):</strong> {themeData.present_day_problematic}
            </p>

            {/* Dynamic: Player's choice outcome */}
            {playerChoice && playerChoice.length > 0 ? (
              <div className="space-y-4 mb-6">
                {playerChoice.map((choice, index) => (
                  <div key={index} className="bg-black/40 border border-white/20 p-6 rounded-lg">
                    <h3 className="text-[#35c5f2] text-sm font-semibold mb-2 uppercase tracking-wide">
                      Your 2050 Outcome {playerChoice.length > 1 ? `#${index + 1}` : ''}
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed mb-3">
                      <strong>Your Choice:</strong> {choice.answer}
                    </p>
                    <p className="text-white/70 text-base leading-relaxed mb-3">
                      <strong>Narrative:</strong> {choice.narrative}
                    </p>
                    <p className="text-orange-300 text-base leading-relaxed mb-3">
                      <strong>Impact:</strong> {choice.impact}
                    </p>
                    <p className="text-green-300 text-base leading-relaxed">
                      <strong>Outcome:</strong> {choice.outcome}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/40 border border-white/20 p-6 rounded-lg mb-6">
                <h3 className="text-[#35c5f2] text-sm font-semibold mb-2 uppercase tracking-wide">
                  Potential 2050 Outcome
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  In this theme, Pacific leaders implemented innovative approaches that strengthened regional cooperation and created lasting positive change for communities across the Blue Pacific.
                </p>
              </div>
            )}

            {/* Static indicators */}
            <div className="bg-black/40 border border-[#35c5f2]/20 p-6 rounded-lg">
              <h3 className="text-[#35c5f2] text-sm font-semibold mb-2 uppercase tracking-wide">
                BP2050 Indicators
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                {themeData.bp2050_indicators}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}