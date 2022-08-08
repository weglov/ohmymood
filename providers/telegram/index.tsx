import { createContext, FC } from 'react'
import { useTelegramProvider } from './useTelegramProvider'

export * from './useTelegramInfo'

export const TelegramContext = createContext<
  ReturnType<typeof useTelegramProvider> | undefined
>(undefined)

export const TelegramProvider: FC = ({ children }) => {
  const value = useTelegramProvider()

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
