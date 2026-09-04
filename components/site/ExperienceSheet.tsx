import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { ABOUT, ABOUT_LINKS } from '@/lib/about'
import {
  ABOUT_SHEETS,
  CASE_STUDY_SHEETS,
  aboutSheetIndex,
  aboutSheetOf,
  caseStudyCode,
  caseStudyCodeFromHref,
  caseStudyPath,
  padSheet,
  recordCode,
} from '@/lib/sheets'

function Leader() {
  return <span className="about-sheet-leader" aria-hidden="true" />
}

function SheetLink({
  href,
  external,
  children,
  glyph,
}: {
  href: string
  external?: boolean
  children: ReactNode
  glyph: '↗' | '↓'
}) {
  const mark = (
    <span aria-hidden="true">
      {' '}
      {glyph}
    </span>
  )

  if (external) {
    return (
      <a
        className="about-sheet-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {mark}
      </a>
    )
  }

  return (
    <Link className="about-sheet-link" href={href}>
      {children}
      {mark}
    </Link>
  )
}

function employmentLinkText(href: string, linkLabel: string) {
  const code = caseStudyCodeFromHref(href)
  return code ? `${linkLabel} ${code}` : linkLabel
}

export function ExperienceSheet() {
  const sheet = ABOUT.experience
  const sheetId = 'experience' as const
  const employment = sheet.records
  const capabilities = sheet.capabilities
  const index = aboutSheetIndex(sheetId)

  return (
    <article className="about-sheet" aria-label={ABOUT_SHEETS[index - 1].label}>
      <ul className="about-sheet-holes" aria-hidden="true">
        <li />
        <li />
        <li />
      </ul>

      <header className="about-sheet-identity">
        <p className="about-sheet-index">{aboutSheetOf(sheetId)}</p>
        <div className="about-sheet-identity-row">
          <div className="about-sheet-who">
            <p className="about-sheet-name">{sheet.meta.name}</p>
            <p className="about-sheet-role">{sheet.meta.role}</p>
            <p className="about-sheet-place">
              {sheet.meta.location} · {sheet.meta.status}
            </p>
          </div>
          <a className="about-sheet-cv" href={ABOUT_LINKS.cv} download="richard-nyande.pdf">
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        {CASE_STUDY_SHEETS.length > 0 ? (
          <p className="about-sheet-related">
            <span className="about-sheet-label">Related</span>
            {CASE_STUDY_SHEETS.map((study) => {
              const code = caseStudyCode(study.slug)
              return (
                <SheetLink key={study.slug} href={caseStudyPath(study.slug)} glyph="↗">
                  {code}
                </SheetLink>
              )
            })}
          </p>
        ) : null}
      </header>

      <div className="about-sheet-body">
        <div className="about-sheet-fields">
          <div className="about-sheet-field-row">
            <p className="about-sheet-field">
              <span className="about-sheet-label">Subject</span>
              <span className="about-sheet-value">{sheet.meta.subject}</span>
            </p>
            <Leader />
            <p className="about-sheet-field about-sheet-field-end">
              <span className="about-sheet-label">Date</span>
              <span className="about-sheet-value">{sheet.meta.date}</span>
            </p>
          </div>
          <div className="about-sheet-field-row">
            <p className="about-sheet-field">
              <span className="about-sheet-label">Doc. no.</span>
              <span className="about-sheet-value">{sheet.meta.docNo}</span>
            </p>
            <Leader />
            <p className="about-sheet-field about-sheet-field-end">
              <span className="about-sheet-label">Location</span>
              <span className="about-sheet-value">{sheet.meta.location}</span>
            </p>
          </div>
          <div className="about-sheet-field-row">
            <p className="about-sheet-field">
              <span className="about-sheet-label">Status</span>
              <span className="about-sheet-value">{sheet.meta.status}</span>
            </p>
            <Leader />
            <p className="about-sheet-field about-sheet-field-end">
              <span className="about-sheet-label">Rev</span>
              <span className="about-sheet-value">{sheet.meta.rev}</span>
            </p>
          </div>
        </div>

        <section className="about-sheet-block" aria-labelledby="about-sheet-employment">
          <header className="about-sheet-block-head">
            <span className="about-sheet-block-mark" aria-hidden="true">
              A
            </span>
            <h3 id="about-sheet-employment">Employment</h3>
            <Leader />
            <p className="about-sheet-block-count">
              {padSheet(employment.length)} entries
            </p>
          </header>
          <ol className="about-sheet-records">
            {employment.map((record, recordIndex) => (
              <li key={record.org} className="about-sheet-record">
                <div className="about-sheet-record-head">
                  <span className="about-sheet-ref">
                    {recordCode('EMP', recordIndex)}
                  </span>
                  <span className="about-sheet-org">{record.org}</span>
                  {record.href && record.linkLabel ? (
                    <SheetLink href={record.href} external={record.external} glyph="↗">
                      {employmentLinkText(record.href, record.linkLabel)}
                    </SheetLink>
                  ) : null}
                  <Leader />
                  <span className="about-sheet-dates">{record.dates}</span>
                </div>
                <p className="about-sheet-scope">{record.scope}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-sheet-block" aria-labelledby="about-sheet-capability">
          <header className="about-sheet-block-head">
            <span className="about-sheet-block-mark" aria-hidden="true">
              B
            </span>
            <h3 id="about-sheet-capability">Capability schedule</h3>
            <Leader />
            <p className="about-sheet-block-count">
              {padSheet(capabilities.length)} entries
            </p>
          </header>
          <p id="about-sheet-key" className="about-sheet-key">
            <span className="about-sheet-label">Key</span>
            <span>{sheet.key.discipline}</span>
            <Leader />
            <span className="about-sheet-key-end">{sheet.key.fluency}</span>
          </p>
          <ol className="about-sheet-records" aria-describedby="about-sheet-key">
            {capabilities.map((entry, entryIndex) => (
              <li
                key={entry.name}
                className={
                  entry.class === 'fluency'
                    ? 'about-sheet-record is-fluency'
                    : 'about-sheet-record is-discipline'
                }
              >
                <div className="about-sheet-record-head">
                  <span className="about-sheet-ref">
                    {recordCode('SKL', entryIndex, 2)}
                  </span>
                  <span className="about-sheet-org">{entry.name}</span>
                  <Leader />
                  <span
                    className={
                      entry.class === 'fluency'
                        ? 'about-sheet-chip is-fluency'
                        : 'about-sheet-chip is-discipline'
                    }
                  >
                    {entry.class}
                  </span>
                </div>
                <p className="about-sheet-scope">{entry.items.join(' · ')}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="about-sheet-also">
          <span className="about-sheet-label">Also</span>
          <span>{sheet.also}</span>
          <Leader />
        </p>

        <footer className="about-sheet-foot">
          <div className="about-sheet-foot-row">
            <p className="about-sheet-edu">
              <span className="about-sheet-label">Edu</span>
              <span>{sheet.education}</span>
            </p>
          </div>
          <div className="about-sheet-close">
            <div className="about-sheet-corners">
              <p>{sheet.copyright}</p>
              <p>{sheet.credit}</p>
            </div>
            <div className="about-sheet-mark">
              <Image
                className="about-sheet-mark-logo"
                src="/images/Yande Logo - 1024px.png"
                alt="Yande Studio mark"
                width={3167}
                height={1265}
                sizes="(min-width: 1200px) 95rem, 92vw"
              />
              <Image
                className="about-sheet-signature"
                src="/hero/logo-black.png"
                alt="Richard Nyande"
                width={366}
                height={177}
              />
            </div>
            <p className="about-sheet-auth-label">{sheet.authenticity}</p>
            <div className="about-sheet-auth">
              <p>Doc. no: {sheet.meta.docNo}</p>
              <p>Date: {sheet.meta.date}</p>
              <p>Update: {sheet.meta.rev}</p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}
