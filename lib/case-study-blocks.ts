let keyCount = 0

function key(prefix = 'k') {
  keyCount += 1
  return `${prefix}${keyCount}`
}

export function resetCaseStudyKeys() {
  keyCount = 0
}

export function blocks(text: string) {
  return [
    {
      _type: 'block' as const,
      _key: key('b'),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span' as const,
          _key: key('s'),
          text,
          marks: [],
        },
      ],
    },
  ]
}

export function decision(title: string, detail: string) {
  return {
    _type: 'decisionItem' as const,
    _key: key('d'),
    title,
    detail,
  }
}

export function quote(quoteText: string, name: string, role?: string) {
  return {
    _type: 'attributedQuote' as const,
    _key: key('q'),
    quote: quoteText,
    name,
    role,
  }
}

export function fact(label: string, value: string) {
  return {
    _type: 'contextFact' as const,
    _key: key('f'),
    label,
    value,
  }
}
