import { useContext } from 'react'
import { TelegramContext } from './'

export function useTelegramInfo() {
  const context = useContext(TelegramContext)

  if (context === undefined) {
    throw new Error('useTelegramInfo must be used within a TelegramProvider')
  }

  return context
}
