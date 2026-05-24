import SectionHeading from '../components/SectionHeading.jsx'
import Button from '../components/Button.jsx'

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">ATOMIC MEDIA / BRAND SYSTEMS</p>
          <h1>
            WE CREATE BRANDS<br />PEOPLE CAN&apos;T IGNORE.
          </h1>
          <p className="muted">
            A component-ready structure for the production UI. Replace this
            content with the final design when wiring the API layer.
          </p>
          <div className="button-row">
            <Button variant="primary">Start a Project</Button>
            <Button variant="ghost">View Portfolio</Button>
          </div>
        </div>
        <div className="hero-panel">
          <h2>HUMAN INSTINCT. DIGITAL VELOCITY.</h2>
          <p className="muted">A modular React surface ready for data.</p>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="THE ATOMIC STACK"
          title="Component-ready services grid"
          subtitle="Swap each card with API-driven content."
        />
        <div className="grid">
          {['Branding', 'Performance', 'Social', 'AI', 'UI/UX', 'Web'].map(
            (label) => (
              <article className="card" key={label}>
                <h3>{label}</h3>
                <p className="muted">Placeholder copy for dynamic data.</p>
              </article>
            )
          )}
        </div>
      </section>
    </div>
  )
}
