import Image from 'next/image'
import { AboutCollage } from '@/components/site/AboutCollage'
import { ExperienceSheet } from '@/components/site/ExperienceSheet'
import { ExperienceSpacer } from '@/components/site/ExperienceSpacer'
import { MutedClip } from '@/components/site/MutedClip'
import { OffClockRoll } from '@/components/site/OffClockRoll'
import { Reveal } from '@/components/motion/Reveal'
import { SheetUnroll } from '@/components/site/SheetUnroll'
import { ABOUT, ABOUT_LINKS } from '@/lib/about'
import { aboutSheetEyebrow, padSheet, recordCode, type AboutSheetId } from '@/lib/sheets'

function SectionChrome({
  sheet,
  heading,
  headingId,
}: {
  sheet: AboutSheetId
  heading: string
  headingId: string
}) {
  return (
    <>
      <p className="section-eyebrow">{aboutSheetEyebrow(sheet)}</p>
      <h2 id={headingId}>{heading}</h2>
    </>
  )
}

export function AboutPage() {
  return (
    <article className="about-page">
      <section id="opening" className="about-band about-opening" aria-labelledby="about-heading">
        <Reveal>
          <header className="case-study-masthead">
            <h1 id="about-heading">{ABOUT.opening.heading}</h1>
            <div className="case-study-role">
              <span className="case-study-role-label">{ABOUT.opening.roleLabel}</span>
              <span className="case-study-role-value pre-line">{ABOUT.opening.role}</span>
            </div>
          </header>
          <p className="case-study-hero-summary">{ABOUT.opening.lede}</p>
        </Reveal>
      </section>

      <section id="now" className="about-band" aria-labelledby="now-heading">
        <Reveal>
          <SectionChrome
            sheet="now"
            heading={ABOUT.now.label}
            headingId="now-heading"
          />
          <dl className="about-facts">
            {ABOUT.now.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section id="how-i-work" className="about-band" aria-labelledby="methods-heading">
        <Reveal>
          <header className="about-methods-head">
            <div>
              <SectionChrome
                sheet="how-i-work"
                heading={ABOUT.methods.label}
                headingId="methods-heading"
              />
            </div>
            <p className="about-methods-count">
              {padSheet(ABOUT.methods.items.length)} entries
            </p>
          </header>
        </Reveal>
        <ol className="about-methods">
          {ABOUT.methods.items.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 80} className="about-method">
              <p className="about-method-mark" aria-hidden="true">
                {padSheet(index + 1)}
              </p>
              <p className="about-method-project">{item.project}</p>
              <h3>{item.title}</h3>
              <p className="about-method-body">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="who-i-am" className="about-band about-identity-band" aria-labelledby="identity-heading">
        <div className="about-identity">
          <AboutCollage />
          <Reveal className="about-identity-copy">
            <div className="about-identity-intro">
              <SectionChrome
                sheet="who-i-am"
                heading={ABOUT.identity.label}
                headingId="identity-heading"
              />
            </div>
            <div className="about-identity-body">
              {ABOUT.identity.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="what-drives-me" className="about-band about-drive" aria-labelledby="drive-heading">
        <Reveal>
          <SectionChrome
            sheet="what-drives-me"
            heading={ABOUT.drive.label}
            headingId="drive-heading"
          />
          <div className="about-drive-copy">
            {ABOUT.drive.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <SheetUnroll
        labelledBy="experience-heading"
        standard={
          <section
            id="the-standard"
            className="about-standard"
            aria-labelledby="standard-heading"
          >
            <div className="about-standard-inner">
              <Reveal>
                <SectionChrome
                  sheet="the-standard"
                  heading={ABOUT.standard.label}
                  headingId="standard-heading"
                />
                <blockquote>
                  <p>{ABOUT.standard.quote}</p>
                  <footer>{ABOUT.standard.attribution}</footer>
                </blockquote>
              </Reveal>
            </div>
          </section>
        }
      >
        <div className="about-sheet-chrome">
          <SectionChrome
            sheet="experience"
            heading={ABOUT.experience.label}
            headingId="experience-heading"
          />
        </div>
        <ExperienceSheet />
      </SheetUnroll>

      <ExperienceSpacer />

      <section id="off-the-clock" className="about-band about-offclock" aria-labelledby="off-clock-heading">
        <Reveal>
          <header className="about-offclock-head">
            <div>
              <SectionChrome
                sheet="off-the-clock"
                heading={ABOUT.offClock.label}
                headingId="off-clock-heading"
              />
            </div>
            <p className="about-offclock-lede">{ABOUT.offClock.lede}</p>
          </header>
        </Reveal>
        <OffClockRoll>
          {ABOUT.offClock.frames.map((frame, index) => {
            const code = recordCode('FR', index, 2)
            return (
              <Reveal
                as="li"
                key={frame.id}
                delay={index * 70}
                className={`about-offclock-frame is-${frame.shape}`}
              >
                <figure className="about-media">
                  <div className="about-media-frame">
                    {frame.kind === 'mov' && 'src' in frame && frame.src ? (
                      <MutedClip
                        className="about-offclock-clip"
                        src={frame.src}
                        label={
                          frame.place
                            ? `Muted clip — ${frame.place}`
                            : `Muted clip ${code}`
                        }
                      />
                    ) : null}
                    {frame.kind === 'still' && 'src' in frame && frame.src ? (
                      <Image
                        className="about-offclock-clip"
                        src={frame.src}
                        alt={
                          frame.place
                            ? `${frame.place} — off the clock`
                            : `Still ${code}`
                        }
                        fill
                        sizes="(min-width: 900px) 22vw, 45vw"
                      />
                    ) : null}
                    {frame.kind === 'mov' ? (
                      <span className="about-offclock-tag" aria-hidden="true">
                        MOV
                      </span>
                    ) : null}
                  </div>
                  <figcaption>
                    <span className="about-offclock-code">
                      {code}
                      {frame.place ? ` ${frame.place}` : ''}
                    </span>
                    {'caption' in frame && frame.caption ? (
                      <p className="about-offclock-copy">{frame.caption}</p>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </OffClockRoll>
        <footer className="about-offclock-foot">
          <p>{ABOUT.offClock.note}</p>
          <span className="about-offclock-leader" aria-hidden="true" />
          <p>{padSheet(ABOUT.offClock.frames.length)} frames</p>
        </footer>
      </section>

      <section id="close" className="about-close" aria-labelledby="close-heading">
        <div className="about-close-inner">
          <Reveal>
            <h2 id="close-heading" className="visually-hidden">
              Contact
            </h2>
            <div className="about-close-row">
              <p>{ABOUT.close.pitch}</p>
              <ul>
                <li>
                  <a href={ABOUT_LINKS.mailto}>Email</a>
                </li>
                <li>
                  <a
                    href={ABOUT_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={ABOUT_LINKS.cv} download="richard-nyande.pdf">
                    CV
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
