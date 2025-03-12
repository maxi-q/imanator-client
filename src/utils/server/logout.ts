import { removeFromStorage } from "@/services/auth/auth.helper"

export const logout = async () => {
  await removeFromStorage()
  return null
}