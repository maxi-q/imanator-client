'use server'; // Добавьте эту директиву

import authService, { EnumTokens } from '@/services/auth/auth.service';
import { cookies } from 'next/headers';
import { saveAccessTokenStorage, saveRefreshTokenStorage } from '@/services/auth/auth.helper';

export async function ref_tokens() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(EnumTokens.REFRESH_TOKEN)?.value || '';

  const response = await authService.getNewTokensByRefresh(refreshToken);

  await saveAccessTokenStorage(response.accessToken);
  await saveRefreshTokenStorage(response.refreshToken);
}