import { Link } from 'react-router-dom';
import { useState } from 'react';
import SeaLevelVisualization from '../components/SeaLevelVisualization';
import AnnualFloodDaysVisualization from '../components/AnnualFloodDaysVisualization';
import { InteractiveFloodSentence } from '../components/InteractiveFloodSentence';

export default function Scenario2() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const narrative = {
    title: "Moderate Change · Mixed Resilience",
    subtitle: "The path of compromise and difficult choices",
    content: [
      "2050 arrives in Fiji with the weight of unfinished business. Global efforts to halt climate change succeeded partially — the world warmed by 2°C, not the catastrophic 3°C many feared, yet not the 1.5°C scientists demanded.",
      "The results are written in rising tides and struggling reefs. Half of Fiji's corals have bleached beyond recovery, their ancient colors fading to ghostly white. Coastal flooding happens not once or twice a year, but monthly — predictable now, manageable with the right preparation.",
      "Communities learned to adapt, some better than others. Those who invested early in resilience thrive in elevated villages with renewable power and water security. Others face harder choices: rebuild again, or join the growing migration inland.",
      "Fishing boats return with smaller catches, but aquaculture farms fill the gap. Tourism evolved — visitors come not just for pristine beaches, but to witness resilience in action. The Pacific voice grew stronger through struggle, demanding more from the world while doing what it could with less.",
      "This is a future of survival, of making do, of human ingenuity tested against nature's patience. It is neither paradise nor catastrophe — it is the complex reality of a world that acted, but not soon enough."
    ]
  };

  const metrics = [
    {
      id: 'sea_level',
      title: 'Sea Level Rise',
      value: '23cm',
      description: 'Noticeable coastal impacts, managed through adaptation measures',
      csvFile: 'sea_level_scenario2.csv',
      rScript: 'visualize_sea_level.R'
    },
    {
      id: 'coral',
      title: 'Coral Health',
      value: '50% loss',
      description: 'Significant bleaching with some recovery in protected areas',
      csvFile: 'coral_health_scenario2.csv',
      rScript: 'visualize_coral.R'
    },
    {
      id: 'displacement',
      title: 'Population Displacement',
      value: '12 communities',
      description: 'Mix of planned and emergency relocations, regional support needed',
      csvFile: 'displacement_scenario2.csv',
      rScript: 'visualize_displacement.R'
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      value: '60%',
      description: 'Significant progress but fossil fuels still part of the energy mix',
      csvFile: 'energy_scenario2.csv',
      rScript: 'visualize_energy.R'
    },
    {
      id: 'fisheries',
      title: 'Fish Catch',
      value: '-35%',
      description: 'Ocean changes impact traditional fishing, aquaculture expands',
      csvFile: 'fisheries_scenario2.csv',
      rScript: 'visualize_fisheries.R'
    },
    {
      id: 'flooding',
      title: 'Coastal Flooding',
      value: '15 days/year',
      description: 'Regular flooding events require ongoing adaptation measures',
      csvFile: 'flooding_scenario2.csv',
      rScript: 'visualize_flooding.R'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-ocean relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/95 to-ocean-deep" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <div className="mb-12 animate-fade-in">
          <Link 
            to="/"
            className="text-wave-foam/60 hover:text-wave-foam font-extralight tracking-wider text-sm uppercase transition-colors duration-500"
          >
            ← return to journey
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-wide text-wave-foam mb-6">
            Scenario Two
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-coral-warm to-transparent mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light tracking-wide text-coral-warm mb-4">
            {narrative.title}
          </p>
          <p className="text-lg text-card-foreground/70 font-light">
            {narrative.subtitle}
          </p>
        </div>

        {/* Narrative */}
        <div className="mb-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto space-y-8">
            {narrative.content.map((paragraph, index) => (
              <p 
                key={index}
                className="text-xl md:text-2xl font-light text-card-foreground/90 leading-relaxed animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sea Level Rise Visualization */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-full mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-4 text-center tracking-wide">
              Sea Level Rise Projections · 2050
            </h2>
            <p className="text-center text-card-foreground/60 mb-8 font-light">
              Moderate adaptation efforts struggle with accelerating changes
            </p>
            <div className="w-full">
              <SeaLevelVisualization scenario="tlim3.0win0.25" />
            </div>
          </div>
        </div>

        {/* Flooding Days Visualization */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="max-w-full mx-auto">
            <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-4 text-center tracking-wide">
              Coastal Flooding Projections · 2050
            </h2>
            <p className="text-center text-card-foreground/60 mb-8 font-light">
              Annual flooding events increase with rising seas
            </p>
            <div className="w-full">
              <AnnualFloodDaysVisualization currentScenario="3.0 °C warming" />
            </div>
          </div>
        </div>

        {/* Interactive Flood Sentence */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.75s' }}>
          <div className="max-w-4xl mx-auto">
            <InteractiveFloodSentence scenario="3.0 °C warming" />
          </div>
        </div>

        {/* Other Metrics Grid */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-12 text-center tracking-wide">
            Other Key Indicators · 2050
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.filter(m => m.id !== 'sea_level' && m.id !== 'flooding').map((metric, index) => (
              <div 
                key={metric.id}
                className={`p-8 border border-ocean-light/20 bg-transparent backdrop-blur-sm
                          hover:border-coral-warm/40 transition-all duration-700 ease-out cursor-pointer
                          animate-fade-in ${selectedMetric === metric.id ? 'border-coral-warm/60 bg-coral-warm/5' : ''}`}
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <div className="text-center">
                  <h3 className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-3">
                    {metric.title}
                  </h3>
                  <div className="text-3xl font-light text-coral-warm mb-4">
                    {metric.value}
                  </div>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Interactive Visualization */}
                  {selectedMetric === metric.id && (
                    <div className="mt-6 p-6 border border-coral-warm/20 bg-coral-warm/5">
                      <div>
                        <p className="text-xs text-coral-warm/80 font-extralight mb-2 uppercase tracking-wider">
                          Data Visualization
                        </p>
                        <div className="text-xs text-card-foreground/60 space-y-1 mb-4">
                          <div>CSV: {metric.csvFile}</div>
                          <div>Analysis: {metric.rScript}</div>
                        </div>
                        <div className="h-32 bg-coral-warm/10 border border-coral-warm/20 flex items-center justify-center">
                          <span className="text-coral-warm/60 text-sm font-extralight">
                            {metric.title} visualization will render here
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-extralight text-coral-warm/80 mb-6 tracking-wide uppercase">
              Data Sources & Methodology
            </h3>
            <div className="text-sm text-card-foreground/60 leading-relaxed space-y-2">
              <p>Climate projections: IPCC AR6 Regional Atlas, Pacific Climate Science Program</p>
              <p>Sea level data: NASA Sea Level Change Team, Australian Bureau of Meteorology</p>
              <p>Coral projections: NOAA Coral Reef Watch, Pacific Regional Coral Studies</p>
              <p>Socioeconomic indicators: Fiji Climate Ministry, Pacific Data Hub, World Bank</p>
            </div>
          </div>
        </div>

        {/* Navigation to other scenarios */}
        <div className="mt-20 text-center space-x-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Link 
            to="/scenario-1"
            className="text-accent/60 hover:text-accent font-extralight tracking-wider text-sm uppercase transition-colors duration-500"
          >
            ← Scenario One
          </Link>
          <Link 
            to="/scenario-3"
            className="text-coral-urgent/60 hover:text-coral-urgent font-extralight tracking-wider text-sm uppercase transition-colors duration-500"
          >
            Scenario Three →
          </Link>
        </div>
      </div>
    </div>
  );
}