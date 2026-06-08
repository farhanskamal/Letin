import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { PostCardPoster } from "@/components/PostCardPoster";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MapView } from "@/components/MapView";
import { FeaturedSection } from "@/components/FeaturedSection";
import { LetinLogo } from "@/components/LetinLogo";
import { Sparkle } from "@/components/Sparkle";
import { usePosts } from "@/context/PostsContext";
import { filterPosts, sortPosts } from "@/lib/utils";
import type { FilterCategory } from "@/lib/types";

export default function BoardPage() {
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const displayedPosts = useMemo(
    () => sortPosts(filterPosts(posts, { search: searchQuery, category: activeCategory })),
    [posts, searchQuery, activeCategory],
  );

  const upcomingEvents = useMemo(() => {
    return posts
      .filter((p) => p.category === "event" && p.deadline && new Date(p.deadline).getTime() > Date.now())
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
      .slice(0, 6);
  }, [posts]);

  const upcomingDeadlines = useMemo(() => {
    return posts
      .filter((p) => p.category === "deadline" && p.deadline && new Date(p.deadline).getTime() > Date.now())
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
      .slice(0, 6);
  }, [posts]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-3xl bg-white/10 px-6 py-10 ring-1 ring-white/20 sm:px-10 sm:py-14">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <LetinLogo size="lg" className="mb-6" />
            <h1 className="font-body text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Your Local{" "}
              <span className="relative inline-block">
                <span className="text-gradient-opportunities">Opportunities</span>
                <Sparkle
                  color="yellow"
                  size={14}
                  className="absolute -right-5 -top-2 animate-sparkle"
                />
                <Sparkle
                  color="blue"
                  size={10}
                  className="absolute -bottom-1 -left-4 animate-sparkle"
                  style={{ animationDelay: "0.5s" }}
                />
              </span>{" "}
              Board.
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/70 sm:text-lg">
              Events, deadlines, and resources — curated for your community.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <span className="rounded-full bg-letin-yellow px-4 py-1.5 text-sm font-bold tabular-nums text-letin-ink shadow-letin">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
            <Link to="/submit" className="btn-primary">
              Submit a Post
            </Link>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-letin-yellow/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-letin-blue/20 blur-3xl" />
      </section>

      {/* Filters */}
      <header className="mb-10">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            </div>
            <div className="flex rounded-xl bg-white/15 p-1 ring-1 ring-white/20">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-letin-yellow text-letin-ink shadow-letin"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-letin-yellow text-letin-ink shadow-letin"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </header>

      {!searchQuery && activeCategory === "all" && viewMode === "grid" && (
        <>
          <FeaturedSection
            title="Upcoming Events"
            posts={upcomingEvents}
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />

          <FeaturedSection
            title="Upcoming Deadlines"
            posts={upcomingDeadlines}
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
        </>
      )}

      {viewMode === "map" ? (
        <MapView posts={displayedPosts} />
      ) : displayedPosts.length === 0 ? (
        <div className="card-surface animate-fade-in-up p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-letin-muted">
            <svg
              className="h-8 w-8 text-letin-purple-dark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="font-display text-xl font-bold text-letin-ink">No posts found</p>
          <p className="mt-2 text-sm text-letin-purple-dark">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {displayedPosts.map((post, index) =>
            post.imageType === "poster" ? (
              <PostCardPoster key={post.id} post={post} index={index} />
            ) : (
              <PostCard key={post.id} post={post} index={index} />
            ),
          )}
        </div>
      )}
    </main>
  );
}
