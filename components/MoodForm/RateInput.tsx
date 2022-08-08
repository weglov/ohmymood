import { Box, RadioGroup, RateEmoji } from '@revolut/ui-kit'
import { useMoodForm } from '../../providers'
import { Mood } from '../../types'

export const options = [
  { value: Mood.Terrible, label: Mood.Terrible, symbol: '😡' },
  { value: Mood.Bad, label: Mood.Bad, symbol: '☹' },
  { value: Mood.Ok, label: Mood.Ok, symbol: '😐' },
  { value: Mood.Good, label: Mood.Good, symbol: '🙂' },
  { value: Mood.Great, label: Mood.Great, symbol: '😊' },
]

export const RateInput = () => {
  const { updateMood, mood } = useMoodForm()

  return (
    <Box width="100%">
      <RadioGroup
        value={mood}
        onChange={(value: Mood) => updateMood({ mood: value })}
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
