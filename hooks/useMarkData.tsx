import { AxiosResponse } from 'axios'

import { useQuery } from 'react-query'
import { Mark, Mood } from '../types'
import { client } from '../lib/api'

export const moodVariant = {
  [Mood.Terrible]: {
    value: Mood.Terrible,
    label: Mood.Terrible,
    symbol: '😡',
    weight: -2,
  },
  [Mood.Bad]: { value: Mood.Bad, label: Mood.Bad, symbol: '☹', weight: -1 },
  [Mood.Ok]: { value: Mood.Ok, label: Mood.Ok, symbol: '😐', weight: 1 },
  [Mood.Good]: { value: Mood.Good, label: Mood.Good, symbol: '🙂', weight: 2 },
  [Mood.Great]: {
    value: Mood.Great,
    label: Mood.Great,
    symbol: '😊',
    weight: 3,
  },
}

export const useMarkData = () => {
  const { data, isLoading } = useQuery<AxiosResponse<{ marks: Mark[] }>>(
    'my-marks',
    () => client.get('/api/marks'),
    {
      staleTime: 1000,
    }
  )
  const marks = data?.data.marks.map((mark) => ({
    ...mark,
    ...moodVariant[mark.mood],
  }))

  return { data, marks, isLoading }
}
