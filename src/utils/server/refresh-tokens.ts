'use server'

import { saveAccessTokenStorage, saveRefreshTokenStorage } from '@/services/auth/auth.helper'
import authService, { EnumTokens } from '@/services/auth/auth.service'
import { cookies } from 'next/headers'

export const serverRefreshTokens = async () => {
  const cookieStore = await cookies()
  const clientRefreshToken = cookieStore.get(EnumTokens.REFRESH_TOKEN)?.value
  const { accessToken, refreshToken } = await authService.getNewTokensByRefresh(clientRefreshToken || '')

  await Promise.all([
    accessToken ? saveAccessTokenStorage(accessToken) : Promise.resolve(),
    refreshToken ? saveRefreshTokenStorage(refreshToken) : Promise.resolve()
  ])

  return Promise.resolve()
}

export const serverRefreshAndGetAccessTokens = async () => {
  const cookieStore = await cookies()
  const clientRefreshToken = cookieStore.get(EnumTokens.REFRESH_TOKEN)?.value
  const { accessToken } = await authService.getNewTokensByRefresh(clientRefreshToken || '')


  return { accessToken }
}



export const serverRefreshAndSaveGetAccessTokensByRefresh = async (clientRefreshToken: string) => {
  const { accessToken, refreshToken } = await authService.getNewTokensByRefresh(clientRefreshToken)

  if (accessToken) await saveAccessTokenStorage(accessToken)
  if (refreshToken) await saveRefreshTokenStorage(refreshToken)


  return { accessToken }
}
