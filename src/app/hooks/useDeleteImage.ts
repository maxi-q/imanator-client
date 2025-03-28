import imagesService from '@/services/images/images.service';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from '@/config/tanstack/queryKeys';
import { MutationKeys } from '@/config/tanstack/mutationKeys';

export function useDeleteImage() {
  const queryClient = useQueryClient();

	const { mutate: deleteImage, isPending } = useMutation({
    mutationKey: [MutationKeys.DELETE_IMAGE],
    mutationFn: (imageId: string) =>
      imagesService.deleteImage({id: imageId}),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.IMAGES],
      });
    },
    onError: () => {
      alert('Не удалось удалить изображение')
    }
  });

	return {
		deleteImage,
    isPending,
	}
}
