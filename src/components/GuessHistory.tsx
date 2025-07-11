import React from 'react'

interface GuessEntry {
  guess: number
  isCorrect: boolean
  feedback: string
}

interface GuessHistoryProps {
  guessHistory: GuessEntry[]
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ guessHistory }) => {
  if (guessHistory.length === 0) {
    return (
      <div className="guess-history">
        <p>No guesses yet.</p>
      </div>
    )
  }

  return (
    <div className="guess-history">
      <h3>Guess History</h3>
      <ul className="guess-history-list">
        {guessHistory.map((entry, index) => (
          <li key={index} className={`guess-entry ${entry.isCorrect ? 'correct' : 'incorrect'}`}>
            <span className="guess-number">Guess {index + 1}: {entry.guess}</span>
            <span className="guess-feedback">{entry.feedback}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuessHistory