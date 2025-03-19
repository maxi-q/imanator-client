import { QueryKeys } from '@/config/tanstack/queryKeys';
import userService from '@/services/user.service'
import { transformUserToState } from '@/utils/transform-user-to-state'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: () => userService.fetchProfile(),
    staleTime: 30 * 60 * 1000, // 30 минут
    retry: 2,
  });

  const profile = data?.data;
  const userState = profile ? transformUserToState(profile) : null;

  return {
    isLoading,
    isError,
    error,
    profile: profile ? {
      ...profile,
      ...userState
    } : null
  };
}