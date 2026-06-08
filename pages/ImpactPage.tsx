import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "@/context/PostsContext";
import { IMPACT_METRICS, PROJECT } from "@/lib/capstoneContent";
import { readImpactMetrics, type ImpactMetrics } from "@/lib/impactTracker";

export default function ImpactPage() {
  const { posts } = usePosts();
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);

  useEffect(() => {
    setMetrics(readImpactMetrics());
  }, []);

  const showcaseStats = [
    { label: "Live posts on board", value: String(posts.length) },
    { label: "Board visits (this device)", value: metrics ? String(metrics.boardVisits) : "—" },
    { label: "Posts viewed", value: metrics ? String(metrics.postsViewed) : "—" },
    { label: "Bookmarks saved", value: metrics ? String(metrics.bookmarksSaved) : "—" },
    { label: "Community submissions", value: metrics ? String(metrics.postsSubmitted) : "—" },
    { label: "Pinned opportunities", value: String(posts.filter((p) => p.pinned).length) },
  ];

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-letin-yellow">
          Outcome & Impact Showcase
        </p>
        <h1 className="font-display mb-3 text-3xl font-bold text-white sm:text-4xl">
          Measuring the fence we are breaking
        </h1>
        <p className="text-white/80">
          Data and reflection for the Senior Capstone launch event — {PROJECT.title}
        </p>
      </header>

      <section className="card-surface mb-6 p-6 sm:p-8" aria-labelledby="impact-stats">
        <h2 id="impact-stats" className="font-display mb-2 text-xl font-bold text-letin-ink">
          Impact at a glance
        </h2>
        <p className="mb-6 text-sm text-letin-purple-dark">{IMPACT_METRICS.demoNote}</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {showcaseStats.map((s) => (
            <div key={s.label} className="rounded-xl bg-letin-muted p-4 text-center">
              <p className="font-display text-2xl font-bold text-letin-ink">{s.value}</p>
              <p className="mt-1 text-xs text-letin-purple-dark">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {IMPACT_METRICS.stats.map((s) => (
            <div key={s.key} className="rounded-xl bg-letin-yellow/20 p-3 text-center">
              <p className="font-display text-lg font-bold text-letin-ink">{s.value}</p>
              <p className="text-xs text-letin-purple-dark">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-surface mb-6 p-6 sm:p-8" aria-labelledby="adaptation">
        <h2 id="adaptation" className="font-display mb-4 text-xl font-bold text-letin-ink">
          Challenges faced & how we adapted
        </h2>
        <div className="space-y-4 text-sm text-letin-purple-dark">
          <div>
            <h3 className="font-bold text-letin-ink">Tech stack pivot</h3>
            <p>
              Started on Next.js, migrated to Vite for a faster, watermark-free experience
              students can access without barriers. Deployed free on GitHub Pages.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-letin-ink">No backend yet</h3>
            <p>
              Built a mock data layer with session CRUD so the product works in demos and pilot
              use; designed for one-step Supabase migration when counselors adopt it school-wide.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-letin-ink">Reaching the right audience</h3>
            <p>
              Added verified posters, public submit, map view, deadline countdowns, and mobile-first
              layout so the board is useful on the first visit — not after someone explains it.
            </p>
          </div>
        </div>
      </section>

      <section className="card-surface mb-6 p-6 sm:p-8" aria-labelledby="qa-prep">
        <h2 id="qa-prep" className="font-display mb-4 text-xl font-bold text-letin-ink">
          Showcase Q&A — key talking points
        </h2>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-bold text-letin-ink">Why Fences?</dt>
            <dd className="text-letin-purple-dark">
              Troy was kept out by systems and silence. Today the fence is scattered information.
              Letin centralizes what counselors already know but students never hear.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-letin-ink">Who is this for?</dt>
            <dd className="text-letin-purple-dark">
              Students in tough environments who do not have networks — first-gen, under-resourced
              neighborhoods, anyone who was not in the room when opportunity was announced.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-letin-ink">What makes it innovative?</dt>
            <dd className="text-letin-purple-dark">
              Youth-designed, community-run, free, with live deadlines and crowd-sourced posts —
              not another corporate job board students cannot trust.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-letin-ink">What is next?</dt>
            <dd className="text-letin-purple-dark">
              {IMPACT_METRICS.futureRecommendations[0]}; then persistent database and SMS reminders.
            </dd>
          </div>
        </dl>
      </section>

      <section className="card-surface p-6 sm:p-8" aria-labelledby="future">
        <h2 id="future" className="font-display mb-4 text-xl font-bold text-letin-ink">
          Future recommendations
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-letin-purple-dark">
          {IMPACT_METRICS.futureRecommendations.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary">
          Live demo — Board
        </Link>
        <Link to="/mission" className="btn-secondary !text-white">
          Full mission doc
        </Link>
      </div>
    </main>
  );
}
