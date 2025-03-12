import { IFormData, IUser } from '@/types/types'
import { axiosServer } from '@/api/axiosServer'


interface IAuthResponse extends Omit<IUser, 'createdAt' | 'defaultWebhookUrl'> {
	accessToken: string
	refreshToken: string
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

class AuthService {
	async main(
		type: 'login' | 'register',
		data: IFormData,
	) {

		const response = await axiosServer.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		return response.data
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosServer.post<IAuthResponse>(
			'/auth/refresh-tokens',
			{
        refreshToken
      }
		)

		return response.data
	}
}

const authService = new AuthService()

export default authService
