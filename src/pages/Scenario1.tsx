import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Scenario1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep to-ocean-surface p-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-md border-ocean-light/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-ocean-light">
              Scenario 1: Sustainable Future (Low Emissions)
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Global warming limited to 1.5°C - Strong climate action succeeded
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-ocean-light">2050 Narrative</h2>
              <div className="bg-ocean-deep/20 p-6 rounded-lg border border-ocean-light/10">
                <p className="text-lg leading-relaxed">
                  By 2050, Fiji has become a global model for climate resilience. Strong international 
                  cooperation kept global warming below 1.5°C, while strategic investments in adaptation 
                  created thriving, resilient communities. Coral reefs show signs of recovery, renewable 
                  energy powers 90% of the grid, and nature-based solutions protect coastlines. 
                  Fijian innovations in sustainable development are replicated across the Pacific. 
                  The sounds of healthy reefs and bustling sustainable communities fill the air.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-ocean-light">Key 2050 Indicators</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-wave-crest/10 p-4 rounded-lg border border-wave-crest/20">
                  <h3 className="font-semibold text-ocean-light">Environmental</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Sea Level Rise: +15cm</li>
                    <li>• Coral Loss: 20%</li>
                    <li>• Flood Days/Year: 5</li>
                    <li>• Renewable Energy: 85%</li>
                  </ul>
                </div>
                <div className="bg-wave-crest/10 p-4 rounded-lg border border-wave-crest/20">
                  <h3 className="font-semibold text-ocean-light">Socio-Economic</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Infrastructure Loss: 5%</li>
                    <li>• Fish Catch Change: -15%</li>
                    <li>• Displaced Communities: 2</li>
                    <li>• GDP Loss: 2%</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-ocean-light">Audio Description</h2>
              <div className="bg-ocean-deep/20 p-4 rounded-lg border border-ocean-light/10">
                <p className="text-muted-foreground">
                  <strong>Scenario 1 Tide Audio:</strong> Calm, peaceful ocean sounds representing 
                  a sustainable future. Gentle waves, seabird calls, and the sound of healthy 
                  marine ecosystems.
                </p>
              </div>
            </section>

            <div className="text-center pt-6">
              <Link to="/">
                <Button variant="ocean" size="lg">
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

export default Scenario1;