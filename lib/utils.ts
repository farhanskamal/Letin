import type { FilterCategory, Post, PostCategory } from "./types";

export type CategoryConfig = {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hex: string;
};

export const CATEGORY_CONFIG: Record<PostCategory, CategoryConfig> = {
  opportunity: {
    label: "Opportunity",
    bgClass: "bg-category-opportunity",
    textClass: "text-letin-ink",
    borderClass: "border-category-opportunity",
    hex: "#FFDE4C",
  },
  event: {
    label: "Event",
    bgClass: "bg-category-event",
    textClass: "text-white",
    borderClass: "border-category-event",
    hex: "#36B5FF",
  },
  deadline: {
    label: "Deadline",
    bgClass: "bg-category-deadline",
    textClass: "text-white",
    borderClass: "border-category-deadline",
    hex: "#FF7B00",
  },
  resource: {
    label: "Resource",
    bgClass: "bg-category-resource",
    textClass: "text-letin-ink",
    borderClass: "border-category-resource",
    hex: "#B8E4FF",
  },
  announcement: {
    label: "Announcement",
    bgClass: "bg-category-announcement",
    textClass: "text-letin-ink",
    borderClass: "border-category-announcement",
    hex: "#E8D4FF",
  },
};

export const FILTER_TABS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "opportunity", label: "Opportunity" },
  { value: "event", label: "Event" },
  { value: "deadline", label: "Deadline" },
  { value: "resource", label: "Resource" },
  { value: "announcement", label: "Announcement" },
];

export type CountdownResult = {
  label: string;
  isUrgent: boolean;
  isPast: boolean;
};

const URGENT_THRESHOLD_MS = 48 * 60 * 60 * 1000;

/** Computes countdown label and urgency from a deadline ISO string. */
export function getCountdown(deadline: string, now: Date = new Date()): CountdownResult {
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { label: "Expired", isUrgent: false, isPast: true };
  }

  const isUrgent = diffMs < URGENT_THRESHOLD_MS;
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let label: string;
  if (days > 0) {
    label = `${days} day${days === 1 ? "" : "s"} left`;
  } else if (hours > 0) {
    label = `${hours} hour${hours === 1 ? "" : "s"} left`;
  } else {
    label = `${minutes} minute${minutes === 1 ? "" : "s"} left`;
  }

  return { label, isUrgent, isPast: false };
}

/** Formats an ISO date string for display. */
export function formatPostedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Sorts posts: pinned first, then newest postedAt. */
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });
}

type FilterOptions = {
  search: string;
  category: FilterCategory;
};

/** Filters posts by search query and category tab. */
export function filterPosts(posts: Post[], { search, category }: FilterOptions): Post[] {
  const query = search.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = category === "all" || post.category === category;

    if (!query) return matchesCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

/** Generates a unique ID for new posts (session-only). */
export function generatePostId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
