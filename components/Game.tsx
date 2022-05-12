import { useState } from 'react'
import StartScreen from './StartScreen'
import GameScreen from './GameScreen'
import { START_DURATION } from '../constants'

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(START_DURATION) // in seconds
  const [score, setScore] = useState(0)
  const [misses, setMisses] = useState(0)

  const startGame = () => {
    setIsPlaying(true)
    setDuration(START_DURATION)
    setScore(0)
  }

  const endGame = () => {
    setIsPlaying(false)
  }

  const incrementScore = () => {
    setScore((prev) => prev + 1)
  }

  const incrementMiss = () => {
    setMisses((prev) => prev + 1)
  }

  const decrementDuration = () => {
    setDuration((prev) => prev - 1)
  }

  return (
    <div className={`w-[800px] mx-auto`}>
      {isPlaying ? (
        <GameScreen
          score={score}
          duration={duration}
          misses={misses}
          endGame={endGame}
          incrementScore={incrementScore}
          incrementMiss={incrementMiss}
          decrementDuration={decrementDuration}
        />
      ) : (
        <StartScreen
          startGame={startGame}
          score={score}
          duration={duration}
          misses={misses}
        />
      )}
    </div>
  )
}

export default App
