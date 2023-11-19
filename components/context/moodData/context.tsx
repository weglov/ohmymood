import { createContext, FC } from 'react'
import { useMoodDataProvider } from './useMoodDataProvider'

export const MoodDataContext = createContext<
  ReturnType<typeof useMoodDataProvider> | undefined
>(undefined)

export const MoodDataProvider: FC = ({ children }) => {
  const value = useMoodDataProvider()

  return (
    <MoodDataContext.Provider value={value}>
      {children}
    </MoodDataContext.Provider>
  )
}
