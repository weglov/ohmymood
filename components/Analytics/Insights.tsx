import { LineChart, Tile } from '@revolut/ui-kit'
import { useMemo } from 'react'
import { useMoodData } from '../context'

export const Insights = () => {
  const { marks } = useMoodData()

  const moods = useMemo(() => {
    let prev = 0
    const overAllMood = marks.reduceRight((acc, mark, index) => {
      const value = prev + mark.weight
      prev = value

      return acc.concat({ value })
    }, [])

    return overAllMood
  }, [marks])

  const lastMark = moods[moods.length - 1]
  const projectedData = [
    { value: lastMark.value + 1 },
    { value: lastMark.value + 4 },
  ]

  return (
    <Tile variant="widget">
      <Tile.Title>
        <Tile.Description variant="small" color="grey-tone-50">
          Your insights
        </Tile.Description>
      </Tile.Title>
      <Tile.Content mt="s-32">
        <LineChart
          role="img"
          variant="small"
          data={moods.slice(-10)}
          projectedData={projectedData}
          aria-label="Spend this week chart"
        />
      </Tile.Content>
    </Tile>
  )
}
