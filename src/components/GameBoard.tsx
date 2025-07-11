import React from 'react'
import usePrimeGame from '../hooks/usePrimeGame'
import GuessInput from './GuessInput'
import ScoreDisplay from './ScoreDisplay'
import GuessHistory from './GuessHistory'

const GameBoard: React.FC = () => {
  const { attemptsLeft, guessHistory, score, roundNumber, onGuess, resetGame } = usePrimeGame()

  return (
    <div className="game-board">
      <h2>Round {roundNumber}</h2>
      <ScoreDisplay score={score} attemptsLeft={attemptsLeft} />
      <GuessInput onGuess={onGuess} />
      <GuessHistory guessHistory={guessHistory} />
      <button onClick={resetGame} className="reset-button">
        Reset Game
      </button>
    </div>
  )
}

export default GameBoard