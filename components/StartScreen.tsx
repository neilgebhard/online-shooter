import { SCREEN_HEIGHT, SECONDS_PER_GAME } from '../constants'

type Props = {
  startGame: () => void
  score: number
}

const StartScreen: React.FC<Props> = ({ startGame, score }) => {
  return (
    <div
      className={`h-[${SCREEN_HEIGHT}px] flex flex-col justify-center items-center text-center`}
    >
      {score > 0 && <p>You got {score}!</p>}
      {score <= 0 && (
        <p>
          You get {SECONDS_PER_GAME} seconds to shoot as many targets as you
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
  )
}

export default StartScreen
