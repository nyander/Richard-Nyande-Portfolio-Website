'use client'

import { useEffect, useState } from 'react'
import { Leva } from 'leva'

const MOBILE_QUERY = '(max-width: 800px)'
const IS_PROD = process.env.NODE_ENV === 'production'

export function ClientLeva() {
  const [ready, setReady] = useState(IS_PROD)
  const [mobile, setMobile] = useState(true)

  useEffect(() => {
    if (IS_PROD) {
      return
    }

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
      hidden={IS_PROD || mobile}
      collapsed={false}
      titleBar={{ title: 'Layout', filter: false }}
      theme={{
        sizes: { rootWidth: '240px' },
      }}
    />
  )
}
