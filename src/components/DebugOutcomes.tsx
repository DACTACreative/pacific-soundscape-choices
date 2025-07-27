import React, { useEffect, useState } from 'react';

const DebugOutcomes: React.FC = () => {
  const [sessionData, setSessionData] = useState<any>(null);
  const [answersData, setAnswersData] = useState<any>(null);

  useEffect(() => {
    // Check sessionStorage
    const selectedCodes = sessionStorage.getItem('selectedAnswerCodes');
    setSessionData({
      selectedAnswerCodes: selectedCodes,
      parsed: selectedCodes ? JSON.parse(selectedCodes) : null
    });

    // Load answers data
    fetch('/data/answers.json')
      .then(response => response.json())
      .then(data => setAnswersData(data))
      .catch(error => console.error('Debug: Error loading answers:', error));
  }, []);

  return (
    <div className="fixed top-0 right-0 bg-black/90 text-white p-4 max-w-md z-50 text-xs">
      <h3 className="font-bold mb-2">Debug Outcomes</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold">SessionStorage:</h4>
        <pre className="text-green-300 overflow-auto">
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      </div>

      {sessionData?.parsed && answersData && (
        <div>
          <h4 className="font-semibold">Found Answers:</h4>
          {sessionData.parsed.map((code: string) => (
            <div key={code} className="mb-2 p-2 bg-blue-900/50 rounded">
              <div className="text-yellow-300">{code}</div>
              <div className="text-blue-300">{answersData[code]?.theme || 'NOT FOUND'}</div>
              <div className="text-xs">{answersData[code]?.answer?.substring(0, 50)}...</div>
              {answersData[code]?.chart && <div className="text-green-300">📊 Has Chart</div>}
              {answersData[code]?.counter && <div className="text-purple-300">🔢 Has Counter</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugOutcomes;