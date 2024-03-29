import {
  Item,
  Group,
  RateEmoji,
  useDateTimeFormat,
  Subheader,
  Text,
  Button,
  Modal,
  Box,
  Absolute,
  TextArea,
  VStack,
} from '@revolut/ui-kit'
import { TransitionSlideDown } from '@revolut/ui-kit/legacy'
import { useState } from 'react'
import { useMainButton } from '../hooks'
import { Mark, Mood } from '../types'
import { useMoodData } from './context'
import { MoodForm } from './MoodForm'

type Props = {
  marks: Mark[]
}

export const symbol = {
  [Mood.Terrible]: '😡',
  [Mood.Bad]: '☹',
  [Mood.Ok]: '😐',
  [Mood.Good]: '🙂',
  [Mood.Great]: '😊',
}

const OFFSET = 5

export const History = () => {
  const dateFormat = useDateTimeFormat()
  const { marks } = useMoodData()
  const marksSize = marks.length
  const mainButton = useMainButton()
  const [changableMark, setChangeMark] = useState<null | Mark>(null)
  const [offset, setOffset] = useState(OFFSET)
  const hasMore = offset < marksSize
  const onClose = () => {
    setChangeMark(null)
    mainButton.hide()
  }

  return (
    <Group>
      <Subheader>
        <Subheader.Title>History</Subheader.Title>
      </Subheader>
      {marks.slice(0, offset).map((mark) => (
        <Item
          use={'button'}
          key={mark.id}
          variant="disclosure"
          onClick={() => setChangeMark(mark)}
          useIcon={
            <RateEmoji variant="faded" size="sm">
              <RateEmoji.Item symbol={symbol[mark.mood]} />
            </RateEmoji>
          }
        >
          <Item.Content>
            <Item.Title>
              <Text variant={'caption'}>
                {dateFormat(new Date(mark.createdAt))}
              </Text>
            </Item.Title>
            <Item.Description>
              <Text style={{ whiteSpace: 'pre-line' }}>{mark.note}</Text>
            </Item.Description>
          </Item.Content>
          {/* <Item.Side>
            <Item.Value>
              <Text variant={'caption'}>{mark.mood} </Text>
            </Item.Value>
          </Item.Side> */}
        </Item>
      ))}

      {hasMore && (
        <Button onClick={() => setOffset(offset + OFFSET)} variant="secondary">
          Show more
        </Button>
      )}
      <Modal
        isOpen={Boolean(changableMark)}
        scrollLock
        onRequestClose={() => onClose()}
      >
        <Absolute bottom={0} width="100%">
          <Box
            bg="background"
            width={'100%'}
            radius="card-top"
            elevation={600}
            p="s-24"
          >
            <MoodForm initialData={changableMark} onSuccess={() => onClose()} />
          </Box>
          <Modal.CloseButton aria-label="Close" onClick={() => onClose()} />
        </Absolute>
      </Modal>
    </Group>
  )
}
