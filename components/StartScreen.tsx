import { SCREEN_HEIGHT, START_DURATION } from '../constants'
import { calculateStats } from '../util'

type Props = {
  startGame: () => void
  score: number
  duration: number
  misses: number
}

const StartScreen = ({ startGame, score, duration, misses }: Props) => {
  const { speed, accuracy } = calculateStats({
    duration,
    score,
    misses,
  })

  return (
    <div className='flex flex-col justify-center items-center h-[500px]'>
      <div className={`border max-w-md mx-auto bg-gray-700 p-10 space-y-8`}>
        {score > 0 ? (
          <div>
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
        <button
          className='inherit text-xl bg-green-600 text-white rounded-full px-6 py-4 hover:bg-green-500'
          type='button'
          onClick={() => startGame()}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default StartScreen
