import {
  Carousel,
  Footnote,
  Group,
  Box,
  Skeleton,
  Subheader,
} from '@revolut/ui-kit'
import { useMoodData } from '../context'
import { Insights } from './Insights'
import { Overall } from './Overall'
import { ZeroStat } from './ZeroStat'

export const Analytics = () => {
  const { marks, isLoading } = useMoodData()

  if (isLoading) {
    return <Skeleton />
  }

  if (!marks.length) {
    return (
      <Group>
        <Subheader>
          <Subheader.Title>Analytics</Subheader.Title>
        </Subheader>
        <Footnote>Not enough data, fill in the mood at least once.</Footnote>
        <Box pb="s-16" />
      </Group>
    )
  }

  return (
    <Group>
      <Subheader>
        <Subheader.Title>Analytics</Subheader.Title>
      </Subheader>
      <Carousel align="side" aria-label="Analytics charts">
        <Carousel.Item width={1 / 3} minWidth={150}>
          <Overall key={'overall'} />
        </Carousel.Item>
        <Carousel.Item width={1 / 3} minWidth={150}>
          <Insights key="Insights" />
        </Carousel.Item>
        <Carousel.Item width={1 / 3} minWidth={150}>
          <ZeroStat key="zerostat" />
        </Carousel.Item>
      </Carousel>
    </Group>
  )
}
