import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface NarrativeCardProps {
  narrative: string;
  onContinue: () => void;
  isVisible: boolean;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({
  narrative,
  onContinue,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-2xl w-full bg-background/95 border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Your Decision Impact</h3>
            <p className="text-foreground/90 leading-relaxed">{narrative}</p>
            <div className="flex justify-center pt-4">
              <Button 
                onClick={onContinue}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                See Outcome →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};