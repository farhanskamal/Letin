import { Link } from "react-router-dom";
import {
  PROJECT,
  PROBLEM,
  SOLUTION,
  TARGET_AUDIENCE,
  IMPLEMENTATION,
  CHALLENGES,
  COMMUNITY,
} from "@/lib/capstoneContent";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="card-surface scroll-mt-24 p-6 sm:p-8" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="font-display mb-4 text-2xl font-bold text-letin-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function MissionPage() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-letin-yellow">
          {PROJECT.capstoneCourse}
        </p>
        <h1 className="font-display mb-3 text-3xl font-bold text-white sm:text-4xl">
          {PROJECT.title}
        </h1>
        <p className="text-lg text-white/80">{PROJECT.subtitle}</p>
        <p className="mt-4 text-sm text-white/60">
          This page documents the initiative proposal, implementation plan, and community strategy
          for the Senior Capstone Breaking Barriers project.
        </p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2" aria-label="On this page">
        {[
          ["problem", "Problem"],
          ["solution", "Solution"],
          ["audience", "Audience"],
          ["implementation", "Implementation"],
          ["challenges", "Challenges"],
          ["community", "Community"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20 hover:bg-white/25"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-6">
        <Section id="problem" title="1. The problem we are addressing">
          <p className="mb-4 leading-relaxed text-letin-purple-dark">{PROBLEM.summary}</p>
          <p className="mb-4 font-medium text-letin-ink">{PROBLEM.significance}</p>
          <ul className="list-disc space-y-2 pl-5 text-letin-purple-dark">
            {PROBLEM.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section id="solution" title="2. Our awareness campaign & product">
          <p className="mb-2 font-display text-lg font-bold text-letin-ink">{SOLUTION.headline}</p>
          <p className="mb-4 leading-relaxed text-letin-purple-dark">{SOLUTION.summary}</p>
          <div className="mb-4 space-y-4">
            {SOLUTION.features.map((f) => (
              <div key={f.title} className="rounded-xl bg-letin-muted p-4">
                <h3 className="font-display mb-1 font-bold text-letin-ink">{f.title}</h3>
                <p className="text-sm text-letin-purple-dark">{f.description}</p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-4 border-letin-yellow pl-4 italic text-letin-purple-dark">
            {SOLUTION.fencesMetaphor}
          </blockquote>
          <Link to="/" className="btn-primary mt-6 inline-block">
            Explore the live board
          </Link>
        </Section>

        <Section id="audience" title="3. Target audience & impact goals">
          <h3 className="mb-2 font-bold text-letin-ink">Primary audience</h3>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-letin-purple-dark">
            {TARGET_AUDIENCE.primary.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3 className="mb-2 font-bold text-letin-ink">Community partners</h3>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-letin-purple-dark">
            {TARGET_AUDIENCE.secondary.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h3 className="mb-2 font-bold text-letin-ink">Impact goals</h3>
          <ul className="list-disc space-y-1 pl-5 text-letin-purple-dark">
            {TARGET_AUDIENCE.impactGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Section>

        <Section id="implementation" title="4. How we are implementing this">
          <div className="space-y-6">
            {IMPLEMENTATION.phases.map((phase) => (
              <div key={phase.phase}>
                <div className="mb-2 flex flex-wrap items-baseline gap-2">
                  <h3 className="font-display font-bold text-letin-ink">{phase.phase}</h3>
                  <span className="rounded-full bg-letin-yellow/30 px-2 py-0.5 text-xs font-bold text-letin-ink">
                    {phase.timeline}
                  </span>
                </div>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-letin-purple-dark">
                  {phase.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <h3 className="mb-2 mt-6 font-bold text-letin-ink">Materials & outreach</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-letin-purple-dark">
            {[...IMPLEMENTATION.materials, ...IMPLEMENTATION.outreach].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="challenges" title="5. Challenges & how we overcome them">
          <div className="space-y-4">
            {CHALLENGES.map((c) => (
              <div key={c.challenge} className="rounded-xl border border-letin-muted p-4">
                <h3 className="mb-1 font-bold text-letin-ink">Challenge: {c.challenge}</h3>
                <p className="text-sm text-letin-purple-dark">
                  <span className="font-semibold text-letin-blue">Solution: </span>
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="community" title="6. Who in the community we involve">
          <p className="mb-4 text-letin-purple-dark">{COMMUNITY.headline}</p>
          <div className="mb-6 space-y-3">
            {COMMUNITY.groups.map((g) => (
              <div key={g.name}>
                <h3 className="font-bold text-letin-ink">{g.name}</h3>
                <p className="text-sm text-letin-purple-dark">{g.role}</p>
              </div>
            ))}
          </div>
          <h3 className="mb-2 font-bold text-letin-ink">Outreach status</h3>
          <ul className="space-y-2">
            {COMMUNITY.partners.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between rounded-lg bg-letin-muted px-3 py-2 text-sm"
              >
                <span className="font-medium text-letin-ink">{p.name}</span>
                <span className="text-xs font-bold text-letin-purple-dark">{p.status}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-8 text-center">
        <Link to="/impact" className="btn-secondary">
          View impact showcase →
        </Link>
      </div>
    </main>
  );
}
