import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
  onMiss: () => void
  onTarget: () => void
  position: { x: string; y: string }
  decrementDuration: () => void
}

const GameScreen = ({
  onMiss,
  onTarget,
  position,
  decrementDuration,
}: Props) => {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerId.current = setInterval(decrementDuration, 1000)
    return () => clearInterval(Number(timerId.current))
  }, [])

  return (
    <div className='relative h-[500px] w-[800px]'>
      <canvas
        width={800}
        height={500}
        className={`absolute border-2 border-gray-500 bg-gray-700 crosshair`}
        onClick={onMiss}
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
          onClick={onTarget}
          alt='target'
          layout='fill'
        />
      </div>
    </div>
  )
}

export default GameScreen
