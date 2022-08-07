import {Item, Group, RateEmoji, useDateTimeFormat, Subheader, Box} from '@revolut/ui-kit'
import { Mark, Mood } from "../../types"

type Props = {
  marks: Mark[]
}

export const symbol = {
  [Mood.Terrible]: "😡",
  [Mood.Bad]: "☹",
  [Mood.Ok]: "😐",
  [Mood.Good]: "🙂",
  [Mood.Great]: "😊",
};

export const History = ({marks}: Props) => {
  const dateFormat = useDateTimeFormat()

  return <Group>
    <Box px='s-24'>
  <Subheader>
  <Subheader.Title>History:</Subheader.Title>
</Subheader>
</Box>
    {marks.slice(0, 10).map((mark) => (
    <Item>
  <Item.Avatar>
  <RateEmoji variant='faded' size='sm'>
    <RateEmoji.Item symbol={symbol[mark.mood]}/>
    </RateEmoji>
  </Item.Avatar>
  <Item.Content>
    <Item.Title>{mark.mood}</Item.Title>
    <Item.Description>{mark.note}</Item.Description>
  </Item.Content>
  <Item.Side>
    <Item.Value>{dateFormat(new Date(mark.createdAt))}</Item.Value>
  </Item.Side>
</Item>))}
  </Group>
}