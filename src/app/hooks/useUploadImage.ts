import imagesService from '@/services/images/images.service';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from '@/config/tanstack/queryKeys';
import { MutationKeys } from '@/config/tanstack/mutationKeys';

export function useUploadImage() {
  const queryClient = useQueryClient();

	const { mutate: uploadImage, isPending, error, isSuccess } = useMutation({
    mutationKey: [MutationKeys.UPLOAD_IMAGE],
    mutationFn: async (file: File) => {
      const imageData = await imagesService.createImage({
        name: `${file.name} ${new Date(file.lastModified).toLocaleDateString()}`,
        fileName: file.name,
        description: 'Автоматически созданное описание'
      });
      await imagesService.uploadFileToS3(file, imageData.id);
      return imageData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.IMAGES],
        refetchType: 'active'
      });
    },
    onError: () => {
      alert('Не удалось загрузить сообщение')
    }
  });

	return {
		uploadImage,
    isPending,
    error,
    isSuccess
	}
}
