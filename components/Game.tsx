import { useState } from 'react'
import StartScreen from './StartScreen'
import GameScreen from './GameScreen'
import { SCREEN_WIDTH } from '../constants'

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)

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

  return (
    <div className={`w-[800px] mx-auto`}>
      {isPlaying ? (
        <GameScreen
          score={score}
          incrementScore={incrementScore}
          endGame={endGame}
        />
      ) : (
        <StartScreen startGame={startGame} score={score} />
      )}
    </div>
  )
}

export default App
