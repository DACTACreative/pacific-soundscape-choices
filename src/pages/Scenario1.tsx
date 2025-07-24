import { Link } from 'react-router-dom';
import { useState } from 'react';
import SeaLevelVisualization from '../components/SeaLevelVisualization';
import AnnualFloodDaysVisualization from '../components/AnnualFloodDaysVisualization';

export default function Scenario1() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const narrative = {
    title: "Sustainable Path · High Resilience",
    subtitle: "A future where wisdom guided our choices",
    content: [
      "By 2050, the Pacific Ocean breathes differently. Not with the labored gasps of a dying sea, but with the steady rhythm of renewal. The choices made in the 2020s — difficult, sometimes painful, always necessary — have borne fruit.",
      "Fiji's coral reefs, though changed, persist. Marine protected areas established decades ago now serve as nurseries for recovering ecosystems. The sea has risen, yes, but communities relocated with dignity to higher ground call their new homes blessings, not exile.",
      "Renewable energy flows like the trade winds themselves — constant, reliable, clean. Solar panels glint on every rooftop, and wind turbines turn lazily in the ocean breeze. The old fossil fuel infrastructure rusts peacefully, monuments to a carbon-heavy past.",
      "Children learn to swim in cleaner waters. Fishers return with catches that, while different from their grandparents' time, still feed families and communities. The Pacific voice rings strong in international forums, no longer pleading but leading.",
      "This is not paradise regained — it is something more precious: a future earned through foresight, sacrifice, and solidarity."
    ]
  };

  const metrics = [
    {
      id: 'sea_level',
      title: 'Sea Level Rise',
      value: '20cm',
      description: 'Managed through early warning systems and nature-based solutions',
      csvFile: 'sea_level_scenario1.csv',
      rScript: 'visualize_sea_level.R'
    },
    {
      id: 'coral',
      title: 'Coral Health',
      value: '20% loss',
      description: 'Protected areas and restoration efforts limit damage',
      csvFile: 'coral_health_scenario1.csv',
      rScript: 'visualize_coral.R'
    },
    {
      id: 'displacement',
      title: 'Population Displacement',
      value: '5 communities',
      description: 'Planned relocation with community support and new infrastructure',
      csvFile: 'displacement_scenario1.csv',
      rScript: 'visualize_displacement.R'
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      value: '85%',
      description: 'Solar and wind dominate energy mix, fossil fuel phase-out complete',
      csvFile: 'energy_scenario1.csv',
      rScript: 'visualize_energy.R'
    },
    {
      id: 'fisheries',
      title: 'Fish Catch',
      value: '-10%',
      description: 'Sustainable fishing practices maintain stable yields despite ocean changes',
      csvFile: 'fisheries_scenario1.csv',
      rScript: 'visualize_fisheries.R'
    },
    {
      id: 'flooding',
      title: 'Coastal Flooding',
      value: '5 days/year',
      description: 'Green infrastructure and early warning systems minimize impact',
      csvFile: 'flooding_scenario1.csv',
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
            Scenario One
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light tracking-wide text-accent mb-4">
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
              Managed through early warning systems and nature-based solutions
            </p>
            <div className="w-full">
              <SeaLevelVisualization scenario="tlim1.5win0.25" />
            </div>
          </div>
        </div>

        {/* Flooding Days Visualization */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="max-w-full mx-auto">
            <AnnualFloodDaysVisualization currentScenario="1.5 °C warming" />
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
                          hover:border-accent/40 transition-all duration-700 ease-out cursor-pointer
                          animate-fade-in ${selectedMetric === metric.id ? 'border-accent/60 bg-accent/5' : ''}`}
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <div className="text-center">
                  <h3 className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-3">
                    {metric.title}
                  </h3>
                  <div className="text-3xl font-light text-accent mb-4">
                    {metric.value}
                  </div>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Interactive Visualization */}
                  {selectedMetric === metric.id && (
                    <div className="mt-6 p-6 border border-accent/20 bg-accent/5">
                      <div>
                        <p className="text-xs text-accent/80 font-extralight mb-2 uppercase tracking-wider">
                          Data Visualization
                        </p>
                        <div className="text-xs text-card-foreground/60 space-y-1 mb-4">
                          <div>CSV: {metric.csvFile}</div>
                          <div>Analysis: {metric.rScript}</div>
                        </div>
                        <div className="h-32 bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <span className="text-accent/60 text-sm font-extralight">
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
            to="/scenario-2"
            className="text-coral-warm/60 hover:text-coral-warm font-extralight tracking-wider text-sm uppercase transition-colors duration-500"
          >
            Scenario Two →
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