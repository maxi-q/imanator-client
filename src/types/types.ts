import { UserRole } from '@/services/auth/auth.types'

export interface IUser {
  id: string
  createdAt: string
  firstName: string
  lastName: string
  balance: number
  defaultWebhookUrl: string
  email: string
  role: UserRole
}

export interface IFormData extends Pick<IUser, 'email' | 'firstName' | 'lastName'>  {
	password: string
}
