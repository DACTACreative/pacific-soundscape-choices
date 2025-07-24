import { Link } from 'react-router-dom';
import { useState } from 'react';
import SeaLevelVisualization from '../components/SeaLevelVisualization';
import AnnualFloodDaysVisualization from '../components/AnnualFloodDaysVisualization';
import { InteractiveFloodSentence } from '../components/InteractiveFloodSentence';

export default function Scenario3() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const narrative = {
    title: "Crisis Trajectory · Low Resilience",
    subtitle: "When the ocean reclaims its own",
    content: [
      "By 2050, the world crossed thresholds no one wanted to cross. Global temperatures rose beyond 2.5°C, and the Pacific Ocean became a different sea entirely — angrier, hungrier, relentless in its reach toward land that had been dry for centuries.",
      "Fiji's coral reefs collapsed in cascading bleaching events that turned underwater gardens into graveyards. Tourism died with the reefs. Fishing became a memory as acidified waters drove away the fish that remained. The old economy vanished beneath the waves.",
      "Entire communities vanished too. Not in sudden catastrophes, but in slow surrenders — a flood here, a storm there, until home became uninhabitable. Twenty-five communities joined the growing ranks of climate refugees, carrying what they could to higher ground, or to other nations willing to take them.",
      "The airports flood regularly now. Ports close for weeks at a time. Supply chains snap like overstretched rope. What infrastructure remains operates on borrowed time, patched and re-patched until the next king tide washes away another piece of the past.",
      "This is not the end of the world — but it is the end of the world as Fiji knew it. Survival becomes innovation, necessity becomes wisdom, and from the wreckage of old systems, something new must grow."
    ]
  };

  const metrics = [
    {
      id: 'sea_level',
      title: 'Sea Level Rise',
      value: '27cm',
      description: 'Critical coastal infrastructure permanently underwater',
      csvFile: 'sea_level_scenario3.csv',
      rScript: 'visualize_sea_level.R'
    },
    {
      id: 'coral',
      title: 'Coral Health',
      value: '80% loss',
      description: 'Widespread ecosystem collapse, few recovery prospects',
      csvFile: 'coral_health_scenario3.csv',
      rScript: 'visualize_coral.R'
    },
    {
      id: 'displacement',
      title: 'Population Displacement',
      value: '25 communities',
      description: 'Mass relocation, regional refugee crisis, social strain',
      csvFile: 'displacement_scenario3.csv',
      rScript: 'visualize_displacement.R'
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      value: '35%',
      description: 'Limited progress, infrastructure repeatedly damaged by storms',
      csvFile: 'energy_scenario3.csv',
      rScript: 'visualize_energy.R'
    },
    {
      id: 'fisheries',
      title: 'Fish Catch',
      value: '-65%',
      description: 'Ecosystem collapse devastates traditional fishing communities',
      csvFile: 'fisheries_scenario3.csv',
      rScript: 'visualize_fisheries.R'
    },
    {
      id: 'flooding',
      title: 'Coastal Flooding',
      value: '40 days/year',
      description: 'Frequent flooding makes coastal areas uninhabitable',
      csvFile: 'flooding_scenario3.csv',
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
            Scenario Three
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-coral-urgent to-transparent mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-light tracking-wide text-coral-urgent mb-4">
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
              Critical coastal infrastructure permanently underwater
            </p>
            <div className="w-full">
              <SeaLevelVisualization scenario="tlim5.0win0.25" />
            </div>
          </div>
        </div>

        {/* Flooding Days Visualization */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="max-w-full mx-auto">
            <AnnualFloodDaysVisualization currentScenario="5.0 °C warming" />
          </div>
        </div>

        {/* Interactive Flood Sentence */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.75s' }}>
          <div className="max-w-4xl mx-auto">
            <InteractiveFloodSentence scenario="5.0 °C warming" />
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
                          hover:border-coral-urgent/40 transition-all duration-700 ease-out cursor-pointer
                          animate-fade-in ${selectedMetric === metric.id ? 'border-coral-urgent/60 bg-coral-urgent/5' : ''}`}
                style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <div className="text-center">
                  <h3 className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-3">
                    {metric.title}
                  </h3>
                  <div className="text-3xl font-light text-coral-urgent mb-4">
                    {metric.value}
                  </div>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Interactive Visualization */}
                  {selectedMetric === metric.id && (
                    <div className="mt-6 p-6 border border-coral-urgent/20 bg-coral-urgent/5">
                      <div>
                        <p className="text-xs text-coral-urgent/80 font-extralight mb-2 uppercase tracking-wider">
                          Data Visualization
                        </p>
                        <div className="text-xs text-card-foreground/60 space-y-1 mb-4">
                          <div>CSV: {metric.csvFile}</div>
                          <div>Analysis: {metric.rScript}</div>
                        </div>
                        <div className="h-32 bg-coral-urgent/10 border border-coral-urgent/20 flex items-center justify-center">
                          <span className="text-coral-urgent/60 text-sm font-extralight">
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
            to="/scenario-2"
            className="text-coral-warm/60 hover:text-coral-warm font-extralight tracking-wider text-sm uppercase transition-colors duration-500"
          >
            ← Scenario Two
          </Link>
        </div>
      </div>
    </div>
  );
}