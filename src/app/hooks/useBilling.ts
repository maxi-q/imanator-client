import { useMutation, useQueryClient } from '@tanstack/react-query';

import billingService from '@/services/billing/billing.service';
import type { InitPaymentParams } from '@/services/billing/billing.types';

import { MutationKeys } from '@/config/tanstack/mutationKeys';
import { QueryKeys } from '@/config/tanstack/queryKeys';

export const useBilling = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationKey: [MutationKeys.INITIAL_PAYMENT],
    mutationFn: (params: InitPaymentParams) =>
      billingService.initPayment(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROFILE],
        refetchType: 'active'
      });
    },
    onError: (error: Error) => {
      console.error('Payment initialization failed:', error);
    }
  });

  return {
    initPayment: mutate,
    isPending,
    error,
    isError,
    data,
  };
};