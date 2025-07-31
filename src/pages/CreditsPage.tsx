import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CreditsPage() {
  const navigate = useNavigate();
  
  return (
    <div className="text-white min-h-screen bg-black">
      <div className="container mx-auto px-8 py-16 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Credits & Acknowledgements
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            This experience was created as part of the Pacific Data Visualization Challenge, 
            with deep respect for Pacific communities, knowledge systems, and the urgent 
            need for climate resilience building and mitigation in our region.
          </p>
        </div>

        {/* Game Concept Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Game Concept</h2>
          <div className="space-y-6 text-lg text-white/90 leading-relaxed">
            <p>
              A paradigm is a model or a framework of ideas, and this project proposes a new one for engaging with the future of the Blue Pacific Continent. It's a move beyond dense policy documents and abstract data, towards a more intuitive, artistic, and human-centered way of understanding the complex choices that will shape our region.
            </p>
            <p>
              Blue Paradigm translates the dense framework of the 2050 Strategy for the Blue Pacific Continent into an interactive narrative game. As a Pacific leader, the player makes a series of choices across seven interconnected thematic areas, with each decision affecting a complex scoring system designed to reflect real-world policy trade-offs. The core visualization challenge is to achieve a "balanced result" by meeting the "Level of Ambition" for all themes, a success metric visualized through a dynamic spider chart and thematic review cards. This quantitative feedback is paired with qualitative stories and an innovative data sonification of Fijian ocean tides, grounding abstract policy in the lived, sensory reality of the Pacific.
            </p>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-white mb-6">The Project's Foundation</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-medium text-white mb-3">Artistic Data Sonification</h4>
                  <p className="text-white/90 ml-4">
                    The experience begins with sound, designed to immerse the player in the inevitable presence of sea-level rise. The process involved capturing and normalizing real-world tide data from Suva, Fiji (October 10-11, 2024). I then layered the median sea-level rise projections onto this baseline to create generative soundscapes for each climate scenario. The resulting audio represents the "rise" with a higher pitch and increased "noise," reflecting the growing instability of weather patterns.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium text-white mb-3">Strategic Deconstruction & Game Design</h4>
                  <p className="text-white/90 ml-4">
                    The game's logic is the result of a granular analysis of the 2050 Strategy's Implementation Plan. I cross-referenced official indicators, outcomes, and "Levels of Ambition" to develop 22 distinct policy choices. These were then meticulously mapped into game questions and a weighted scoring system. The game is balanced to have a ~30% success rate, with around 600 "winning" combinations out of over 2,000 possibilities, making a balanced outcome challenging but achievable.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium text-white mb-3">Reflective Analytics</h4>
                  <p className="text-white/90 ml-4">
                    The results screen is a tool for reflection. The sea-level projection chart intentionally includes different quantiles to remind the user that these are possibilities, not certainties, and that our trajectory can still deviate. The interactive cards are designed to familiarize the player with the official language and ambitions of the 2050 Strategy in an engaging, educational way.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium text-white mb-3">AI-Generated Visuals</h4>
                  <p className="text-white/90 ml-4">
                    The "Solarpunk" aesthetic that defines the game's visual identity was created using generative AI. Each image was individually crafted using text-to-image machine learning models to convey the specific feeling and visual tone of the different scenarios, accentuating the immersive aspect of the experience.
                  </p>
                </div>
              </div>
              
              <p className="text-white/90 mt-8 italic">
                This project is a work of fiction grounded in a deep analysis of both quantitative and qualitative data. It was a joy to create, blending rigorous analysis with a personal dream of a futuristic, utopian, and resilient Pacific future.
              </p>
            </div>
          </div>
        </div>

        {/* Creator Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Creator</h2>
          <h3 className="text-3xl font-semibold text-white mb-4">Eunice Rigo</h3>
          <p className="text-xl text-white/80 mb-6 italic">Project Lead, Data Analysis, Design, Development & Sonification</p>
          <div className="space-y-6 text-lg text-white/90 leading-relaxed">
            <p>
              Eunice is a creative data analyst with a Master's degree in Computer Science and six years of experience supporting programs through accessible, impact-driven reporting. Her work includes data infrastructure design, dashboard development, and automating workflows to improve how organisations collect, understand, and act on their knowledge and information. She strategically leverages AI and machine learning methods to interrogate complex datasets, enhance pattern detection, and support more adaptive, insight-led decision-making across teams.
            </p>
            <p>
              Born and raised in New Caledonia, Eunice grew up surrounded by the rich cultures of the Pacific. Acknowledging there is much to learn in this field, she is particularly interested in adapting how we approach data to better honor the diverse knowledge systems of Indigenous communities.
            </p>
            <p>
              She is particularly interested in exploring creative forms of visualisation that support more intuitive, artistic, and inclusive ways of making sense of information, offering alternative ways of engaging with complex data.
            </p>
          </div>
        </div>

        {/* Primary Sources Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Primary Sources & Inspiration</h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            This project stands on the shoulders of giants. It was made possible by referencing the foundational data, strategic frameworks, and creative works listed below.
          </p>

          <div className="space-y-8">
            {/* Key Strategic Sources */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Key Strategic Sources</h3>
              <div className="ml-4 space-y-4 text-white/90">
                <div>
                  <p className="font-medium">Blue Pacific 2050 Strategy</p>
                  <p className="text-white/70">https://blue-pacific-2050.pacificdata.org</p>
                </div>
                <div>
                  <p className="font-medium">Pacific Data Hub</p>
                  <p className="text-white/70">https://pacificdata.org</p>
                </div>
                <div>
                  <p className="font-medium">Sea-Level & Flooding: NASA Sea Level Change Team</p>
                  <p className="text-white/70">https://sealevel.nasa.gov</p>
                </div>
                <div>
                  <p className="font-medium">Displacement & Climate Frameworks: UNFCCC</p>
                  <p className="text-white/70">https://unfccc.int</p>
                </div>
                <div>
                  <p className="font-medium">Fiji Government energy policy (100% renewables by 2030 target)</p>
                </div>
                <div>
                  <p className="font-medium">The Paris Agreement (UNFCCC)</p>
                  <p className="text-white/70">https://unfccc.int/process-and-meetings/the-paris-agreement</p>
                </div>
                <div>
                  <p className="font-medium">IPCC Special Report on Global Warming of 1.5°C</p>
                  <p className="text-white/70">https://www.ipcc.ch/sr15/</p>
                </div>
                <div>
                  <p className="font-medium">United Nations Sustainable Development Goal 13: Climate Action</p>
                  <p className="text-white/70">https://www.un.org/sustainabledevelopment/climate-action/</p>
                </div>
                <div>
                  <p className="font-medium">NOAA Coral Reef Watch</p>
                  <p className="text-white/70">https://coralreefwatch.noaa.gov</p>
                </div>
                <div>
                  <p className="font-medium">The World Bank Climate Change Knowledge Portal</p>
                  <p className="text-white/70">https://climateknowledgeportal.worldbank.org</p>
                </div>
                <div>
                  <p className="font-medium">Secretariat of the Pacific Regional Environment Programme (SPREP)</p>
                  <p className="text-white/70">https://www.sprep.org</p>
                </div>
                <div>
                  <p className="font-medium">The Pacific Community (SPC) - Climate Change & Environmental Sustainability</p>
                  <p className="text-white/70">https://www.spc.int/cces</p>
                </div>
                <div>
                  <p className="font-medium">Tide Data Reference: Suva Harbor, Fiji</p>
                  <p className="text-white/70">https://www.tide-forecast.com/locations/Suva-Harbor-Fiji-Islands/tides/latest</p>
                </div>
                <div>
                  <p className="font-medium">Inspirational Game Design: Daybreak</p>
                  <p className="text-white/70">https://www.daybreakgame.com</p>
                </div>
                <div>
                  <p className="font-medium">Utopian Future Concept: Solarpunk</p>
                  <p className="text-white/70">https://solarpunkcity.org/solarpunk-project-ideas/</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Framework & Data */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Game Framework & Data</h2>
          <div className="ml-4 space-y-4 text-lg text-white/90">
            <p><strong className="text-white">Core Game Logic & Content:</strong> ANSWERSMAPPING.6.json – Contains the game's questions, answers, narrative outcomes, and the thematic point scoring system.</p>
            <p><strong className="text-white">Sea-Level Rise Data:</strong> sea-level-data.csv – Provides the raw data for the sea-level rise projection chart, based on IPCC scenarios.</p>
            <p><strong className="text-white">Thematic Outcome Text:</strong> SpiderMap.json – Contains the descriptive text for the Low, Medium, High, and Level of Ambition outcomes for each of the seven themes.</p>
          </div>
        </div>

        {/* Sound & Audio Sources */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Sound & Audio Sources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Tide Sonification Logic:</h3>
              <p className="ml-4 text-white/90">Suva Harbor tide data reference</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">2050 Ocean Audio Tracks (created by Eunice Rigo):</h3>
              <div className="ml-4 space-y-2 text-white/90">
                <p>Scenario 0 (Baseline) Tide Sonification</p>
                <p>Scenario 1 (1.5°C) Tide Sonification</p>
                <p>Scenario 2 (3.0°C) Tide Sonification</p>
                <p>Scenario 3 (5.0°C) Tide Sonification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artistic Inspiration */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Artistic Inspiration</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            The visual aesthetic of the futuristic illustrations is inspired by the pointillist style of French Neo-Impressionist painter Henri-Edmond Cross, re-imagining a vibrant, "Solarpunk" future for the Pacific.
          </p>
        </div>

        {/* Special Thanks */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">Special Thanks</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            We extend our sincere gratitude to the Pacific Islands Forum Secretariat for their comprehensive and forward-thinking strategic work, which forms the intellectual and spiritual backbone of this project.
          </p>
        </div>

        {/* Navigation Footer */}
        <div className="text-center">
          <Button onClick={() => navigate('/')} variant="pacific" size="pacific">
            RESTART THE JOURNEY
          </Button>
        </div>
      </div>
    </div>
  );
}