import { AxiosResponse } from 'axios'
import { useCallback, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { WebAppUser, Telegram } from '@twa-dev/types'
import { get } from '@vercel/edge-config'
import { useInterval } from '../../hooks/useInterval'
import { client } from '../../lib/api'
import { tgFake } from './__fake'

const isDev = process.env.NODE_ENV === 'development'

export const useTelegramProvider = () => {
  const mainButtonEvent = useRef(null)
  const [init, setInit] = useState(false)
  const [user, setUser] = useState<WebAppUser | undefined>(undefined)
  const [telegramData, setTelegramData] = useState<Telegram | undefined>(
    undefined
  )

  const { data, isFetched } = useQuery<
    AxiosResponse<{
      status: 'Authorized' | 'Unauthorized'
      user: WebAppUser
      token: string
    }>
  >(
    'init',
    () => client.post('/api/auth', { initData: telegramData?.WebApp.initData }),
    {
      enabled: init,
      retry: false,
      onSuccess: async ({ data: { user, token } }) => {
        setUser(user)
        client.defaults.headers.common['x-token'] = token
      },
    }
  )

  useInterval(
    function initTelegramSession() {
      if (window.Telegram) {
        setTelegramData(isDev ? tgFake : window.Telegram)
        window.Telegram.WebApp.ready()
        setInit(true)
      }
    },
    !init ? 100 : null
  )

  return {
    isInitialized: isFetched && init,
    tg: telegramData,
    user,
    mainButtonEvent,
    status: data?.status,
  }
}
