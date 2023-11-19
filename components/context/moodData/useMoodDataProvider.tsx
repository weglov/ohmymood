import { AxiosResponse } from 'axios'

import { useQuery } from 'react-query'
import { Mark, Mood } from '../../../types'
import { client } from '../../../lib/api'
import { moodVariant } from './constants'
import { useTelegramInfo } from '../../../providers'

export const useMoodDataProvider = () => {
  const { isInitialized } = useTelegramInfo()
  const { data, isLoading, refetch } = useQuery<
    AxiosResponse<{ marks: Mark[] }>
  >('my-marks', () => client.get('/api/marks'), {
    enabled: isInitialized,
    refetchOnWindowFocus: false,
  })

  const marks = data?.data.marks.map((mark) => ({
    ...mark,
    ...moodVariant[mark.mood],
  }))

  return { data, marks, isLoading, refetch }
}
