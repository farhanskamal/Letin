import { Link, useLocation } from "react-router-dom";
import { LetinLogo } from "@/components/LetinLogo";
import { SkipLink } from "@/components/SkipLink";

type AppShellProps = {
  children: React.ReactNode;
};

const NAV_LINKS = [
  { to: "/", label: "Board" },
  { to: "/mission", label: "Mission" },
  { to: "/impact", label: "Impact" },
  { to: "/submit", label: "Submit" },
  { to: "/admin", label: "Admin" },
];

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <SkipLink />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-letin-purple/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="transition-opacity hover:opacity-90">
            <LetinLogo size="sm" />
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 sm:py-2 ${
                    active
                      ? "bg-letin-yellow text-letin-purple-dark"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {children}

      <footer className="mt-16 border-t border-white/10 py-8 text-center">
        <p className="text-sm text-white/50">
          Your local opportunities board — built for community.
        </p>
      </footer>
    </div>
  );
}
