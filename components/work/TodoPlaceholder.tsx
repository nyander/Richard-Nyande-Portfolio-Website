type TodoPlaceholderProps = {
  label: string
  className?: string
}

export function TodoPlaceholder({ label, className }: TodoPlaceholderProps) {
  return (
    <p className={className ? `todo-placeholder ${className}` : 'todo-placeholder'}>
      [NEEDS RICHARD] {label}
    </p>
  )
}
