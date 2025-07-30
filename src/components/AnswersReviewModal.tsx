import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface GameAnswer {
  code: string;
  themecode: string;
  answer: string;
  theme: string;
  QuestionCode: string;
  Question: string;
  outcome: string;
  impact: string;
  narrative: string;
}

interface AnswersReviewModalProps {
  selectedAnswerCodes: string[];
  answers: Record<string, GameAnswer>;
  onClose: () => void;
  isVisible: boolean;
}

export const AnswersReviewModal: React.FC<AnswersReviewModalProps> = ({
  selectedAnswerCodes,
  answers,
  onClose,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-4xl w-full max-h-[80vh] bg-background/95 border-primary/20 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Your Journey So Far</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-primary hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {selectedAnswerCodes.map((code, index) => {
              const answer = answers[code];
              if (!answer) return null;
              
              return (
                <div key={code} className="border border-primary/10 rounded-lg p-4 bg-background/50">
                  <div className="text-sm text-primary mb-2">
                    Question {index + 1}: {answer.Question}
                  </div>
                  <div className="font-medium text-foreground mb-2">
                    Your Choice: {answer.answer}
                  </div>
                  <div className="text-sm text-foreground/70">
                    Theme: {answer.theme}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center pt-6">
            <Button 
              onClick={onClose}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue Playing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};