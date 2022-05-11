type Props = {
  score: number
}

const Score: React.FC<Props> = ({ score }) => {
  return <div className='text-lg'>Score: {score}</div>
}

export default Score
