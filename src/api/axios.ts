import axios, { CreateAxiosDefaults } from 'axios'

import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { errorCatch, errorCatchStatus, getContentType } from './api.helper'
import { API_URL } from '@/constants'
import { serverRefreshTokens } from '@/utils/server/refresh-tokens'

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
};

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(errorCatchStatus(error) == 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await serverRefreshTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (
          errorCatchStatus(error) == 401 ||
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'Refresh token not passed'
				)
					removeFromStorage()
			}
		}


		throw error
	}
)
