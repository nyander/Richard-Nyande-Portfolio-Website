import type { Status } from '@/lib/sanity/types'

const STATUS_LABEL: Record<Status, string> = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  concept: 'Concept',
}

export function StatusTag({ status, label }: { status: Status; label?: string }) {
  return (
    <span className={`status-tag status-tag--${status}`}>
      {label ?? STATUS_LABEL[status]}
    </span>
  )
}
