import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Scenario2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral-warning to-ocean-surface p-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-md border-coral-warning/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-coral-warning">
              Scenario 2: Moderate Impact (Medium Emissions)
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Global warming reached 2°C - Mixed climate action with significant challenges
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-warning">2050 Narrative</h2>
              <div className="bg-coral-warning/10 p-6 rounded-lg border border-coral-warning/20">
                <p className="text-lg leading-relaxed">
                  Global warming reached 2°C by 2050, bringing significant challenges, but 
                  Fiji's resilience investments paid off. Advanced early warning systems, 
                  climate-smart infrastructure, and diversified economies help communities 
                  weather the storms. While coral reefs face serious stress, restoration 
                  efforts keep some areas healthy. Managed retreat from vulnerable coastlines 
                  was planned and supported. Fiji demonstrates that preparation makes the difference.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-warning">Key 2050 Indicators</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-coral-warning/10 p-4 rounded-lg border border-coral-warning/20">
                  <h3 className="font-semibold text-coral-warning">Environmental</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Sea Level Rise: +25cm</li>
                    <li>• Coral Loss: 50%</li>
                    <li>• Flood Days/Year: 15</li>
                    <li>• Renewable Energy: 60%</li>
                  </ul>
                </div>
                <div className="bg-coral-warning/10 p-4 rounded-lg border border-coral-warning/20">
                  <h3 className="font-semibold text-coral-warning">Socio-Economic</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Infrastructure Loss: 15%</li>
                    <li>• Fish Catch Change: -35%</li>
                    <li>• Displaced Communities: 8</li>
                    <li>• GDP Loss: 8%</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-warning">Audio Description</h2>
              <div className="bg-coral-warning/10 p-4 rounded-lg border border-coral-warning/20">
                <p className="text-muted-foreground">
                  <strong>Scenario 2 Tide Audio:</strong> Moderate waves with some storm elements. 
                  Rougher seas than today, occasional strong winds, representing increased 
                  climate variability and moderate ocean stress.
                </p>
              </div>
            </section>

            <div className="text-center pt-6">
              <Link to="/">
                <Button variant="coral" size="lg">
                  Back to Game
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scenario2;