import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CreditsPage() {
  const navigate = useNavigate();
  
  return (
    <div className="text-white min-h-screen bg-black">
      <div className="container mx-auto px-8 py-16 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Credits & Acknowledgements
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            This experience was created as part of the Pacific Data Visualization Challenge, 
            with deep respect for Pacific communities, knowledge systems, and the urgent 
            need for climate resilience building and mitigation in our region.
          </p>
        </div>

        {/* Our Goal Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Goal</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            To center Pacific voices in climate conversations and make complex data emotionally resonant through immersive storytelling.
          </p>
        </div>

        {/* Our Approach Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Approach</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Combining authentic Pacific soundscapes, rigorous data, and interactive narratives to create meaningful engagement with climate futures.
          </p>
        </div>

        {/* Our Hope Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Our Hope</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            That this experience sparks deeper connection to our shared Pacific future and inspires action toward resilience and sustainability.
          </p>
        </div>

        {/* Creator Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Creator</h2>
          <h3 className="text-2xl font-semibold text-white mb-4">Eunice Rigo</h3>
          <p className="text-lg text-white/80 mb-4 italic">Project Lead, Data Analysis, Design, Development & Sonification</p>
          <div className="space-y-4 text-white/90 leading-relaxed">
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
          <h2 className="text-3xl font-bold text-white mb-8">Primary Sources & Inspiration</h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            This project stands on the shoulders of giants. It was made possible by referencing the foundational data, strategic frameworks, and creative works listed below.
          </p>

          {/* Strategy Framework */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Strategy Framework Alignment</h3>
            <div className="ml-4 space-y-2">
              <p className="text-white/90">Blue Pacific 2050 Strategy & Dashboard</p>
              <p className="text-white/90">Strategy Site</p>
              <p className="text-white/90">Indicator Dashboard</p>
            </div>
          </div>

          {/* Climate & Environmental Data */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Climate & Environmental Data</h3>
            <div className="ml-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Sea-Level Rise</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>NASA Sea Level Change Team – Projections for Pacific Islands</p>
                  <p>Pacific Climate Change Science Program (Australia)</p>
                  <p>RCCAP Fiji Climate Summary</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Coastal Flooding</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>NASA projections for Tuvalu and analog islands</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Coral Reef Bleaching</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>IPCC Special Report on 1.5°C</p>
                  <p>Reef Resilience Network</p>
                  <p>Coral Guardian</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Fisheries & Ocean Resources</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>FAO – Future catches from coastal fisheries</p>
                  <p>University of Wollongong – Fish stock decline projections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact & Displacement */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Social Impact & Displacement</h3>
            <div className="ml-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Village Relocation & Displacement</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>Fiji Government Planned Relocation Guidelines</p>
                  <p>UNFCCC – Fiji climate migration studies</p>
                  <p>FM Review – Pacific Mobilities</p>
                  <p>Berkeley Belonging Institute – Fiji Climate Displacement Case</p>
                </div>
              </div>
            </div>
          </div>

          {/* Economic Impact & Infrastructure Risk */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Economic Impact & Infrastructure Risk</h3>
            <div className="ml-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">GDP Loss</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>IMF Climate Risk & GDP Report (2025)</p>
                  <p>World Bank / GFDRR – Pacific disaster and resilience costs</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Infrastructure at Risk</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>Merschroth et al. (2020) – Buildings inundated by 2050</p>
                  <p>PreventionWeb – Pacific urban infrastructure exposure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Energy & Mitigation Pathways */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Energy & Mitigation Pathways</h3>
            <div className="ml-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Energy Mix & Renewables</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>Energypedia – Fiji energy mix and targets</p>
                  <p>Fiji Government Energy Roadmap (100% renewable by 2030 target)</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Emissions Scenarios & Global Warming</h4>
                <div className="ml-4 space-y-1 text-white/90">
                  <p>IPCC 1.5°C / 2.5°C / 4°C trajectory baselines used in model</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Framework & Data */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Game Framework & Data</h3>
            <div className="ml-4 space-y-1 text-white/90">
              <p><strong>Core Game Logic & Content:</strong> ANSWERSMAPPING.6.json – Contains the game's questions, answers, narrative outcomes, and the thematic point scoring system.</p>
              <p><strong>Sea-Level Rise Data:</strong> sea-level-data.csv – Provides the raw data for the sea-level rise projection chart, based on IPCC scenarios.</p>
              <p><strong>Thematic Outcome Text:</strong> SpiderMap.json – Contains the descriptive text for the Low, Medium, High, and Level of Ambition outcomes for each of the seven themes.</p>
            </div>
          </div>

          {/* Sound & Audio Sources */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Sound & Audio Sources</h3>
            <div className="ml-4 space-y-2 text-white/90">
              <p><strong>Tide Sonification Logic:</strong></p>
              <p className="ml-4">Suva Harbor tide data reference</p>
              <p><strong>2050 Ocean Audio Tracks (created by Eunice Rigo):</strong></p>
              <div className="ml-4 space-y-1">
                <p>Scenario 0 (Baseline) Tide Sonification</p>
                <p>Scenario 1 (1.5°C) Tide Sonification</p>
                <p>Scenario 2 (3.0°C) Tide Sonification</p>
                <p>Scenario 3 (5.0°C) Tide Sonification</p>
              </div>
            </div>
          </div>

          {/* Artistic Inspiration */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Artistic Inspiration</h3>
            <p className="ml-4 text-white/90">
              The visual aesthetic of the futuristic illustrations is inspired by the pointillist style of French Neo-Impressionist painter Henri-Edmond Cross, re-imagining a vibrant, "Solarpunk" future for the Pacific.
            </p>
          </div>

          {/* Special Thanks */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-white mb-4">Special Thanks</h3>
            <p className="ml-4 text-white/90">
              We extend our sincere gratitude to the Pacific Islands Forum Secretariat for their comprehensive and forward-thinking strategic work, which forms the intellectual and spiritual backbone of this project.
            </p>
          </div>
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