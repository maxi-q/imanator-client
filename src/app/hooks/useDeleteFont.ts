import fontsService from '@/services/fonts/fonts.service';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from '@/config/tanstack/queryKeys';
import { MutationKeys } from '@/config/tanstack/mutationKeys';

export function useDeleteFont() {
  const queryClient = useQueryClient();

	const { mutate: deleteFont, isPending } = useMutation({
    mutationKey: [MutationKeys.DELETE_FONT],
    mutationFn: (fontId: string) =>
      fontsService.deleteFont({id: fontId}),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.FONTS],
      });
    },
    onError: () => {
      alert('Не удалось удалить шрифт')
    }
  });

	return {
		deleteFont,
    isPending,
	}
}
