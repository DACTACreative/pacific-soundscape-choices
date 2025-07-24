import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import outcomesData from '@/data/outcomes.json';
import dashboardData from '@/data/dashboard.json';

interface ResultScreenProps {
  mitigationScore: number;
  resilienceScore: number;
  onReplay: () => void;
}

interface MetricInfo {
  label: string;
  value: string | number;
  icon: string;
  severity: 'low' | 'medium' | 'high';
}

export default function ResultScreen({ mitigationScore, resilienceScore, onReplay }: ResultScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Determine scenario based on mitigation score
  const getScenario = (): 'low' | 'medium' | 'high' => {
    if (mitigationScore >= 4) return 'low';      // Strong mitigation -> low emissions
    if (mitigationScore <= -4) return 'high';    // Weak mitigation -> high emissions
    return 'medium';                             // In-between -> medium emissions
  };

  // Determine resilience variant
  const getResilienceVariant = (): 'highRes' | 'lowRes' => {
    return resilienceScore > 0 ? 'highRes' : 'lowRes';
  };

  const scenario = getScenario();
  const resilienceVariant = getResilienceVariant();
  const outcomeKey = `${scenario}_${resilienceVariant}` as keyof typeof outcomesData;
  
  const narrative = outcomesData[outcomeKey] || "Outcome narrative not found.";
  const metrics = dashboardData[scenario as keyof typeof dashboardData];

  // Format metrics with additional context
  const formatMetrics = (): MetricInfo[] => {
    if (!metrics) return [];

    const metricDefinitions = [
      {
        key: 'sea_level_rise_cm',
        label: 'Sea Level Rise',
        unit: 'cm',
        icon: '▲',
        getSeverity: (val: number) => val < 20 ? 'low' : val < 30 ? 'medium' : 'high'
      },
      {
        key: 'coral_loss_pct',
        label: 'Coral Reef Loss',
        unit: '%',
        icon: '◯',
        getSeverity: (val: number) => val < 30 ? 'low' : val < 60 ? 'medium' : 'high'
      },
      {
        key: 'flood_days_per_year',
        label: 'Coastal Flood Days/Year',
        unit: ' days',
        icon: '◢',
        getSeverity: (val: number) => val < 10 ? 'low' : val < 25 ? 'medium' : 'high'
      },
      {
        key: 'displaced_communities',
        label: 'Communities Displaced',
        unit: '',
        icon: '◇',
        getSeverity: (val: number) => val < 5 ? 'low' : val < 15 ? 'medium' : 'high'
      },
      {
        key: 'fish_catch_change_pct',
        label: 'Fish Catch Change',
        unit: '%',
        icon: '≈',
        getSeverity: (val: number) => Math.abs(val) < 25 ? 'low' : Math.abs(val) < 50 ? 'medium' : 'high'
      },
      {
        key: 'renewables_pct',
        label: 'Renewable Energy',
        unit: '%',
        icon: '◆',
        getSeverity: (val: number) => val > 70 ? 'low' : val > 50 ? 'medium' : 'high',
        isPositive: true
      }
    ];

    return metricDefinitions.map(def => ({
      label: def.label,
      value: `${metrics[def.key as keyof typeof metrics]}${def.unit}`,
      icon: def.icon,
      severity: def.getSeverity(metrics[def.key as keyof typeof metrics] as number) as 'low' | 'medium' | 'high'
    }));
  };

  const formattedMetrics = formatMetrics();

  const getScenarioColor = () => {
    switch (scenario) {
      case 'low': return 'text-accent';
      case 'medium': return 'text-coral-warm';
      case 'high': return 'text-coral-urgent';
      default: return 'text-foreground';
    }
  };

  const getScenarioTitle = () => {
    const emissionLevel = scenario === 'low' ? 'Sustainable Path' : scenario === 'medium' ? 'Moderate Change' : 'Crisis Trajectory';
    const resilienceLevel = resilienceVariant === 'highRes' ? 'High Resilience' : 'Low Resilience';
    return `${emissionLevel} · ${resilienceLevel}`;
  };

  const getScenarioNumber = () => {
    if (scenario === 'low') return 1;
    if (scenario === 'medium') return 2;
    return 3;
  };

  return (
    <div className="min-h-screen bg-gradient-ocean relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-deep/95 to-ocean-deep" />
      
      {/* Content */}
      <div className={`relative z-10 max-w-5xl mx-auto px-6 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-wide text-wave-foam mb-6">
            2050
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-coral-warm to-transparent mx-auto mb-8" />
          <p className={`text-2xl md:text-3xl font-light tracking-wide ${getScenarioColor()}`}>
            {getScenarioTitle()}
          </p>
        </div>

        {/* Narrative */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-light text-card-foreground/90 leading-relaxed text-center">
              {narrative}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl font-extralight text-coral-warm mb-12 text-center tracking-wide">
            Key Indicators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formattedMetrics.map((metric, index) => (
              <div 
                key={metric.label}
                className={`p-8 border border-ocean-light/20 bg-transparent backdrop-blur-sm
                          hover:border-coral-warm/40 transition-all duration-700 ease-out
                          animate-fade-in`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-3xl text-coral-warm/80 mb-4 font-extralight">{metric.icon}</div>
                  <p className="text-sm text-wave-foam/60 font-extralight tracking-wider uppercase mb-2">
                    {metric.label}
                  </p>
                  <p className={`text-2xl font-light
                    ${metric.severity === 'low' ? 'text-accent' :
                      metric.severity === 'medium' ? 'text-coral-warm' :
                      'text-coral-urgent'}`}>
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links to detailed scenarios */}
        <div className="mb-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-lg text-card-foreground/70 mb-8 font-light">
            Explore the complete narrative and data visualizations
          </p>
          
          <Link 
            to={`/scenario-${getScenarioNumber()}`}
            className="group relative inline-block px-12 py-4 text-lg font-extralight tracking-[0.2em] text-wave-foam/70 
                       border border-ocean-light/30 bg-transparent backdrop-blur-sm
                       hover:text-wave-foam hover:border-coral-warm/50 
                       transition-all duration-1000 ease-out uppercase
                       before:absolute before:inset-0 before:border before:border-coral-warm/20 
                       before:scale-95 before:opacity-0 before:transition-all before:duration-700
                       hover:before:scale-100 hover:before:opacity-100"
          >
            <span className="relative z-10">view full scenario</span>
          </Link>
        </div>

        {/* Actions */}
        <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <button
            onClick={onReplay}
            className="group relative px-16 py-5 text-lg font-extralight tracking-[0.3em] text-coral-warm/70 
                       border border-coral-warm/30 bg-transparent backdrop-blur-sm
                       hover:text-coral-warm hover:border-coral-warm/50 
                       transition-all duration-1000 ease-out uppercase
                       before:absolute before:inset-0 before:border before:border-coral-warm/20 
                       before:scale-95 before:opacity-0 before:transition-all before:duration-700
                       hover:before:scale-100 hover:before:opacity-100"
          >
            <span className="relative z-10">try different choices</span>
          </button>
          
          <div className="text-xs text-wave-foam/30 font-extralight tracking-widest">
            each decision shapes the future
          </div>
        </div>

        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 text-center text-xs text-wave-foam/30 font-extralight tracking-wider">
            Final Scores - Mitigation: {mitigationScore} | Resilience: {resilienceScore}
          </div>
        )}
      </div>
    </div>
  );
}