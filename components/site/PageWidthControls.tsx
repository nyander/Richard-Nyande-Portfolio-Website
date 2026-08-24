'use client'

import { useEffect } from 'react'
import { useControls } from 'leva'

export function PageWidthControls() {
  const layout = useControls('Page width', {
    left: {
      value: 2,
      min: 0,
      max: 12,
      step: 0.1,
      label: 'Left (rem)',
    },
    right: {
      value: 2,
      min: 0,
      max: 12,
      step: 0.1,
      label: 'Right (rem)',
    },
    maxWidth: {
      value: 75,
      min: 48,
      max: 160,
      step: 1,
      label: 'Max width (rem)',
    },
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--page-pad-left', `${layout.left}rem`)
    root.style.setProperty('--page-pad-right', `${layout.right}rem`)
    root.style.setProperty('--measure-max', `${layout.maxWidth}rem`)
  }, [layout.left, layout.right, layout.maxWidth])

  return null
}
