import { useEffect, useRef, useState } from 'react'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SECONDS_PER_GAME,
  TARGET_WIDTH,
} from '../constants'
import Image from 'next/image'
import Timer from './Timer'
import Countdown from 'react-countdown'

type Props = {
  score: number
  misses: number
  endGame: () => void
  incrementScore: () => void
  incrementMiss: () => void
}

const GameScreen = ({
  score,
  misses,
  endGame,
  incrementScore,
  incrementMiss,
}: Props) => {
  const [seconds, setSeconds] = useState(SECONDS_PER_GAME)
  const [position, setPosition] = useState(getRandomPosition())
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPosition(getRandomPosition())
  }, [score])

  useEffect(() => {
    const tick = () => setSeconds((prev) => prev - 1)
    timerId.current = setInterval(tick, 1000)
    return () => clearInterval(Number(timerId.current))
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      endGame()
    }
  }, [seconds, endGame])

  // calculation: width of screen - width of target - width of border
  function getRandomPosition() {
    const x = Math.random() * (SCREEN_WIDTH - TARGET_WIDTH - 2)
    const y = Math.random() * (SCREEN_HEIGHT - TARGET_WIDTH - 2)

    return {
      x: `${x}px`,
      y: `${y}px`,
    }
  }

  const handleTargetClick = () => {
    incrementScore()
  }

  const handleCanvasClick = () => {
    incrementMiss()
  }

  const timeElapsed = SECONDS_PER_GAME - seconds
  const speed = score / timeElapsed
  const accuracy = (score / (misses + score)) * 100

  return (
    <>
      <div className='text-lg'>Score: {score}</div>
      <div className='text-lg'>
        Speed: {speed > 0 && <span>{speed.toFixed(2)}t/s</span>}
      </div>
      <div>Accuracy: {accuracy > 0 && <span>{accuracy.toFixed(2)}%</span>}</div>
      <Countdown
        date={Date.now() + seconds * 1000}
        renderer={Timer}
        precision={1}
        intervalDelay={10}
      />

      <div className='relative h-[500px] w-[800px]'>
        <canvas
          width={800}
          height={500}
          className={`absolute border-2 border-gray-500 bg-gray-700 crosshair`}
          onClick={handleCanvasClick}
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
