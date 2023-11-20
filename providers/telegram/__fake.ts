import EventEmitter from 'events'

const ee = new EventEmitter()

export const tgFake: any = {
  WebApp: {
    initData:
      'query_id=AAFSiAYAAAAAAFKIBgDWj8eu&user=%7B%22id%22%3A428114%2C%22first_name%22%3A%22Viktor%22%2C%22last_name%22%3A%22Shcheglov%22%2C%22username%22%3A%22scheglov%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1655058380&hash=4ec6759cffa87e8fc22ffc8e0faee3ab010eab63e12f7de4d2efc2a1d18e2b84',
    // "initData":"query_id=AAFSiAYAAAAAAFKIBgA55TGX&user=%7B%22id%22%3A428114%2C%22first_name%22%3A%22Viktor%22%2C%22last_name%22%3A%22Shcheglov%22%2C%22username%22%3A%22scheglov%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1655050862&hash=cfd4dc56db11763828a1a3ffa6409cf190a8e3bc146ac1cd3cce70695a57756b",
    initDataUnsafe: {
      query_id: 'AAFSiAYAAAAAAFKIBgA55TGX',
      user: {
        id: 428114,
        is_bot: false,
        first_name: 'Viktor',
        last_name: 'Shcheglov',
        username: 'scheglov',
        language_code: 'en',
      },
      auth_date: 1655050862,
      hash: 'cfd4dc56db11763828a1a3ffa6409cf190a8e3bc146ac1cd3cce70695a57756b',
    },
    // "version":"6.0",
    colorScheme: 'light',
    themeParams: {
      bg_color: '#ffffff',
      hint_color: '#999999',
      button_text_color: '#ffffff',
      link_color: '#2481cc',
      button_color: '#2481cc',
      text_color: '#000000',
    },
    isExpanded: true,
    viewportHeight: 450,
    viewportStableHeight: 450,
    // "headerColor":"#ffffff",
    // "backgroundColor":null,
    // "BackButton":{"isVisible":false},
    MainButton: {
      text: 'CONTINUE',
      color: '#2481cc',
      textColor: '#ffffff',
      isVisible: false,
      isProgressVisible: false,
      isActive: true,
      hide: () => {
        console.log('hide')
      },
      show: () => {
        console.log('show')
      },
      hideProgress: () => {
        console.log('hide')
      },
      showProgress: () => {
        console.log('show')
      },
      enable: () => console.log('enabled'),
      disable: () => console.log('disable'),
      onClick: (event: VoidFunction) => {
        console.log('onClick')

        ee.addListener('onClick', event)
      },
      offClick: (event: VoidFunction) => {
        console.log('offClick')
        ee.removeListener('onClick', event)
        console.log(ee)
      },
      setText: (text) => {
        console.log('setText', text)
      },
    },
    onEvent: () => console.log('fff'),
    // "HapticFeedback":{}
  },
}
