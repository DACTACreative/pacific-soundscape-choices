import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlockSection from './BlockSection';

export default function ScenarioFooterSection() {
  const navigate = useNavigate();

  return (
    <BlockSection imageLeft={false} imageUrl="/data/INTERISLAND.png">
      <div className="space-y-10 text-left max-w-2xl">
        {/* About the creator */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            About the creator
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            Eunice Rigo is a data analyst working within Australia's not for profit sector. Her practice brings together data visualisation, artificial intelligence, storytelling, sound and creative technology. She explores how Warm Data, relational knowledge and place based and Indigenous ways of knowing can support richer, more human ways of understanding and communicating complex information.
          </p>
          <Button asChild variant="pacific" size="pacific">
            <a
              href="https://www.linkedin.com/in/eunice-rigo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect with Eunice on LinkedIn
            </a>
          </Button>
        </div>

        {/* Explore the project */}
        <div className="space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            To learn more about how Blue Paradigm came to exist, the data and sources behind it, and the thinking that shaped the experience, explore the Credits page.
          </p>
          <Button
            variant="pacific"
            size="pacific"
            onClick={() => navigate('/credits')}
          >
            Explore the credits and methodology
          </Button>
        </div>
      </div>
    </BlockSection>
  );
}
