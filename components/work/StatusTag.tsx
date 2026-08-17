import type { Status } from '@/lib/sanity/types'

const STATUS_LABEL: Record<Status, string> = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  concept: 'Concept',
}

export function StatusTag({ status }: { status: Status }) {
  return (
    <span className={`status-tag status-tag--${status}`}>
      {STATUS_LABEL[status]}
    </span>
  )
}
