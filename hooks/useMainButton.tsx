import { useCallback, useEffect, useRef } from 'react'
import { useTelegramInfo } from '../providers'
import { tgFake } from '../providers/telegram/__fake'
import { MainButton } from '@twa-dev/types'

const isDev = process.env.NODE_ENV === 'development'

export const useMainButton = () => {
  const { isInitialized, mainButtonEvent } = useTelegramInfo()
  console.log()
  const ref = useRef<MainButton>(
    isDev ? tgFake.WebApp.MainButton : window?.Telegram?.WebApp?.MainButton
  )

  useEffect(() => {
    ref.current = window?.Telegram?.WebApp?.MainButton
  }, [isInitialized])

  const mainButton = ref.current

  const reset = () => {
    if (mainButtonEvent.current) {
      mainButton.offClick(mainButtonEvent.current)
      mainButtonEvent.current = null
    }
  }

  const addMainButton = useCallback(
    (event: VoidFunction, text: string) => {
      reset()

      mainButton.setText(text)
      mainButton.show()
      mainButton.onClick(event)
      mainButtonEvent.current = event
    },
    [mainButtonEvent]
  )

  const hideMainButton = useCallback(() => {
    mainButton.hide()
    reset()
  }, [])

  return { addMainButton, hideMainButton, ...ref.current }
}
