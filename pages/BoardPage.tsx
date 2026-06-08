import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { PostCardPoster } from "@/components/PostCardPoster";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MapView } from "@/components/MapView";
import { FeaturedSection } from "@/components/FeaturedSection";
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
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Community Board
            </h1>
            <p className="mt-2 max-w-lg text-gray-600">
              Opportunities, events, and resources — pinned up for you by mentors
              and staff.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold tabular-nums text-white">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
            <Link
              to="/submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Submit Post
            </Link>
            <Link
              to="/admin"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 ring-1 ring-gray-200 transition-colors hover:bg-white hover:text-gray-900"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            </div>
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
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
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
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
        <div className="animate-fade-in-up rounded-2xl bg-white p-12 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-board-paper">
            <svg
              className="h-8 w-8 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="font-display text-xl font-bold text-gray-700">
            No posts found
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {displayedPosts.map((post, index) => (
            post.imageType === "poster" ? (
              <PostCardPoster key={post.id} post={post} index={index} />
            ) : (
              <PostCard key={post.id} post={post} index={index} />
            )
          ))}
        </div>
      )}
    </main>
  );
}
