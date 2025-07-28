import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BlockSection from '@/components/BlockSection';

export default function CreditsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen">
      {/* Fixed Return Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          onClick={() => navigate('/game')} 
          variant="pacific" 
          size="default"
        >
          RETURN TO JOURNEY
        </Button>
      </div>

      {/* Sources Section */}
      <BlockSection 
        imageUrl="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
        className="bg-gradient-to-br from-slate-900 to-blue-900"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20">
              <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">
                Research Foundation
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Sources
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          
          <div className="space-y-6 text-lg text-white/80 leading-relaxed">
            <p>
              This experience is built upon rigorous research and data from leading Pacific institutions 
              and international climate science organizations.
            </p>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-400/20">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Key Data Sources</h3>
              <ul className="space-y-3 text-white/90">
                <li>• Pacific Data Hub - Regional climate and development indicators</li>
                <li>• Blue Pacific 2050 Strategy - Strategic framework and implementation goals</li>
                <li>• IPCC Climate Reports - Global temperature and sea level projections</li>
                <li>• Pacific Island Forum - Regional policy and cooperation frameworks</li>
                <li>• NASA Sea Level Change Team - Sea level rise projections for Pacific Islands</li>
                <li>• Pacific Climate Change Science Program - Regional climate projections</li>
                <li>• Reef Resilience Network - Coral bleaching and marine ecosystem data</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-400/20">
              <h3 className="text-2xl font-bold text-purple-300 mb-4">Audio Sources</h3>
              <p className="text-white/90">
                All ocean soundscapes are authentic recordings from Fiji (Suva, 18.1416° S, 178.4419° E) 
                captured on October 10, 2024. These sounds have been sonified to represent different 
                climate scenarios while maintaining their authentic Pacific character.
              </p>
            </div>
          </div>
        </div>
      </BlockSection>

      {/* What's Next Section */}
      <BlockSection 
        imageLeft={true}
        imageUrl="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
        className="bg-gradient-to-br from-blue-900 to-purple-900"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-white/20">
              <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">
                Future Engagement
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              What's Next
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
          </div>
          
          <div className="space-y-6 text-lg text-white/80 leading-relaxed">
            <p>
              This experience is just the beginning. The real work of shaping our Pacific future 
              happens in communities, governments, and organizations across our region.
            </p>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-2xl border border-green-400/20">
              <h3 className="text-2xl font-bold text-green-300 mb-4">Get Involved</h3>
              <ul className="space-y-3 text-white/90">
                <li>• Learn more about the Blue Pacific 2050 Strategy and its implementation</li>
                <li>• Engage with your local Pacific Island Forum representatives</li>
                <li>• Support climate adaptation and resilience projects in Pacific communities</li>
                <li>• Share this experience to expand Pacific voices in climate conversations</li>
                <li>• Contribute to Pacific data initiatives and storytelling projects</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-2xl border border-orange-400/20">
              <h3 className="text-2xl font-bold text-orange-300 mb-4">Continue the Conversation</h3>
              <p className="text-white/90">
                Join Pacific communities and organizations working on climate adaptation, 
                sustainable development, and regional cooperation. Every voice matters 
                in shaping our shared future.
              </p>
            </div>
          </div>
        </div>
      </BlockSection>

      {/* Credits Section */}
      <BlockSection 
        imageUrl="https://images.unsplash.com/photo-1501854140801-50d01698950b"
        className="bg-gradient-to-br from-purple-900 to-slate-900"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-white/20">
              <span className="text-pink-300 text-sm font-medium uppercase tracking-wider">
                Created By
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Eunice Rigo
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
          </div>
          
          <div className="space-y-6 text-lg text-white/80 leading-relaxed">
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-8 rounded-2xl border border-pink-400/20">
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                This experience was created as part of the Pacific Data Visualization Challenge, 
                with deep respect for Pacific communities, knowledge systems, and the urgent 
                need for climate action in our region.
              </p>
              
              <div className="space-y-4 text-white/80">
                <p>
                  <strong className="text-pink-300">Vision:</strong> To center Pacific voices 
                  in climate conversations and make complex data emotionally resonant through 
                  immersive storytelling.
                </p>
                <p>
                  <strong className="text-pink-300">Approach:</strong> Combining authentic 
                  Pacific soundscapes, rigorous data, and interactive narratives to create 
                  meaningful engagement with climate futures.
                </p>
                <p>
                  <strong className="text-pink-300">Hope:</strong> That this experience 
                  sparks deeper connection to our shared Pacific future and inspires 
                  action toward resilience and sustainability.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-2xl text-white/60 italic">
                "We are mostly sea, scattered, yet bound."
              </p>
            </div>
          </div>
        </div>
      </BlockSection>

      {/* Navigation Footer */}
      <div className="bg-black/50 py-12 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <Button 
            onClick={() => navigate('/scenario-1')} 
            variant="pacific" 
            size="pacific"
          >
            EXPLORE SCENARIOS
          </Button>
          
          <Button 
            onClick={() => navigate('/')} 
            variant="pacific" 
            size="pacific"
          >
            RESTART JOURNEY
          </Button>
        </div>
      </div>
    </div>
  );
}