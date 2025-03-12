'use server'

import authService, { EnumTokens } from '@/services/auth/auth.service';
import { ITokenInside } from '@/services/auth/auth.types';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { transformUserToState, TUserDataState } from '../transform-user-to-state';

export async function getServerAuth(): Promise<TUserDataState | null> {
  const JWT_SECRET = process.env.JWT_SECRET;

  const cookieStore = await cookies();

  let accessToken = cookieStore.get(EnumTokens.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(EnumTokens.REFRESH_TOKEN)?.value;

  if (!refreshToken) return null;

  try {
    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken || '',
      new TextEncoder().encode(`${JWT_SECRET}`)
    );

    if (!payload) throw Error('Invalid access token');

    return transformUserToState(payload);
  } catch {
    try {
      const response = await authService.getNewTokensByRefresh(refreshToken);
      accessToken = response.accessToken;
    } catch {
      return null;
    }

    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken || '',
      new TextEncoder().encode(`${JWT_SECRET}`)
    );

    if (!payload) return null;

    return transformUserToState(payload);
  }
}