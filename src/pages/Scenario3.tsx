import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Scenario3 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coral-danger to-ocean-deep p-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-md border-coral-danger/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-coral-danger">
              Scenario 3: Climate Crisis (High Emissions)
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Global warming exceeded 2.5°C - Limited climate action led to severe impacts
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-danger">2050 Narrative</h2>
              <div className="bg-coral-danger/10 p-6 rounded-lg border border-coral-danger/20">
                <p className="text-lg leading-relaxed">
                  By 2050, the world warmed by 2.5°C or more, and Fiji faces the worst-case scenario. 
                  Rising seas and intensifying storms overwhelm communities. Most coral reefs have 
                  collapsed, food security is threatened, and mass displacement is common. 
                  International climate refugees join displaced Fijians searching for safety. 
                  Traditional ways of life are largely lost, and survival becomes the primary 
                  focus in this drastically altered world.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-danger">Key 2050 Indicators</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-coral-danger/10 p-4 rounded-lg border border-coral-danger/20">
                  <h3 className="font-semibold text-coral-danger">Environmental</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Sea Level Rise: +40cm</li>
                    <li>• Coral Loss: 80%</li>
                    <li>• Flood Days/Year: 40</li>
                    <li>• Renewable Energy: 35%</li>
                  </ul>
                </div>
                <div className="bg-coral-danger/10 p-4 rounded-lg border border-coral-danger/20">
                  <h3 className="font-semibold text-coral-danger">Socio-Economic</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Infrastructure Loss: 35%</li>
                    <li>• Fish Catch Change: -65%</li>
                    <li>• Displaced Communities: 25</li>
                    <li>• GDP Loss: 20%</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-coral-danger">Audio Description</h2>
              <div className="bg-coral-danger/10 p-4 rounded-lg border border-coral-danger/20">
                <p className="text-muted-foreground">
                  <strong>Scenario 3 Tide Audio:</strong> Dramatic storm sounds and turbulent seas. 
                  Storm surge, howling winds, crashing waves, representing climate crisis and 
                  dangerous ocean conditions threatening island communities.
                </p>
              </div>
            </section>

            <div className="text-center pt-6">
              <Link to="/">
                <Button variant="destructive" size="lg">
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

export default Scenario3;