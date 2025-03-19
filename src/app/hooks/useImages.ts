import { QueryKeys } from '@/config/tanstack/queryKeys';
import imagesService from '@/services/images/images.service';
import { useQuery } from '@tanstack/react-query'

export function useImages() {
	const { refetch, data, isLoading, isRefetching } = useQuery({
    queryKey: [QueryKeys.IMAGES],
    queryFn: () => imagesService.getImages(),
    refetchInterval: 1800000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

	const images = data?.images || []

	return {
		isLoading,
    refetch,
    isRefetching,
		images: [
			...images
		]
	}
}
