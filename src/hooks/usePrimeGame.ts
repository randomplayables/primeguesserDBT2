import { useState, useEffect } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { MAX_ATTEMPTS, MIN_NUMBER, MAX_NUMBER } from '../constants'
import { isPrime } from '../utils/prime'

interface GuessEntry {
  guess: number
  isCorrect: boolean
  feedback: string
}

interface RoundData {
  guess: number
  feedback: string
  attemptsLeft: number
  isCorrect: boolean
  score: number
}

export default function usePrimeGame() {
  const [sessionId, setSessionId] = useState<string>('')
  const [roundNumber, setRoundNumber] = useState<number>(1)
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS)
  const [guessHistory, setGuessHistory] = useState<GuessEntry[]>([])
  const [score, setScore] = useState<number>(0)

  const generateTargetNumber = () => {
    let num: number
    do {
      num = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
    } while (!isPrime(num))
    setTargetNumber(num)
  }

  useEffect(() => {
    generateTargetNumber()
    initGameSession().then(data => {
      if (data.sessionId) {
        setSessionId(data.sessionId)
      }
    })
  }, [])

  const endRound = (wasSuccessful: boolean) => {
    const roundData = {
      roundNumber,
      targetNumber,
      guessHistory,
      wasSuccessful,
      score
    }
    if (sessionId) {
      saveGameData(sessionId, roundNumber, roundData)
    }
    setRoundNumber(prev => prev + 1)
    setAttemptsLeft(MAX_ATTEMPTS)
    setGuessHistory([])
    generateTargetNumber()
  }

  const onGuess = (guess: number) => {
    if (guessHistory.some(entry => entry.guess === guess) || attemptsLeft <= 0) {
      return
    }
    let feedback = ''
    let isCorrect = false
    if (guess === targetNumber) {
      feedback = 'Correct!'
      isCorrect = true
    } else if (guess < targetNumber) {
      feedback = 'Too low'
    } else {
      feedback = 'Too high'
    }
    const newAttemptsLeft = isCorrect ? attemptsLeft : attemptsLeft - 1
    const newScore = isCorrect ? score + 1 : score
    const newEntry: GuessEntry = { guess, isCorrect, feedback }
    setGuessHistory(prev => [...prev, newEntry])
    setAttemptsLeft(newAttemptsLeft)
    setScore(newScore)
    if (sessionId) {
      const roundData: RoundData = {
        guess,
        feedback,
        attemptsLeft: newAttemptsLeft,
        isCorrect,
        score: newScore
      }
      saveGameData(sessionId, roundNumber, roundData)
    }
    if (isCorrect || newAttemptsLeft <= 0) {
      endRound(isCorrect)
    }
  }

  const resetGame = () => {
    setScore(0)
    setRoundNumber(1)
    setAttemptsLeft(MAX_ATTEMPTS)
    setGuessHistory([])
    generateTargetNumber()
  }

  return {
    attemptsLeft,
    guessHistory,
    score,
    roundNumber,
    onGuess,
    resetGame
  }
}