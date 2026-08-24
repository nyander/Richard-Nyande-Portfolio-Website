'use client'

import { useControls } from 'leva'

export function ExperienceSpacer() {
  const spacer = useControls('Experience spacer', {
    height: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      label: 'Height (vh)',
    },
  })

  if (spacer.height <= 0) {
    return null
  }

  return (
    <div
      className="experience-spacer"
      style={{ height: `${spacer.height}vh` }}
      aria-hidden="true"
    />
  )
}
