/** Capstone documentation content for Breaking Barriers / Fences initiative */

export const PROJECT = {
  title: "Letin — Breaking Barriers",
  subtitle: "A Social Change Initiative Inspired by Fences",
  capstoneCourse: "Senior Capstone Project",
  liveUrl: "https://farhanskamal.github.io/Letin/",
};

export const PROBLEM = {
  headline: "The fence around opportunity",
  summary:
    "In August Wilson's Fences, Troy Maxson is blocked from his dreams — not only by racism and broken systems, but by the simple fact that opportunities never reached him. Flyers on a distant wall. Word-of-mouth you had to already be inside to hear. A fence between where Troy lived and where possibility lived.",
  points: [
    "Youth in under-resourced neighborhoods often miss internships, workshops, and deadlines because information is scattered or gatekept.",
    "School counselors and community mentors post opportunities, but there is no single, trusted, youth-friendly place to find them.",
    "When access depends on who you know, the fence stays up — the same barrier Troy faced, rebuilt for a new generation.",
  ],
  significance:
    "Opportunity inequality is not always loud. It is quiet: a missed deadline, a flyer never seen, a program you never knew existed. Letin makes the invisible visible.",
};

export const SOLUTION = {
  headline: "Tear down the fence. Put opportunity on the board.",
  summary:
    "Letin is a free, public community bulletin board where counselors, mentors, and organizations post real opportunities — and anyone can browse, search, save, and act on them.",
  features: [
    {
      title: "One board, every door",
      description:
        "Internships, events, deadlines, resources, and announcements in one searchable place — no account required to browse.",
    },
    {
      title: "Built for youth, run by community",
      description:
        "Verified posters (counselors, staff, partner orgs) plus a public submit flow so the community can share what they know.",
    },
    {
      title: "Act before time runs out",
      description:
        "Live deadline countdowns, featured upcoming events, and a map view so opportunities are not buried.",
    },
    {
      title: "Mobile-friendly & free",
      description:
        "Works on any phone or computer. No paywall. Designed for students who do not have a laptop at home.",
    },
  ],
  fencesMetaphor:
    "Wilson's fence kept people in and out. Letin removes the fence around information — so Troy's grandson does not have to knock on doors that were never labeled.",
};

export const TARGET_AUDIENCE = {
  primary: [
    "High school students in under-resourced or high-barrier communities",
    "First-generation college-bound youth seeking internships and workshops",
    "Young adults who rely on public resources and community centers",
  ],
  secondary: [
    "School counselors and college advisors",
    "Youth organizations (Urban Arts, community centers, mentorship programs)",
    "Local employers and nonprofits posting opportunities",
  ],
  impactGoals: [
    "Increase awareness of local opportunities among students who are not in existing networks",
    "Reduce missed deadlines through visible countdowns and featured sections",
    "Give counselors a single link to share instead of scattered emails and paper flyers",
    "Collect community-submitted posts to surface opportunities traditional channels miss",
  ],
};

export const IMPLEMENTATION = {
  phases: [
    {
      phase: "Research & proposal",
      timeline: "Weeks 1–2",
      steps: [
        "Read Fences and identify parallel barriers in students' lives today",
        "Interview counselors and peers about how they currently find opportunities",
        "Draft initiative proposal with problem, audience, and product concept",
        "Shark Tank feedback session — refine feasibility and scope",
      ],
    },
    {
      phase: "Build & test",
      timeline: "Weeks 3–5",
      steps: [
        "Develop Letin as a responsive web app (Vite + React)",
        "Seed board with real-style demo posts across all categories",
        "User-test with classmates: search, bookmarks, submit flow, mobile layout",
        "Iterate on accessibility (keyboard nav, contrast, plain language)",
      ],
    },
    {
      phase: "Launch & outreach",
      timeline: "Weeks 6–8",
      steps: [
        "Deploy public site on GitHub Pages",
        "Share link with school counselors, youth org staff, and capstone audience",
        "Host in-school Outcome & Impact Showcase with live demo and Q&A",
        "Gather feedback and document metrics for reflective portfolio",
      ],
    },
  ],
  materials: [
    "Letin web app (this site)",
    "One-page flyer / QR code for counselors",
    "Short pitch deck for Shark Tank and showcase",
    "Partner outreach emails to community organizations",
  ],
  outreach: [
    "Present at Senior Capstone in-school launch event",
    "Share board link with counseling office and youth program staff",
    "Invite verified posters (Ms. Rivera, Urban Arts Staff model) to maintain posts",
    "Encourage students to submit opportunities they discover in the community",
  ],
};

export const CHALLENGES = [
  {
    challenge: "Getting real posts without a backend database yet",
    solution:
      "Launched with a mock data layer designed for easy Supabase swap later; counselors can use admin panel in-session; public submit adds posts immediately for demos and pilot use.",
  },
  {
    challenge: "Reaching students who do not know the site exists",
    solution:
      "QR codes on physical bulletin boards, counselor email signatures, and showcase event; featured sections highlight urgent deadlines so first visit has immediate value.",
  },
  {
    challenge: "Trust — is this opportunity real?",
    solution:
      "Verified poster badges for known counselors and orgs; pinned posts for vetted opportunities; admin moderation before scaling.",
  },
  {
    challenge: "Accessibility for all learners",
    solution:
      "High-contrast brand colors, keyboard focus states, skip navigation, reduced-motion support, and plain-language UI tested on mobile devices.",
  },
];

export const COMMUNITY = {
  headline: "Who we are bringing to the table",
  groups: [
    {
      name: "School counselors & advisors",
      role: "Post internships, deadlines, and college resources; verify quality of listings",
    },
    {
      name: "Youth organizations",
      role: "Share workshops, events, and mentorship programs (e.g., Urban Arts, community centers)",
    },
    {
      name: "Students & peers",
      role: "Browse, bookmark, and submit opportunities they find — crowdsource the fence-breaking",
    },
    {
      name: "Local employers & nonprofits",
      role: "List paid internships and volunteer roles so students see paths Troy never had posted",
    },
    {
      name: "Capstone audience & teachers",
      role: "Shark Tank feedback, showcase Q&A, and spread awareness through school network",
    },
  ],
  partners: [
    { name: "School Counseling Office", status: "Pilot outreach" },
    { name: "Urban Arts Staff", status: "Demo verified poster" },
    { name: "Senior Capstone Program", status: "Launch showcase" },
    { name: "Community mentorship networks", status: "Expansion target" },
  ],
};

export const IMPACT_METRICS = {
  demoNote:
    "Metrics below reflect demo/session data for showcase; will grow with live deployment.",
  stats: [
    { label: "Opportunities listed", value: "6+", key: "posts" },
    { label: "Categories covered", value: "5", key: "categories" },
    { label: "Access cost", value: "$0", key: "cost" },
    { label: "Account required to browse", value: "No", key: "access" },
  ],
  futureRecommendations: [
    "Partner with counseling office for weekly post updates",
    "Add SMS deadline reminders for bookmarked posts",
    "Expand to Supabase backend for persistent posts across sessions",
    "Run semesterly 'opportunity audit' with youth orgs to fill gaps on the board",
    "Translate key UI strings for multilingual communities",
  ],
};
