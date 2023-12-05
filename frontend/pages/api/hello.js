import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = new PrismaClient().$extends(withAccelerate())



export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
