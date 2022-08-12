import { BottomNav, Sticky, VStack } from '@revolut/ui-kit'
import * as Icons from '@revolut/icons'
import { useState } from 'react'

export const Navigation = () => {
  const [tab, setTab] = useState('home')
  return (
    <Sticky bottom="s-24">
      <BottomNav variant="floating" role="tablist">
        <BottomNav.Item
          role="tab"
          useIcon={Icons.Revolut}
          onClick={() => setTab('home')}
          aria-label="Home"
          aria-selected={tab === 'home'}
        />
        <BottomNav.Item
          role="tab"
          useIcon={Icons.ArrowRightLeft}
          onClick={() => setTab('send')}
          aria-label="Payments"
          aria-selected={tab === 'send'}
        />
        <BottomNav.Item
          role="tab"
          useIcon={Icons.List}
          onClick={() => setTab('hub')}
          aria-label="Hub"
          aria-selected={tab === 'hub'}
        >
          History
        </BottomNav.Item>
      </BottomNav>
    </Sticky>
  )
}
