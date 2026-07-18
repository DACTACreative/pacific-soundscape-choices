import { useState } from 'react';
import { X } from 'lucide-react';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScBqDxhrzRnuyhLa3U2I1k7W3IOHQ5MyA0tu-WTgHURT_ZAyA/viewform?usp=publish-editor';

export default function FeedbackBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative w-full border-b border-border bg-card text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 pr-14 sm:pr-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          <div className="flex-1 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-accent mb-2">Share your experience</p>
            <p className="font-medium text-foreground">
              Blue Paradigm forms part of a wider exploration of what creativity can make possible when data, stories, sound and interaction are brought together.
            </p>
            <p className="mt-2 text-foreground/80">
              I would genuinely love to know what you felt, what stayed with you and what excited or surprised you. Feedback helps me understand what this work creates for the people who encounter it, what could be strengthened and where the exploration might go next.
            </p>
            <p className="mt-2 text-foreground/80">
              You can share as much or as little as you like, and you are welcome to leave your email address if you would like a reply or would like to stay connected.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded text-center whitespace-normal"
            >
              Share your Blue Paradigm experience
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss feedback invitation"
        className="absolute top-2.5 right-2 p-2 text-foreground/60 hover:text-foreground transition-colors rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
