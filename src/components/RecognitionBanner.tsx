import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const SUBSTACK_URL = 'https://substack.com/@eunicerigo';
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
    <div className="relative w-full border-b border-border bg-card text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 pr-12 sm:pr-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex-1 text-sm sm:text-base leading-relaxed">
            <span className="font-medium">
              Blue Paradigm won the Pacific category of the 2025 Pacific Data Visualisation Challenge
              and has since been recognised by the 2026 Australian Not-for-Profit Technology Awards
              and TechDiversity Awards.
            </span>
            <span className="block mt-1 text-foreground/80">Created by Eunice Rigo</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
            >
              Connect on Substack
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute top-2.5 right-2 p-2 text-foreground/60 hover:text-foreground transition-colors rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}