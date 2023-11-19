import { useContext } from 'react'
import { MoodDataContext } from './context'

export function useMoodData() {
  const context = useContext(MoodDataContext)

  if (context === undefined) {
    throw new Error('useMoodData must be used within a MoodDataContext')
  }

  return context
}
