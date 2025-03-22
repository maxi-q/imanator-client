import { Card } from '@/app/(main)/account/(pages)/billing/modules/openTopUpModal'
import { create } from 'zustand'

type ModalStore = {
  isOpen: boolean
  cards: Card[]
  resolver: ((result: any) => void) | null
  open: (cards: Card[]) => Promise<unknown>
  close: () => void
  resolve: (value: unknown) => void
}

export const useTopUpModal = create<ModalStore>((set) => ({
  isOpen: false,
  cards: [],
  resolver: null,
  open: (cards) => {
    return new Promise((resolve) => {
      set({ isOpen: true, cards, resolver: resolve })
    })
  },
  close: () => set({ isOpen: false, cards: [], resolver: null }),
  resolve: (value) => {
    set((state) => {
      state.resolver?.(value)
      return { isOpen: false, cards: [], resolver: null }
    })
  }
}))