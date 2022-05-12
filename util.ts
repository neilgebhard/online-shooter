import { START_DURATION } from './constants'

type Props = {
  duration: number
  score: number
  misses: number
}

export const calculateStats = ({ duration, score, misses }: Props) => {
  const timeElapsed = START_DURATION - duration
  const speed = (score / timeElapsed).toFixed(2)
  const accuracy = ((score / (misses + score)) * 100).toFixed(2)

  return { timeElapsed, speed, accuracy }
}
