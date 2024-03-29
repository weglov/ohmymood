import { Skeleton, Tile, Text, VStack } from '@revolut/ui-kit'
import { countBy, maxBy } from 'lodash'
import { useMemo } from 'react'
import { Mood } from '../../types'
import { useMoodData, moodVariant } from '../context'

export const Overall = () => {
  const { marks, isLoading } = useMoodData()

  const top = useMemo(() => {
    const overAllMood = countBy(marks.slice(0, 10), (mark) => mark.mood)
    let maxProp = null
    let maxValue = -Infinity

    for (const prop in overAllMood) {
      if (overAllMood[prop] > maxValue) {
        maxValue = overAllMood[prop]
        maxProp = prop
      }
    }

    return moodVariant[maxProp as Mood]
  }, [marks])

  return (
    <Tile variant="widget">
      <Tile.Title>
        <Tile.Description variant="small" color="grey-tone-50">
          Overall week
        </Tile.Description>
      </Tile.Title>
      {isLoading && <Skeleton />}
      {!isLoading && top && (
        <Tile.Content mt="s-32">
          <VStack>
            <Text variant="h2" fontSize={'54px'}>
              {top.symbol}
            </Text>
            <Text
              variant={'caption'}
              color="grey-tone-10
            "
            >
              {top.label}
            </Text>
          </VStack>
        </Tile.Content>
      )}
    </Tile>
  )
}
