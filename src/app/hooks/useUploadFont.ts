import fontsService from '@/services/fonts/fonts.service';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from '@/config/tanstack/queryKeys';
import { MutationKeys } from '@/config/tanstack/mutationKeys';

export function useUploadFont() {
  const queryClient = useQueryClient();

	const { mutate: uploadFont, isPending, error, isSuccess } = useMutation({
    mutationKey: [MutationKeys.UPLOAD_FONT],
    mutationFn: async (file: File) => {
      const fontData = await fontsService.createFont({
        name: `${file.name} ${new Date(file.lastModified).toLocaleDateString()}`,
        fileName: file.name,
        description: 'Автоматически созданное описание'
      });
      await fontsService.uploadFileToS3(file, fontData.id);
      return fontData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FONTS],
        refetchType: 'active'
      });
    },
    onError: () => {
      alert('Не удалось загрузить сообщение')
    }
  });

	return {
		uploadFont,
    isPending,
    error,
    isSuccess
	}
}
