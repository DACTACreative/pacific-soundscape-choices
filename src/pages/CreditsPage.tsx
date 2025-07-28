import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BlockSection from '@/components/BlockSection';
export default function CreditsPage() {
  const navigate = useNavigate();
  return <div className="text-white min-h-screen bg-black">
      {/* What's Next Section */}
      <div className="min-h-screen flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            What's Next
          </h2>
          
          <div className="space-y-6 text-lg text-white leading-relaxed">
            <p>
              This journey should not end here.
            </p>
            <p>
              Let's create a community of ideas and build a new paradigm.
            </p>
            <p>
              Utopias. Sustainable ideas. Low-tech solutions. Science-fictional dreams. All these ideas need to be heard, and Blue Lens could to be that place.
            </p>
            <p>
              If you want to follow this project, leave your email here. Let's dream more and share ideas together.
            </p>
            <p>
              Imagine a place for Pacific voices, resilience builders, climate change idealists, sustainability dreamers, and degrowth visionaries building tomorrow together.
            </p>
          </div>
        </div>
      </div>

      {/* Eunice Rigo Section */}
      <div className="min-h-screen flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Eunice Rigo
          </h2>
          
          <div className="space-y-6 text-lg text-white leading-relaxed">
            <p>
              This experience was created as part of the Pacific Data Visualization Challenge, 
              with deep respect for Pacific communities, knowledge systems, and the urgent 
              need for climate action in our region.
            </p>
            
            <p>
              To center Pacific voices in climate conversations and make complex data emotionally resonant through 
              immersive storytelling.
            </p>
            <p>
              Combining authentic Pacific soundscapes, rigorous data, and interactive narratives to create 
              meaningful engagement with climate futures.
            </p>
            <p>
              That this experience sparks deeper connection to our shared Pacific future and inspires 
              action toward resilience and sustainability.
            </p>

            <div className="mt-12">
              <p className="text-2xl text-white italic">
            </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="py-12 px-8">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Button onClick={() => navigate('/')} variant="pacific" size="pacific">
            RESTART THE JOURNEY
          </Button>
        </div>
      </div>
    </div>;
}