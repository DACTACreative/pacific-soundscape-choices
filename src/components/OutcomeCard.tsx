import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface OutcomeCardProps {
  outcome: string;
  impact: string;
  theme: string;
  onContinue: () => void;
  isVisible: boolean;
}

export const OutcomeCard: React.FC<OutcomeCardProps> = ({
  outcome,
  impact,
  theme,
  onContinue,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-2xl w-full bg-background/95 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Strategic Outcome</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {theme}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Impact:</h4>
            <p className="text-foreground/90 leading-relaxed">{impact}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Outcome:</h4>
            <p className="text-foreground/90 leading-relaxed">{outcome}</p>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onContinue}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};