import { Box, RadioGroup, RateEmoji } from '@revolut/ui-kit'
import { Mood } from '../../types'

export const options = [
  { value: Mood.Terrible, label: Mood.Terrible, symbol: '😡' },
  { value: Mood.Bad, label: Mood.Bad, symbol: '☹' },
  { value: Mood.Ok, label: Mood.Ok, symbol: '😐' },
  { value: Mood.Good, label: Mood.Good, symbol: '🙂' },
  { value: Mood.Great, label: Mood.Great, symbol: '😊' },
]

export const RateInput = ({
  value,
  updateValue,
}: {
  value: Mood
  updateValue: (data: { mood: Mood }) => any
}) => {
  return (
    <Box width="100%">
      <RadioGroup
        value={value}
        onChange={(value: Mood) => updateValue({ mood: value })}
      >
        {(group) => (
          <RateEmoji variant="faded" checked={group.value !== null}>
            {options.map(({ value, label, symbol }) => (
              <RateEmoji.Item
                {...group.getInputProps({ value })}
                key={value}
                symbol={symbol}
              >
                {label}
              </RateEmoji.Item>
            ))}
          </RateEmoji>
        )}
      </RadioGroup>
    </Box>
  )
}
