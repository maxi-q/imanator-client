'use server'
import 'server-only'

import { cookies } from 'next/headers'

import { EnumTokens } from './auth.service'

export const getAccessToken = async () => {
  const cookieStore = await cookies()
	const accessToken = cookieStore.get(EnumTokens.ACCESS_TOKEN)?.value
	return accessToken || null
}

export const saveAccessTokenStorage = async (accessToken: string) => {
  const cookieStore = await cookies()

  cookieStore.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
    // httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

export const saveRefreshTokenStorage = async (refreshToken: string) => {
  const cookieStore = await cookies()

  cookieStore.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}


export const removeFromStorage = async () => {
  const cookieStore = await cookies()

	cookieStore.delete(EnumTokens.ACCESS_TOKEN)
	cookieStore.delete(EnumTokens.REFRESH_TOKEN)
}
