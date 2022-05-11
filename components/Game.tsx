import { useState } from 'react'
import StartScreen from './StartScreen'
import GameScreen from './GameScreen'

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [misses, setMisses] = useState(0)

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
  }

  const endGame = () => {
    setIsPlaying(false)
  }

  const incrementScore = () => {
    setScore((score) => score + 1)
  }

  const incrementMiss = () => {
    setMisses((misses) => misses + 1)
  }

  return (
    <div className={`w-[800px] mx-auto`}>
      {isPlaying ? (
        <>
          <GameScreen
            score={score}
            misses={misses}
            endGame={endGame}
            incrementScore={incrementScore}
            incrementMiss={incrementMiss}
          />
        </>
      ) : (
        <StartScreen startGame={startGame} score={score} />
      )}
    </div>
  )
}

export default App
