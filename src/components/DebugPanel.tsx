import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface DebugAnswer {
  code: string;
  theme: string;
  answer: string;
  narrative: string;
  impact: string;
  outcome: string;
}

export default function DebugPanel() {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [answers, setAnswers] = useState<DebugAnswer[]>([]);
  const [themeCounts, setThemeCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only show debug panel if we're actually in a game/scenario context
    const codes = JSON.parse(sessionStorage.getItem('selectedAnswerCodes') || '[]');
    console.log('🐛 DebugPanel: Checking for selected codes:', codes);
    
    setSelectedCodes(codes);
    
    // Don't load anything if no codes are selected (user hasn't played yet)
    if (codes.length === 0) {
      console.log('🐛 DebugPanel: No codes found, hiding panel');
      setLoading(false);
      return;
    }
    
    fetch('/data/Mapping - Question BPC - Sheet1.csv')
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          transform: (value, field) => {
            if (typeof value === 'string') {
              return value.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            }
            return value;
          },
          complete: (results) => {
            const matchedAnswers = codes.map((code: string) => {
              const row = results.data.find((row: any) => row.code && row.code.trim() === code.trim()) as any;
              if (row) {
                return {
                  code: row.code?.trim() || '',
                  theme: row.theme?.trim() || '',
                  answer: row.answer?.trim() || '',
                  narrative: row.narrative?.trim() || '',
                  impact: row.impact?.trim() || '',
                  outcome: row.outcome?.trim() || ''
                };
              }
              return null;
            }).filter((item): item is DebugAnswer => item !== null);
            
            setAnswers(matchedAnswers);
            
            // Calculate theme counts
            const counts: Record<string, number> = {};
            matchedAnswers.forEach(answer => {
              if (answer.theme) {
                counts[answer.theme] = (counts[answer.theme] || 0) + 1;
              }
            });
            setThemeCounts(counts);
            setLoading(false);
          }
        });
      })
      .catch(() => setLoading(false));
  }, []);
  
  if (loading || selectedCodes.length === 0) {
    return null; // Don't show debug panel if no selections made
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-red-500 max-w-md max-h-96 overflow-y-auto text-xs">
      <h3 className="text-red-400 font-bold mb-2">🐛 DEBUG PANEL</h3>
      
      <div className="mb-3">
        <h4 className="text-yellow-400 font-semibold">Selected Codes:</h4>
        <p className="text-green-300">{selectedCodes.join(', ') || 'None'}</p>
      </div>
      
      <div className="mb-3">
        <h4 className="text-yellow-400 font-semibold">Theme Counts:</h4>
        {Object.entries(themeCounts).map(([theme, count]) => (
          <div key={theme} className="text-green-300">
            {theme}: {count}
          </div>
        ))}
      </div>
      
      <div className="mb-3">
        <h4 className="text-yellow-400 font-semibold">Matched Answers ({answers.length}):</h4>
        {answers.map((answer, index) => (
          <div key={answer.code} className="border border-gray-600 p-2 mb-2 rounded">
            <div className="text-blue-300 font-semibold">{answer.code}</div>
            <div className="text-purple-300">Theme: {answer.theme}</div>
            <div className="text-white">Answer: {answer.answer.substring(0, 100)}...</div>
            <div className="text-orange-300">Impact: {answer.impact.substring(0, 50)}...</div>
            <div className="text-green-300">Narrative: {answer.narrative.substring(0, 50)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
}