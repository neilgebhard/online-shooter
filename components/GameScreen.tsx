import { useEffect, useRef, useState } from 'react'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  TARGET_WIDTH,
  BORDER_WIDTH,
  START_DURATION,
} from '../constants'
import Image from 'next/image'
import Timer from './Timer'
import Countdown from 'react-countdown'

type Props = {
  score: number
  misses: number
  duration: number
  endGame: () => void
  incrementScore: () => void
  incrementMiss: () => void
  decrementDuration: () => void
}

const GameScreen = ({
  score,
  misses,
  duration,
  endGame,
  incrementScore,
  incrementMiss,
  decrementDuration,
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

  const timeElapsed = START_DURATION - duration
  const speed = score / timeElapsed
  const accuracy = (score / (misses + score)) * 100

  return (
    <>
      <div>Score: {score}</div>
      <div>Speed: {timeElapsed > 0 && <span>{speed.toFixed(2)}t/s</span>}</div>
      <div>Accuracy: {accuracy > 0 && <span>{accuracy.toFixed(2)}%</span>}</div>
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
    </>
  )
}

export default GameScreen
