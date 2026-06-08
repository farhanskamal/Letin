const STORAGE_KEY = "letin_impact_metrics";

export type ImpactMetrics = {
  boardVisits: number;
  postsViewed: number;
  bookmarksSaved: number;
  postsSubmitted: number;
  firstVisit: string;
};

function defaultMetrics(): ImpactMetrics {
  return {
    boardVisits: 0,
    postsViewed: 0,
    bookmarksSaved: 0,
    postsSubmitted: 0,
    firstVisit: new Date().toISOString(),
  };
}

export function readImpactMetrics(): ImpactMetrics {
  if (typeof window === "undefined") return defaultMetrics();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultMetrics();
    return { ...defaultMetrics(), ...JSON.parse(raw) };
  } catch {
    return defaultMetrics();
  }
}

function writeImpactMetrics(metrics: ImpactMetrics): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
}

export function trackBoardVisit(): void {
  const m = readImpactMetrics();
  m.boardVisits += 1;
  writeImpactMetrics(m);
}

export function trackPostView(): void {
  const m = readImpactMetrics();
  m.postsViewed += 1;
  writeImpactMetrics(m);
}

export function trackBookmarkSaved(): void {
  const m = readImpactMetrics();
  m.bookmarksSaved += 1;
  writeImpactMetrics(m);
}

export function trackPostSubmitted(): void {
  const m = readImpactMetrics();
  m.postsSubmitted += 1;
  writeImpactMetrics(m);
}
