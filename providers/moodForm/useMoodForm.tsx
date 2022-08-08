import { useContext } from 'react'
import { MoodFormContext } from '.'

export function useMoodForm() {
  const context = useContext(MoodFormContext)

  if (context === undefined) {
    throw new Error('useMoodForm must be used within a MoodFormContext')
  }

  return context
}
