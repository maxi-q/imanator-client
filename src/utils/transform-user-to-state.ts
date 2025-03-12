import { type TProtectUserData, UserRole } from '@/services/auth/auth.types'

export type TUserDataState = {
	role: UserRole,
	isLoggedIn: boolean
	isAdmin: boolean
}

export const transformUserToState = (
	user: TProtectUserData
): TUserDataState | null => {
	return {
		...user,
		isLoggedIn: true,
		isAdmin: user.role ==  UserRole.ADMIN,
	}
}
