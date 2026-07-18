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

        {/* Share your experience */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Share your experience
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            Blue Paradigm forms part of a wider exploration of what creativity can make possible when data, stories, sound and interaction are brought together.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            I would genuinely love to know what you felt, what stayed with you and what excited or surprised you. Feedback helps me understand what this work creates for the people who encounter it, what could be strengthened and where the exploration might go next.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            You can share as much or as little as you like, and you are welcome to leave your email address if you would like a reply or would like to stay connected.
          </p>
          <Button asChild variant="pacific" size="pacific">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScBqDxhrzRnuyhLa3U2I1k7W3IOHQ5MyA0tu-WTgHURT_ZAyA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your Blue Paradigm experience
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
