import {
  BarChart,
  Carousel,
  Group,
  LineChart,
  PieChart,
  Skeleton,
  Subheader,
  Tile,
  Text,
  RateEmoji,
  VStack,
} from '@revolut/ui-kit'
import { countBy, maxBy } from 'lodash'
import { useMemo } from 'react'
import { moodVariant, useMarkData } from '../../hooks/useMarkData'
import { useMoodForm } from '../../providers'
import { Mood } from '../../types'

export const ZeroStat = () => {
  const { marks, isLoading } = useMarkData()

  const moods = useMemo(() => {
    const overAllMood = countBy(marks.slice(0, 10), (mark) => mark.mood)

    return overAllMood
  }, [marks])

  const data = useMemo(
    () =>
      Object.keys(moodVariant).map((key) => ({
        value: moods[key],
        label: moodVariant[key].symbol,
      })),
    [moods]
  )

  console.log(data)

  return (
    <Tile variant="widget">
      <Tile.Title>
        <Tile.Description variant="small" color="grey-tone-50">
          In a week.
        </Tile.Description>
      </Tile.Title>
      <Tile.Content mt="s-32">
        <BarChart
          role="img"
          variant="small"
          data={data}
          aria-label="Spend this week chart"
        />
      </Tile.Content>
    </Tile>
  )
}
