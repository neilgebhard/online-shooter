import { useEffect, useRef, useState } from 'react'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  TARGET_WIDTH,
  BORDER_WIDTH,
} from '../constants'
import Image from 'next/image'
import Timer from './Timer'
import Countdown from 'react-countdown'
import { calculateStats } from '../util'

type Props = {
  score: number
  misses: number
  duration: number
  endGame: () => void
  incrementScore: () => void
  incrementMiss: () => void
  decrementDuration: () => void
  restartGame: () => void
}

const GameScreen = ({
  score,
  misses,
  duration,
  endGame,
  incrementScore,
  incrementMiss,
  decrementDuration,
  restartGame,
}: Props) => {
  const [position, setPosition] = useState(getRandomPosition())
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPosition(getRandomPosition())
  }, [score])

  useEffect(() => {
    const tick = () => decrementDuration()
    timerId.current = setInterval(tick, 1000)
    return () => clearInterval(Number(timerId.current))
  }, [])

  useEffect(() => {
    if (duration <= 0) {
      endGame()
    }
  }, [duration, endGame])

  // calculation: width of screen - width of target - width of border
  function getRandomPosition() {
    const x = Math.random() * (SCREEN_WIDTH - TARGET_WIDTH - BORDER_WIDTH)
    const y = Math.random() * (SCREEN_HEIGHT - TARGET_WIDTH - BORDER_WIDTH)

    return {
      x: `${x}px`,
      y: `${y}px`,
    }
  }

  const handleTargetClick = () => {
    incrementScore()
  }

  const handleScreenClick = () => {
    incrementMiss()
  }

  const handleRestart = () => {
    restartGame()
  }

  const { timeElapsed, speed, accuracy } = calculateStats({
    duration,
    score,
    misses,
  })

  return (
    <>
      <div>Score: {score}</div>
      <div>Speed: {timeElapsed > 0 && <span>{speed} t/s</span>}</div>
      <div>Accuracy: {Number(accuracy) > 0 && <span>{accuracy}%</span>}</div>
      <Countdown
        date={Date.now() + duration * 1000}
        renderer={Timer}
        precision={1}
        intervalDelay={10}
      />

      <div className='relative h-[500px] w-[800px]'>
        <canvas
          width={800}
          height={500}
          className={`absolute border-2 border-gray-500 bg-gray-700 crosshair`}
          onClick={handleScreenClick}
        ></canvas>
        <div
          className='relative w-[50px] h-[50px] crosshair'
          style={{
            top: position.y,
            left: position.x,
          }}
        >
          <Image
            src='/target.png'
            className='absolute'
            onClick={handleTargetClick}
            alt='target'
            layout='fill'
          />
        </div>
      </div>
      <button type='button' onClick={handleRestart}>
        Restart Game
      </button>
    </>
  )
}

export default GameScreen
