import imagesService from '@/services/images/images.servise';
import { useQuery } from '@tanstack/react-query'

export function useImages() {
	const { refetch, data, isLoading, isRefetching } = useQuery({
    queryKey: ['images'],
    queryFn: () => imagesService.getImages(),
    refetchInterval: 1800000,
    refetchOnWindowFocus: false,
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
