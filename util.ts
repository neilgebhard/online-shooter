import {
  BORDER_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  START_DURATION,
  TARGET_WIDTH,
} from './constants'

type CalculateStatsProps = {
  duration: number
  score: number
  misses: number
}

export const calculateStats = ({
  duration,
  score,
  misses,
}: CalculateStatsProps) => {
  const timeElapsed = START_DURATION - duration
  const speed = Number((score / timeElapsed).toFixed(2))
  const accuracy = Number(((score / (misses + score)) * 100 || 0).toFixed(2))

  return { timeElapsed, speed, accuracy }
}

export const getRandomPosition = () => {
  const x =
    Math.random() * (SCREEN_WIDTH - TARGET_WIDTH - BORDER_WIDTH) + BORDER_WIDTH
  const y =
    Math.random() * (SCREEN_HEIGHT - TARGET_WIDTH - BORDER_WIDTH) + BORDER_WIDTH

  return {
    x: `${x}px`,
    y: `${y}px`,
  }
}
