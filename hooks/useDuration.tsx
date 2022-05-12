import { useEffect, useRef, useState } from 'react'
import { START_DURATION } from '../constants'

const useDuration = () => {
  const [duration, setDuration] = useState(START_DURATION)
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const tick = () => setDuration((prev) => prev - 1)
    timerId.current = setInterval(tick, 1000)
    return () => clearInterval(Number(timerId.current))
  }, [])

  const clearDuration = () => {
    clearInterval(Number(timerId.current))
  }

  return { duration, clearDuration }
}

export default useDuration
