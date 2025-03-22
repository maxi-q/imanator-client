'use client'

import { useTopUpModal } from "@/store/useTopUpModal"
import { TopUpModal } from "./TopUpModal"


export function TopUpModalWrapper() {
  const { isOpen, cards, close, resolve } = useTopUpModal()

  if (!isOpen) return null

  return (
    <TopUpModal
      cards={cards}
      onClose={() => {
        close()
        resolve(null)
      }}
      onSuccess={(result) => {
        resolve(result)
        close()
      }}
    />
  )
}