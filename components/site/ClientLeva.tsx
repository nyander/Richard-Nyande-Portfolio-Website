'use client'

import { useEffect, useState } from 'react'
import { Leva } from 'leva'

const MOBILE_QUERY = '(max-width: 800px)'

export function ClientLeva() {
  const [ready, setReady] = useState(false)
  const [mobile, setMobile] = useState(true)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const sync = () => setMobile(media.matches)
    sync()
    setReady(true)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (!ready) {
    return null
  }

  return (
    <Leva
      hidden={mobile}
      collapsed={false}
      titleBar={{ title: 'Layout', filter: false }}
      theme={{
        sizes: { rootWidth: '240px' },
      }}
    />
  )
}
