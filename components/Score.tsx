type Props = {
  score: number
}

const Score = ({ score }: Props) => {
  return <div className='text-lg'>Score: {score}</div>
}

export default Score
