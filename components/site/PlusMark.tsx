type PlusMarkProps = {
  className?: string
}

export function PlusMark({ className }: PlusMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M12 7.25v9.5M7.25 12h9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  )
}
