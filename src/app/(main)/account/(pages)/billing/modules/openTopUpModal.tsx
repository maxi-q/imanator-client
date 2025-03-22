import { useTopUpModal } from '@/store/useTopUpModal';

export interface Card {
  id: string;
  brand: string;
  last4: string;
}

export const openTopUpModal = (cards: Card[]) => {
  return useTopUpModal.getState().open(cards)
}