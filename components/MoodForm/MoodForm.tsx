import {
  TextArea,
  VStack,
  Widget,
  TransitionSlide,
  Button,
} from '@revolut/ui-kit'

import { useEffect, useRef } from 'react'
import { RateInput } from './RateInput'
import { useMainButton } from '../../hooks'
import { Mark } from '../../types'
import { useMoodForm } from './useMoodForm'

export const MoodForm = ({
  initialData,
  onSuccess,
}: {
  initialData?: Mark
  onSuccess?: VoidFunction
}) => {
  const { addMainButton, hideMainButton } = useMainButton()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { mood, note, isEditable, updateMood, loading, saveMood } = useMoodForm(
    initialData,
    onSuccess
  )

  useEffect(() => {
    if (mood) {
      addMainButton(saveMood, isEditable ? 'Change mark' : 'Save')
      return
    }

    hideMainButton()

    // return () => hideMainButton()
  }, [addMainButton, hideMainButton, mood, isEditable, saveMood])

  return (
    <Widget bg="light-blue-opaque-30" p="s-24">
      <VStack space="s-24">
        <RateInput value={mood} updateValue={updateMood} />
        <TransitionSlide in={Boolean(mood)}>
          <TextArea
            rows={3}
            value={note}
            ref={textareaRef}
            label="Your thoughts or feelings"
            onChange={(e) => updateMood({ note: e.currentTarget.value })}
          />
        </TransitionSlide>
        {/* в дев режиме рисуем просто кнопку, потому что в телеграме рисуется нативная */}
        {process.env.NODE_ENV === 'development' && (
          <Button onClick={saveMood} disabled={loading}>
            {isEditable ? 'Change mark' : 'Save'}
          </Button>
        )}
      </VStack>
    </Widget>
  )
}
