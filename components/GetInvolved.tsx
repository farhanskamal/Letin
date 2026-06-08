import { Link } from "react-router-dom";

const ROLES = [
  {
    title: "Students",
    description: "Browse, bookmark deadlines, and submit opportunities you find in your neighborhood.",
    cta: "Explore the board",
    to: "/",
  },
  {
    title: "Counselors & mentors",
    description: "Post verified internships, workshops, and resources your students need to see.",
    cta: "Admin dashboard",
    to: "/admin",
  },
  {
    title: "Community orgs",
    description: "Share events and programs so youth outside your mailing list can still find them.",
    cta: "Submit a post",
    to: "/submit",
  },
];

export function GetInvolved() {
  return (
    <section className="mb-10" aria-labelledby="get-involved-heading">
      <h2 id="get-involved-heading" className="font-display mb-4 text-2xl font-bold text-white">
        Get involved — break the fence together
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role.title} className="card-surface flex flex-col p-5">
            <h3 className="font-display mb-2 font-bold text-letin-ink">{role.title}</h3>
            <p className="mb-4 flex-1 text-sm text-letin-purple-dark">{role.description}</p>
            <Link to={role.to} className="text-sm font-bold text-letin-blue hover:text-letin-ink">
              {role.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
