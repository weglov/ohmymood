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
import { AxiosResponse } from 'axios'

import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { Mark } from '../../types'
import { client } from '../../lib/api'

import { useMoodForm, useTelegramInfo } from '../../providers'
import { TotalChart } from '../Charts'
import { History } from '../History'
import { RateInput } from './RateInput'
import { useMainButton } from '../../hooks'
import { shuffle } from 'lodash'
import { Analytics } from '../Analytics'

export const MoodForm = () => {
  const heySymbol = useRef(shuffle(['👋', '🖖', '🤙'])[0])
  const mainButton = useMainButton()
  const { user } = useTelegramInfo()
  const { mood, updateMood, loading, saveMood } = useMoodForm()

  const { data, isLoading } = useQuery<AxiosResponse<{ marks: Mark[] }>>(
    'my-marks',
    () => client.get('/api/marks')
  )
  const marks = data?.data.marks

  useEffect(() => {
    if (mood) {
      mainButton.setText('Save')
      mainButton.show()
      mainButton.onClick(saveMood)
      return
    }

    mainButton.hide()
  }, [mainButton, mood, saveMood])

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
      <Widget bg="light-blue-opaque-30" p="s-24">
        <VStack space="s-24">
          <RateInput />
          <TransitionSlide in={Boolean(mood)}>
            <TextArea
              rows={3}
              label="Your thoughts or feelings"
              onChange={(e) => updateMood({ note: e.currentTarget.value })}
            />
          </TransitionSlide>
          {process.env.NODE_ENV === 'development' && (
            <Button onClick={saveMood} disabled={loading}>
              Save
            </Button>
          )}
        </VStack>
      </Widget>
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
