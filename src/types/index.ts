export interface GuessEntry {
  guess: number
  isCorrect: boolean
  feedback: string
}

export interface RoundData {
  guess: number
  feedback: string
  attemptsLeft: number
  isCorrect: boolean
  score: number
}

export interface RoundSummary {
  roundNumber: number
  targetNumber: number
  guessHistory: GuessEntry[]
  wasSuccessful: boolean
  score: number
}

export interface GameSessionResponse {
  sessionId: string
  surveyMode?: boolean
  surveyQuestionId?: string | null
  [key: string]: any
}

export interface SaveGameDataResponse {
  [key: string]: any
}