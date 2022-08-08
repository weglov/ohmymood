import { useEffect, useRef } from 'react'
import { useTelegramInfo } from '../providers'
import { tgFake } from '../providers/telegram/__fake'

export const useMainButton = () => {
  const { isInitialized } = useTelegramInfo()
  const ref = useRef<MainButton>(
    tgFake.WebApp.MainButton as unknown as MainButton
  )

  useEffect(() => {
    ref.current = window?.Telegram?.WebApp?.MainButton
  }, [isInitialized])

  return ref.current
}
