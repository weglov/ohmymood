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
import { useMarkData } from '../../hooks/useMarkData'
import { MoodForm } from './MoodForm'

export const MoodFormContent = () => {
  const heySymbol = useRef(shuffle(['👋', '🖖', '🤙'])[0])
  const { user } = useTelegramInfo()
  const { marks, isLoading } = useMarkData()

  return (
    <Relative>
      <Header variant="main">
        <Header.Title>
          Hey,{' '}
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
          <TotalChart marks={marks} />
          <History marks={marks} />
        </VStack>
      )}
    </Relative>
  )
}
