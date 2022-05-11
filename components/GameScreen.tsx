import { useEffect, useRef, useState } from 'react'
import Score from './Score'
import Timer from './Timer'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SECONDS_PER_GAME,
  TARGET_WIDTH,
} from '../constants'

type Props = {
  score: number
  incrementScore: () => void
  endGame: () => void
}

const GameScreen: React.FC<Props> = ({ score, incrementScore, endGame }) => {
  const [seconds, setSeconds] = useState(SECONDS_PER_GAME)
  const [position, setPosition] = useState(getRandomPosition())
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPosition(getRandomPosition())
  }, [score])

  useEffect(() => {
    const tick = () => {
      setSeconds((seconds) => {
        let total = seconds - 1
        if (total === 0) endGame()
        return total
      })
    }

    timerId.current = setInterval(tick, 1000)
    return () => clearInterval(Number(timerId.current))
  }, [])

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
      <Score score={score} />
      <Timer seconds={seconds} />
      <section
        className={`relative h-[500px] border-2 border-gray-500 bg-gray-700`}
      >
        <img
          width='50'
          height='50'
          src='/target.png'
          style={{
            top: position.y,
            left: position.x,
          }}
          className='absolute'
          onClick={handleTargetClick}
          alt='target'
        />
      </section>
    </>
  )
}

export default GameScreen
