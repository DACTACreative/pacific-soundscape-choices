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
            Eunice Rigo is a data analyst working within Australia's not for profit sector. Her practice brings together information systems, artificial intelligence, organisational knowledge and creative technology, with a particular interest in how systems shape what organisations can understand, remember and act upon.
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
