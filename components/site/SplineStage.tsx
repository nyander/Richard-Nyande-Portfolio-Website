'use client'

import {
  Component,
  type CSSProperties,
  type ReactNode,
  type Ref,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import type { Application } from '@splinetool/runtime'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

type SplineStageProps = {
  scene: string
  label: string
  className: string
  stageClassName?: string
  splineClassName?: string
  frameRef?: Ref<HTMLDivElement>
  stageRef?: Ref<HTMLDivElement>
  renderOnDemand?: boolean
  onLoad?: (app: Application) => void
  style?: CSSProperties
  splineStyle?: CSSProperties
}

export function LoadScreen({ label }: { label: string }) {
  return (
    <div className="load-screen" role="status" aria-live="polite">
      <span className="load-screen-mark" aria-hidden="true" />
      <span className="load-screen-label">{label}</span>
    </div>
  )
}

class SplineGuard extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export function SplineStage({
  scene,
  label,
  className,
  stageClassName,
  splineClassName,
  frameRef,
  stageRef,
  renderOnDemand = false,
  onLoad,
  style,
  splineStyle,
}: SplineStageProps) {
  const [ready, setReady] = useState(false)
  const classes = ready ? `${className} is-ready` : className

  return (
    <div ref={frameRef} className={classes} style={style}>
      {ready ? null : <LoadScreen label={label} />}
      <SplineGuard fallback={<LoadScreen label={label} />}>
        <div ref={stageRef} className={stageClassName}>
          <Spline
            scene={scene}
            className={splineClassName}
            style={splineStyle}
            renderOnDemand={renderOnDemand}
            onLoad={(app) => {
              setReady(true)
              onLoad?.(app)
            }}
          />
        </div>
      </SplineGuard>
    </div>
  )
}
