import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../db'
import { History } from '@prisma/client'
import Layout from '../components/Layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const data = await prisma.history.findMany({
    where: {
      user: { email: session.user?.email },
    },
    orderBy: { createdAt: 'desc' },
  })

  const history = JSON.parse(JSON.stringify(data))

  return {
    props: { history },
  }
}

type Props = {
  history: History[]
}

const Account = ({ history }: Props) => {
  return (
    <Layout>
      <section>
        <h2 className='mb-8'>History</h2>
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Speed</th>
            </tr>
          </thead>
          {history.map((item) => (
            <tbody className='mb-4' key={item.id}>
              <tr>
                <td>{item.createdAt.toString()}</td>
                <td>{item.score}</td>
                <td>{item.accuracy}%</td>
                <td>{item.speed} t/s</td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </Layout>
  )
}

export default Account
