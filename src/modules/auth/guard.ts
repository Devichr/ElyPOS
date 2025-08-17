import {Elysia} from 'elysia'
import type {JwtPayload} from './model'
import jwt from '@elysiajs/jwt'

export const checkauth = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_KEY || 'el1s14my15tr1gw3hy4n6p4l1n6c4nt1ks3dun14'
    }))
    .derive(async ({ headers, jwt }) => {
        const token = headers['authorization']?.split(' ')[1]
        if (!token) throw new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 })
        const payload = await jwt.verify(token)
        if (!payload) throw new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 })
        return { authUser: payload as JwtPayload }
    })