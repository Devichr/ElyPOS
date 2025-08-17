import { prisma } from '../../utils/prisma'
import bcrypt from 'bcryptjs'
import type { PublicUser } from './model'

const SALT_ROUNDS = 12

export async function createUser(username: string, email: string, password: string): Promise<PublicUser> {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS)
  const user = await prisma.user.create({
    data: { email, username, password: hashed },
    select: { id: true, email:true, username: true }
  })
  return user
}

export async function verifyUser(email: string, password: string): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true, username: true }
  })
  if (!user) return null
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return null
  return { id: user.id, username: user.username, email: user.email }
}

export async function getUserById(id: string): Promise<PublicUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true }
  })
  return user
}
