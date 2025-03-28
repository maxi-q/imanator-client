import { QueryKeys } from '@/config/tanstack/queryKeys';
import fontsService from '@/services/fonts/fonts.service';
import { useQuery } from '@tanstack/react-query'

export function useFonts() {
	const { refetch, data, isLoading, isRefetching } = useQuery({
    queryKey: [QueryKeys.FONTS],
    queryFn: () => fontsService.getFonts(),
    refetchInterval: 1800000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

	const fonts = data?.fonts || []

	return {
		isLoading,
    refetch,
    isRefetching,
		fonts: [
			...fonts
		]
	}
}
