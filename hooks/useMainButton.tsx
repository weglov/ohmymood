import { useCallback, useEffect, useRef } from 'react'
import { useTelegramInfo } from '../providers'
import { tgFake } from '../providers/telegram/__fake'
import { MainButton } from '@twa-dev/types'

export const useMainButton = () => {
  const { isInitialized, mainButtonEvent } = useTelegramInfo()
  const ref = useRef<MainButton>(
    tgFake.WebApp.MainButton as unknown as MainButton
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
