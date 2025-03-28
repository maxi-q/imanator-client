import { IFormData, IUser } from '@/types/types'
import { axiosServer } from '@/api/axiosServer'
import axios from 'axios'
import { API_URL } from '@/constants'


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
    try {
      const a = await fetch(`${API_URL}/auth/${type}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      console.log(a)

      // throw new Error('123')

      // const response = await axios.post(
      //   `${API_URL}/auth/${type}`,
      //   data
      // )

      // return response.data

    } catch (e) {
      console.log(e)
    }
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
