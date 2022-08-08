import { createContext, FC } from 'react'
import { useMoodFormProvider } from './useMoodFormProvider'

export * from './useMoodForm'

export const MoodFormContext = createContext<
  ReturnType<typeof useMoodFormProvider> | undefined
>(undefined)

export const MoodFormProvider: FC = ({ children }) => {
  const value = useMoodFormProvider()

  return (
    <MoodFormContext.Provider value={value}>
      {children}
    </MoodFormContext.Provider>
  )
}
