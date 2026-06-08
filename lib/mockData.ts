import type { Post } from "./types";

/**
 * Community opportunity listings with real organizations and application links.
 * Swap getPosts() internals for API/Supabase fetch when scaling beyond demo.
 */
const MOCK_POSTS: Post[] = [
  // ── OPPORTUNITIES ──────────────────────────────────────────────
  {
    id: "1",
    title: "All Star Code — Summer Intensive 2026",
    description:
      "Tuition-free, 6-week live virtual program for high school-aged students (14–18). Learn HTML, CSS, JavaScript, AI literacy, and systems thinking — no prior coding experience required. Includes mentorship from tech professionals and financial assistance for laptops/internet. Rolling applications — apply early.",
    category: "opportunity",
    tags: ["coding", "tech", "free", "virtual", "paid pathway"],
    deadline: "2026-06-20T23:59:00",
    link: "https://allstarcode.org/apply/si26/",
    pinned: true,
    postedAt: "2026-05-28T09:00:00",
    postedBy: "Ms. Rivera",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    imageType: "poster",
    locationName: "Virtual (NYC cohort visits available)",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "2",
    title: "Brooklyn Public Library — Teen Techies",
    description:
      "Paid internship for ages 14–18. Complete a two-week tech training institute, then volunteer at BPL branches helping patrons with computers. Earn stipends, community service hours, and leadership experience. Alumni have gone on to Google, Meta, and more.",
    category: "opportunity",
    tags: ["library", "tech", "paid", "Brooklyn", "volunteer"],
    link: "https://www.bklynlibrary.org/support/volunteer/teen-techies",
    pinned: true,
    postedAt: "2026-05-22T11:00:00",
    postedBy: "Urban Arts Staff",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
    imageType: "thumbnail",
    locationName: "Brooklyn Public Library — Grand Army Plaza",
    coordinates: [40.6724, -73.9685],
  },
  {
    id: "3",
    title: "NYC Summer Youth Employment Program (SYEP)",
    description:
      "The nation's largest youth employment program — connects NYC youth ages 14–24 with paid summer work and career exploration. The 2026 application deadline was March 13. Check your application status or explore waitlist options for remaining seats.",
    category: "opportunity",
    tags: ["paid", "summer", "jobs", "NYC", "DYCD"],
    link: "https://application.nycsyep.com/",
    pinned: false,
    postedAt: "2026-05-15T10:00:00",
    postedBy: "NYC DYCD",
    locationName: "All NYC Boroughs",
    coordinates: [40.7484, -73.994],
  },
  {
    id: "4",
    title: "NYC School Construction Authority — Summer Internship",
    description:
      "Six-week paid internship ($19–23/hr) for NYC public high school students. Explore careers in architecture, engineering, construction management, and business. Includes OSHA safety training. 2026 applications closed March 6 — bookmark for next cycle or contact SCA for updates.",
    category: "opportunity",
    tags: ["internship", "paid", "engineering", "construction", "NYC"],
    link: "http://nycsca.org/Careers/Internship-Program",
    pinned: false,
    postedAt: "2026-05-10T14:00:00",
    postedBy: "NYC SCA",
    locationName: "NYC School Construction Authority",
    coordinates: [40.7489, -73.968],
  },
  {
    id: "5",
    title: "The Met — High School Internship Program",
    description:
      "Paid museum internship for grades 10–11 students in NY, NJ, or CT. Work with museum professionals across departments and earn a $1,100 stipend. 2026 applications closed March 13 — save the link and prepare your materials for next year's cycle.",
    category: "opportunity",
    tags: ["museum", "arts", "paid", "internship", "Manhattan"],
    link: "https://www.metmuseum.org/about-the-met/internships/high-school-internship-program",
    pinned: false,
    postedAt: "2026-05-08T09:30:00",
    postedBy: "The Met",
    imageUrl:
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1000&auto=format&fit=crop",
    imageType: "poster",
    locationName: "The Metropolitan Museum of Art",
    coordinates: [40.7794, -73.9632],
  },
  {
    id: "6",
    title: "PENCIL Ladders for Leaders",
    description:
      "Paid 6-week summer internships with top corporations, nonprofits, and government agencies in NYC. Open to students ages 16–24 enrolled in high school or college. No GPA minimum. The 2026 application is closed — visit the site to sign up for updates on the next cycle.",
    category: "opportunity",
    tags: ["internship", "paid", "corporate", "NYC", "career"],
    link: "https://pencil.org/ladders-for-leaders/",
    pinned: false,
    postedAt: "2026-05-05T16:00:00",
    postedBy: "PENCIL",
    locationName: "New York City",
    coordinates: [40.7549, -73.984],
  },

  // ── EVENTS ─────────────────────────────────────────────────────
  {
    id: "7",
    title: "Guggenheim Museum — Teen Tuesdays",
    description:
      "Free after-hours programs for NYC teens at the Solomon R. Guggenheim Museum. Expand your art-making skills, watch live performances, and connect with other young artists. Includes free museum admission, snacks, and MetroCards. No experience needed.",
    category: "event",
    tags: ["art", "free", "museum", "teen", "Manhattan"],
    link: "https://www.guggenheim.org/visit/calendar?f%5B0%5D=audience%3A6631",
    pinned: false,
    postedAt: "2026-05-30T10:00:00",
    postedBy: "Guggenheim Museum",
    locationName: "Solomon R. Guggenheim Museum",
    coordinates: [40.783, -73.959],
  },
  {
    id: "8",
    title: "NYPL — Free Teen Events & Workshops",
    description:
      "The New York Public Library hosts free workshops, creative writing sessions, college prep help, and STEM programs for teens across Manhattan, the Bronx, and Staten Island. Search the calendar for events near you — many require advance registration.",
    category: "event",
    tags: ["library", "free", "workshop", "NYC", "teens"],
    link: "https://www.nypl.org/events/calendar?keyword=teen",
    pinned: false,
    postedAt: "2026-05-27T13:00:00",
    postedBy: "NYPL",
    locationName: "New York Public Library",
    coordinates: [40.7532, -73.982],
  },

  // ── DEADLINES ──────────────────────────────────────────────────
  {
    id: "9",
    title: "Summer Rising 2026 — Accept Your Offer",
    description:
      "Free full-day summer program for NYC students in grades K–8 (July 1 – August 14). If you received an offer, you must accept by May 5 to secure your seat. Missed the application? Check MySchools for waitlist openings. High school students: talk to your guidance counselor about summer programs.",
    category: "deadline",
    tags: ["summer", "free", "K-8", "enrichment", "NYCPS"],
    deadline: "2026-07-01T08:00:00",
    link: "https://www.schools.nyc.gov/enrollment/summer-rising",
    pinned: true,
    postedAt: "2026-04-21T08:00:00",
    postedBy: "NYC Public Schools",
    locationName: "NYC Public Schools",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "10",
    title: "Common App — 2026–27 College Applications Open",
    description:
      "The Common Application lets you apply to 1,000+ colleges with one form. The 2026–27 essay prompts are live — start drafting your personal statement now. Create your account, add colleges, and track deadlines in one place. Application opens August 1 each year.",
    category: "deadline",
    tags: ["college", "application", "essay", "seniors", "free"],
    deadline: "2026-11-01T23:59:00",
    link: "https://www.commonapp.org/",
    pinned: false,
    postedAt: "2026-05-18T09:00:00",
    postedBy: "College Counseling Office",
  },

  // ── RESOURCES ──────────────────────────────────────────────────
  {
    id: "11",
    title: "Khan Academy — Free SAT & AP Prep",
    description:
      "Completely free practice for the SAT, AP exams, math, science, and more. Official College Board SAT practice partnership. No account payment required. Use this summer to build skills before test day or strengthen weak subjects before senior year.",
    category: "resource",
    tags: ["SAT", "AP", "free", "study", "self-paced"],
    link: "https://www.khanacademy.org/",
    pinned: true,
    postedAt: "2026-05-12T10:00:00",
    postedBy: "College Counseling Office",
  },
  {
    id: "12",
    title: "Figma for Education — Free Design Tools",
    description:
      "Students and educators get Figma and FigJam completely free. Apply with your school-issued email at figma.com/education/apply. Perfect for portfolio building, UI design, group projects, and creative coursework. Select 'High school' as your institution type.",
    category: "resource",
    tags: ["design", "free", "figma", "students", "portfolio"],
    link: "https://www.figma.com/education/apply",
    pinned: false,
    postedAt: "2026-05-14T11:00:00",
    postedBy: "Design Lab",
  },
  {
    id: "13",
    title: "College Board BigFuture — College Planning Hub",
    description:
      "Free college search, scholarship finder, career exploration, and financial aid guides. Build a college list, compare schools, and learn about paying for college. Especially useful for first-generation students navigating the process without a family roadmap.",
    category: "resource",
    tags: ["college", "scholarships", "career", "free", "planning"],
    link: "https://bigfuture.collegeboard.org/",
    pinned: false,
    postedAt: "2026-05-16T09:00:00",
    postedBy: "Mr. Thompson",
  },
  {
    id: "14",
    title: "GitHub Student Developer Pack",
    description:
      "Free developer tools for students: GitHub Pro, domain names, cloud hosting credits, design software, and more. Verify with your school email at education.github.com. Essential for building a portfolio and shipping real projects.",
    category: "resource",
    tags: ["coding", "free", "github", "tools", "portfolio"],
    link: "https://education.github.com/pack",
    pinned: false,
    postedAt: "2026-05-19T14:00:00",
    postedBy: "Ms. Rivera",
  },
  {
    id: "15",
    title: "NYC Working Papers — Get Legal Work Authorization",
    description:
      "Need a job? You must have working papers first. NYC students: apply through your school's guidance office. Not in school? Go to the nearest public high school — they are required to give you the application. Ages 14+.",
    category: "resource",
    tags: ["jobs", "legal", "working papers", "NYC", "guidance"],
    link: "https://dol.ny.gov/working-papers",
    pinned: false,
    postedAt: "2026-05-20T08:00:00",
    postedBy: "School Counseling Office",
    locationName: "Your school's guidance office",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "16",
    title: "Build Your Future with Google — CS Programs",
    description:
      "Google's hub for student opportunities including the Computer Science Summer Institute (CSSI), apprenticeships, and scholarships. Programs target students from underrepresented backgrounds in tech. Check back each January–March for CSSI application windows.",
    category: "resource",
    tags: ["google", "CS", "scholarship", "tech", "career"],
    link: "https://buildyourfuture.withgoogle.com/",
    pinned: false,
    postedAt: "2026-05-21T10:00:00",
    postedBy: "Ms. Rivera",
  },

  // ── ANNOUNCEMENTS ──────────────────────────────────────────────
  {
    id: "17",
    title: "NYCPS Morning Bell — Monthly Student Opportunities",
    description:
      "The NYC Department of Education publishes a curated list of internships, scholarships, workshops, and free programs every month. Bookmark this page and check back regularly — new opportunities are posted year-round for NYC public school students.",
    category: "announcement",
    tags: ["NYCPS", "monthly", "opportunities", "updates", "official"],
    link: "https://www.schools.nyc.gov/about-us/news/morning-bell",
    pinned: true,
    postedAt: "2026-06-01T08:00:00",
    postedBy: "NYC Public Schools",
  },
  {
    id: "18",
    title: "Yankees-Stonewall Scholarship — $10K College Award",
    description:
      "Five NYC graduating seniors (one per borough) win $10,000 for college. Celebrates students who have demonstrated impactful LGBTQ+ advocacy. The 2026 application closed April 27 — winners announced in May. Save LGBTQ@schools.nyc.gov and schools.nyc.gov/lgbtq for the 2027 cycle.",
    category: "announcement",
    tags: ["scholarship", "$10,000", "LGBTQ+", "seniors", "college"],
    link: "https://www.schools.nyc.gov/about-us/lgbtq",
    pinned: false,
    postedAt: "2026-04-15T10:00:00",
    postedBy: "NYCPS LGBTQ+ Office",
  },
];

/** Returns all posts — swap implementation for DB fetch later. */
export function getPosts(): Post[] {
  return [...MOCK_POSTS];
}

/** Returns a single post by ID — swap implementation for DB fetch later. */
export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.id === id);
}
