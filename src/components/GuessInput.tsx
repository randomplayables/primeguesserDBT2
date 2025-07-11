import React, { useState, FormEvent, ChangeEvent } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '../constants'

interface GuessInputProps {
  onGuess: (guess: number) => void
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const guess = parseInt(inputValue, 10)
    if (!isNaN(guess)) {
      onGuess(guess)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="guess-input-form">
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        placeholder={`Enter a prime between ${MIN_NUMBER} and ${MAX_NUMBER}`}
        className="guess-input"
      />
      <button type="submit" className="guess-button">
        Guess
      </button>
    </form>
  )
}

export default GuessInput