import { useCallback, useState } from 'react'
import { Toast, useToast } from '@revolut/ui-kit'
import { Mark, Mood } from '../../types'
import { client } from '../../lib/api'
import { useMutation } from 'react-query'
import { useMainButton } from '../../hooks'
import { useMoodData } from '../context'

type FormData = {
  mood?: Mood
  note: string
}

export const useMoodForm = (initialData?: Mark, onSuccessFn?: VoidFunction) => {
  const mainButton = useMainButton()
  const { refetch } = useMoodData()
  const [isDirty, setDirty] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    note: '',
    mood: null,
    ...initialData,
  })

  const toast = useToast()
  const isEditable = Boolean(initialData?.id)

  const {
    mutate: createMark,
    isLoading,
    isIdle,
  } = useMutation(
    () =>
      isEditable
        ? client.patch('/api/marks', formData)
        : client.post('/api/marks', formData),
    {
      onSuccess: () => {
        setDirty(false)
        setFormData({ mood: null, note: '' })
        mainButton.hideProgress()
        mainButton.hide()
        onSuccessFn && onSuccessFn()
        refetch()
        toast.show(
          <Toast>
            <Toast.Label>Saved! Have a great day.</Toast.Label>
          </Toast>,
          'short'
        )
      },
    }
  )

  const updateMood = useCallback(
    (data: Partial<FormData>) => {
      setFormData({ ...formData, ...data })
    },
    [setFormData, formData]
  )

  const saveMood = useCallback(async () => {
    if (isIdle) {
      mainButton.showProgress(false)
      await createMark()
    }
  }, [createMark, mainButton])

  return {
    ...formData,
    isEditable,
    valid: formData.mood && isDirty,
    updateMood,
    saveMood,
    loading: isLoading,
  }
}
