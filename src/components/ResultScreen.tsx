import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
        icon: '🌊',
        getSeverity: (val: number) => val < 20 ? 'low' : val < 30 ? 'medium' : 'high'
      },
      {
        key: 'coral_loss_pct',
        label: 'Coral Reef Loss',
        unit: '%',
        icon: '🪸',
        getSeverity: (val: number) => val < 30 ? 'low' : val < 60 ? 'medium' : 'high'
      },
      {
        key: 'flood_days_per_year',
        label: 'Coastal Flood Days/Year',
        unit: ' days',
        icon: '🌀',
        getSeverity: (val: number) => val < 10 ? 'low' : val < 25 ? 'medium' : 'high'
      },
      {
        key: 'displaced_communities',
        label: 'Communities Displaced',
        unit: '',
        icon: '🏘️',
        getSeverity: (val: number) => val < 5 ? 'low' : val < 15 ? 'medium' : 'high'
      },
      {
        key: 'fish_catch_change_pct',
        label: 'Fish Catch Change',
        unit: '%',
        icon: '🐟',
        getSeverity: (val: number) => Math.abs(val) < 25 ? 'low' : Math.abs(val) < 50 ? 'medium' : 'high'
      },
      {
        key: 'renewables_pct',
        label: 'Renewable Energy',
        unit: '%',
        icon: '⚡',
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
    const emissionLevel = scenario === 'low' ? 'Low Emissions' : scenario === 'medium' ? 'Medium Emissions' : 'High Emissions';
    const resilienceLevel = resilienceVariant === 'highRes' ? 'High Resilience' : 'Low Resilience';
    return `${emissionLevel}, ${resilienceLevel}`;
  };

  return (
    <div className="min-h-screen bg-gradient-ocean p-4">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-wave-foam mb-2">
            Your 2050 Scenario
          </h1>
          <p className={`text-xl font-semibold ${getScenarioColor()}`}>
            {getScenarioTitle()}
          </p>
        </div>

        {/* Narrative */}
        <Card className="mb-8 p-8 bg-card/10 backdrop-blur-md border-ocean-light/30 shadow-deep animate-bubble-up">
          <div className="prose prose-lg max-w-none">
            <p className="text-card-foreground leading-relaxed text-lg">
              {narrative}
            </p>
          </div>
        </Card>

        {/* Metrics Dashboard */}
        <Card className="mb-8 p-8 bg-card/10 backdrop-blur-md border-ocean-light/30 shadow-deep animate-bubble-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-coral-warm mb-6 text-center">
            2050 Key Indicators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formattedMetrics.map((metric, index) => (
              <div 
                key={metric.label}
                className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 animate-fade-in
                  ${metric.severity === 'low' ? 'bg-accent/10 border-accent/30' :
                    metric.severity === 'medium' ? 'bg-coral-warm/10 border-coral-warm/30' :
                    'bg-coral-urgent/10 border-coral-urgent/30'}`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{metric.icon}</span>
                  <div>
                    <p className="text-sm text-wave-foam/80 font-medium">{metric.label}</p>
                    <p className={`text-lg font-bold
                      ${metric.severity === 'low' ? 'text-accent' :
                        metric.severity === 'medium' ? 'text-coral-warm' :
                        'text-coral-urgent'}`}>
                      {metric.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4 animate-bubble-up" style={{ animationDelay: '600ms' }}>
          <Button
            variant="coral"
            size="hero"
            onClick={onReplay}
            className="mx-auto"
          >
            🔄 Try Different Choices
          </Button>
          
          <p className="text-sm text-wave-foam/60">
            Each decision matters. Explore how different choices shape the future.
          </p>
        </div>

        {/* Score display for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-center text-xs text-wave-foam/40">
            Final Scores - Mitigation: {mitigationScore} | Resilience: {resilienceScore}
          </div>
        )}
      </div>
    </div>
  );
}