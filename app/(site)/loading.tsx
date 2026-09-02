import { PageLoader } from '@/components/site/PageLoader'

export default function Loading() {
  return (
    <div className="page-loader-route" role="status" aria-live="polite" aria-label="Loading">
      <PageLoader />
    </div>
  )
}
