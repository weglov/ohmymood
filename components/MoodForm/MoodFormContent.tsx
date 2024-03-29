import {
  Header,
  Relative,
  TextArea,
  VStack,
  useDateFormat,
  Widget,
  Subheader,
  TransitionSlide,
  Button,
  Skeleton,
  Text,
  Group,
} from '@revolut/ui-kit'

import { useRef } from 'react'
import { useTelegramInfo } from '../../providers'
import { TotalChart } from '../Charts'
import { History } from '../History'
import { RateInput } from './RateInput'
import { useMainButton } from '../../hooks'
import { shuffle } from 'lodash'
import { Analytics } from '../Analytics'
import { MoodForm } from './MoodForm'
import { useMoodData } from '../context'

export const MoodFormContent = () => {
  const { user } = useTelegramInfo()
  const heySymbol = useRef(shuffle(['👋', '🖖', '🤙'])[0])
  const { marks, isLoading } = useMoodData()

  return (
    <Relative>
      <Header variant="main">
        <Header.Title>
          Hey,&nbsp;
          <Text color="pink">
            {`@${user.username}`} {heySymbol.current}
          </Text>
        </Header.Title>
        <Header.Description>A great day to change your mood</Header.Description>
      </Header>
      <MoodForm />
      {isLoading ? (
        <Skeleton mt="s-24" />
      ) : (
        <VStack space="s-24" pt="s-24">
          <Analytics />
          <TotalChart />
          <History />
        </VStack>
      )}
    </Relative>
  )
}
