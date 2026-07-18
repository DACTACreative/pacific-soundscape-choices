import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScBqDxhrzRnuyhLa3U2I1k7W3IOHQ5MyA0tu-WTgHURT_ZAyA/viewform';
const LINKEDIN_URL = 'https://www.linkedin.com/in/eunice-rigo';
const STORAGE_KEY = 'blueParadigmBannerDismissed';

export default function RecognitionBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  return (
    <div className="w-full border-b border-border bg-card text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex-1 text-sm sm:text-base leading-relaxed">
          <span className="font-medium">
            Blue Paradigm won the Pacific category of the 2025 Pacific Data Visualisation Challenge
            and has since been recognised by the 2026 Australian Not-for-Profit Technology Awards
            and TechDiversity Awards.
          </span>
          <span className="block mt-1 text-foreground/80">Created by Eunice Rigo</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
          >
            Share your experience
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
          >
            Connect on LinkedIn
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}