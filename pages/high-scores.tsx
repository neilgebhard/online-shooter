import { GetServerSideProps } from 'next'
import prisma from '../db'
import type { History } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await prisma.user.findMany({
    include: {
      history: true,
    },
  })

  const scores = users.map((user) => user.history).flat()
  const highScores = scores.sort((a, b) => b.score - a.score).slice(0, 100)

  return {
    props: { highScores: JSON.parse(JSON.stringify(highScores)) },
  }
}

type Props = {
  highScores: History[]
}

const HighScores = ({ highScores }: Props) => {
  return (
    <>
      <h1>high scores</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
            <th>Accuracy</th>
            <th>Speed</th>
          </tr>
        </thead>
        {highScores.map((score) => (
          <tbody className='mb-4' key={score.id}>
            <tr>
              <td>{score.createdAt.toString()}</td>
              <td>{score.score}</td>
              <td>{score.accuracy}%</td>
              <td>{score.speed} t/s</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

export default HighScores
