import { useEffect, useState } from 'react'
import { START_DURATION } from '../constants'
import { calculateStats, getRandomPosition } from '../util'
import Countdown from 'react-countdown'
import Timer from './Timer'
import GameScreen from './GameScreen'

const Game = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(START_DURATION) // in seconds
  const [score, setScore] = useState(0)
  const [misses, setMisses] = useState(0)
  const [position, setPosition] = useState(getRandomPosition())

  const { timeElapsed, speed, accuracy } = calculateStats({
    duration,
    score,
    misses,
  })

  const startGame = () => {
    setIsPlaying(true)
    setDuration(START_DURATION)
    setScore(0)
    setMisses(0)
  }

  const restartGame = () => {
    setDuration(START_DURATION)
    setScore(0)
    setMisses(0)
  }

  const endGame = () => {
    setIsPlaying(false)
    const data = { score, speed, accuracy }
    fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  useEffect(() => {
    const { x, y } = getRandomPosition()
    setPosition({ x, y })
  }, [score])

  useEffect(() => {
    if (duration <= 0) {
      endGame()
    }
  }, [duration])

  if (isPlaying) {
    return (
      <div className='w-[800px] mx-auto'>
        <p>Score: {score}</p>
        <p>Speed: {timeElapsed > 0 && <span>{speed} t/s</span>}</p>
        <p>Accuracy: {accuracy}%</p>
        <Countdown
          date={Date.now() + duration * 1000}
          renderer={Timer}
          precision={1}
          intervalDelay={10}
        />
        <GameScreen
          onMiss={() => setMisses((prev) => prev + 1)}
          onTarget={() => setScore((prev) => prev + 1)}
          decrementDuration={() => setDuration((prev) => prev - 1)}
          position={position}
        />
        <button type='button' onClick={restartGame}>
          Restart Game
        </button>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center h-[500px]'>
      <div className={`border max-w-md mx-auto bg-gray-700 p-10 space-y-8`}>
        {score > 0 || misses > 0 ? (
          <div>
            <h2 className='text-center mb-6 text-2xl'>Stats</h2>
            <p>Score: {score}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Speed: {speed} t/s</p>
          </div>
        ) : (
          <p>
            You get {START_DURATION} seconds to shoot as many targets as you
            can!
          </p>
        )}
        <div className='text-center'>
          <button
            className='inherit text-xl bg-green-600 text-white rounded-full px-6 py-4 hover:bg-green-500'
            type='button'
            onClick={() => startGame()}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game
