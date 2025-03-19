// hooks/useBilling.ts
import { useMutation } from '@tanstack/react-query';
import billingService from '@/services/billing/billing.service';
import type { InitPaymentParams } from '@/services/billing/billing.types';
import { MutationKeys } from '@/config/tanstack/mutationKeys';

export const useBilling = () => {
  const { mutate, isPending, error, isError, data } = useMutation({
    mutationKey: [MutationKeys.INITIAL_PAYMENT],
    mutationFn: (params: InitPaymentParams) =>
      billingService.initPayment(params),
    onSuccess: () => {
      // TODO: paymentSession
      alert('+')
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