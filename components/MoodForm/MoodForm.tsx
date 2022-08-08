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
  Box,
  Skeleton,
} from '@revolut/ui-kit'
import { AxiosResponse } from 'axios'

import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Mark } from '../../types'
import { client } from '../../lib/api'

import { useMoodForm, useTelegramInfo } from '../../providers'
import { TotalChart } from '../Charts'
import { History } from './History'
import { RateInput } from './RateInput'
import { useMainButton } from '../../hooks'

export const MoodForm = () => {
  const dateFormat = useDateFormat({ style: 'precise' })
  const mainButton = useMainButton()
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
        <Header.Title>Your Mood Today</Header.Title>
        <Header.Subtitle>{dateFormat(new Date())}</Header.Subtitle>
      </Header>
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
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <VStack>
              <Subheader>
                <Subheader.Title>Your dynamic:</Subheader.Title>
              </Subheader>
              <Widget>{marks && <TotalChart marks={marks} />}</Widget>
            </VStack>
            {marks && <History marks={marks} />}
          </>
        )}
      </VStack>
    </Relative>
  )
}
