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
  incrementScore: () => void
  endGame: () => void
}

const GameScreen = ({ score, incrementScore, endGame }: Props) => {
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

  return (
    <>
      <Countdown
        date={Date.now() + seconds * 1000}
        renderer={Timer}
        precision={1}
        intervalDelay={10}
      />
      <section
        className={`relative h-[500px] border-2 border-gray-500 bg-gray-700 crosshair`}
      >
        <div
          className='relative w-[50px] h-[50px]'
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
      </section>
    </>
  )
}

export default GameScreen
