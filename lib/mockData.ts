import type { Post } from "./types";

/**
 * Demo seed data. Replace getPosts internals with API calls
 * when migrating to Supabase or another backend.
 */
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "NYC Youth Tech Internship — Summer 2026",
    description:
      "A paid 8-week summer internship for high school students interested in software, design, or product. Open to NYC residents. Applications reviewed on a rolling basis — don't sleep on it.",
    category: "opportunity",
    tags: ["internship", "paid", "tech", "NYC", "high school"],
    deadline: "2026-07-15T23:59:00",
    link: "https://example.com/apply",
    pinned: true,
    postedAt: "2026-05-20T10:00:00",
    postedBy: "Ms. Rivera",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    imageType: "poster",
  },
  {
    id: "2",
    title: "Free Portfolio Review Workshop",
    description:
      "Industry designers and developers will review your portfolio live and give real feedback. Bring your work — websites, apps, graphics, whatever you've built. Limited spots.",
    category: "event",
    tags: ["workshop", "design", "free", "portfolio"],
    deadline: "2026-06-28T18:00:00",
    link: "https://example.com/rsvp",
    pinned: false,
    postedAt: "2026-05-25T14:30:00",
    postedBy: "Urban Arts Staff",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    imageType: "thumbnail",
  },
  {
    id: "3",
    title: "College Essay Rough Draft Due",
    description:
      "First drafts of your personal statement are due to your advisor by end of day. Bring a printed copy and a digital version. Late submissions will be reviewed in the next cycle.",
    category: "deadline",
    tags: ["college", "essay", "writing", "advisor"],
    deadline: "2026-06-12T23:59:00",
    pinned: true,
    postedAt: "2026-06-01T09:00:00",
    postedBy: "Mr. Thompson",
  },
  {
    id: "4",
    title: "Free Figma & Design Toolkit for Students",
    description:
      "Figma is now free for students with an .edu email. We've also compiled a curated list of free design resources — icon packs, UI kits, color palette generators, and typography tools.",
    category: "resource",
    tags: ["figma", "design", "free", "toolkit", "students"],
    link: "https://example.com/design-toolkit",
    pinned: false,
    postedAt: "2026-05-18T11:00:00",
    postedBy: "Design Lab",
  },
  {
    id: "5",
    title: "Summer Hours Start June 16",
    description:
      "Starting June 16, the center will operate on summer hours: Monday–Thursday 9 AM – 6 PM, Friday 9 AM – 1 PM. The building will be closed on weekends through August.",
    category: "announcement",
    tags: ["schedule", "summer", "hours"],
    pinned: false,
    postedAt: "2026-06-02T08:00:00",
    postedBy: "Admin Office",
  },
  {
    id: "6",
    title: "Google CSSI Application — Last Call",
    description:
      "Google's Computer Science Summer Institute is accepting final applications. This is a 4-week intro to CS for rising freshmen from historically underrepresented groups. Fully funded.",
    category: "opportunity",
    tags: ["google", "CS", "summer", "funded", "freshmen"],
    deadline: "2026-06-20T23:59:00",
    link: "https://example.com/cssi",
    pinned: false,
    postedAt: "2026-06-03T16:00:00",
    postedBy: "Ms. Rivera",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
    imageType: "poster",
  },
];

/** Returns all posts — swap implementation for DB fetch later. */
export function getPosts(): Post[] {
  return [...MOCK_POSTS];
}
