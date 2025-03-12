export enum UserRole {
	USER = 'DEFAULT',
	ADMIN = 'ADMIN'
}

export interface ITokenInside {
  "sub": string,
  "role": UserRole,
  "type": "ACCESS" | "REFRESH",
  "iat": number,
  "exp": number
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp' | 'type' | 'sub'>
