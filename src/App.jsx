import { useState } from 'react';
import HomePage from './HomePage';
import ReactInterviewChallenges from './ReactInterviewChallenges';

function App() {
  const [showChallenges, setShowChallenges] = useState(false);

  if (showChallenges) {
    return (
      <div>
        <button
          onClick={() => setShowChallenges(false)}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
        >
          ← Back to Home
        </button>
        <ReactInterviewChallenges />
      </div>
    );
  }

  return <HomePage onViewChallenges={() => setShowChallenges(true)} />;
}

export default App;