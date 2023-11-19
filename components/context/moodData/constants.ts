import { Mood } from '../../../types'

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
