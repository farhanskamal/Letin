import { Link } from "react-router-dom";
import { PROBLEM } from "@/lib/capstoneContent";

export function BarrierCallout() {
  return (
    <section
      className="mb-10 rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-8"
      aria-labelledby="barrier-heading"
    >
      <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-letin-yellow">
        Breaking Barriers · Inspired by Fences
      </p>
      <h2 id="barrier-heading" className="font-display mb-3 text-xl font-bold text-white sm:text-2xl">
        {PROBLEM.headline}
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-white/80 sm:text-base">
        {PROBLEM.summary}
      </p>
      <Link
        to="/mission"
        className="inline-flex items-center gap-1 text-sm font-bold text-letin-yellow transition-colors hover:text-white"
      >
        Read our mission & capstone proposal
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
