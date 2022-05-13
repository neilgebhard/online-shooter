// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../db'

// POST /api/history
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) res.status(401).json({ message: 'Unauthorized.' })

  if (req.method === 'POST') {
    const data = req.body
    const result = await prisma.history.create({
      data: {
        ...data,
        user: { connect: { email: session?.user?.email! } },
      },
    })
    res.status(200).json(result)
  }
}
