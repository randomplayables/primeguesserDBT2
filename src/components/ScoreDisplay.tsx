import React from 'react'

interface ScoreDisplayProps {
  score: number
  attemptsLeft: number
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, attemptsLeft }) => {
  return (
    <div className="score-display">
      <p className="score">Score: {score}</p>
      <p className="attempts-left">Attempts Left: {attemptsLeft}</p>
    </div>
  )
}

export default ScoreDisplay