import imagesService from '@/services/images/images.servise';
import { useQuery } from '@tanstack/react-query'

export function useImages() {
	const { data, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: () => imagesService.getImages(),
    refetchInterval: 1800000,
  });

	const images = data?.images || []

	return {
		isLoading,
		images: [
			...images
		]
	}
}
