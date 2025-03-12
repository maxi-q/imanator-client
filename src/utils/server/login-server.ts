'use server'

import { saveAccessTokenStorage, saveRefreshTokenStorage } from '@/services/auth/auth.helper'
import authService from '@/services/auth/auth.service'
import { IFormData } from '@/types/types'

export const serverLogin = async (type: "register" | "login", data: IFormData) => {
  const {refreshToken, accessToken, ...userdata} = await authService.main(type, data)

  await Promise.all([
    accessToken ? saveAccessTokenStorage(accessToken) : Promise.resolve(),
    refreshToken ? saveRefreshTokenStorage(refreshToken) : Promise.resolve()
  ])

  return userdata
}