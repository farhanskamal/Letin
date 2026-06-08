import { Link, useParams } from "react-router-dom";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CountdownBadge } from "@/components/CountdownBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { PinBadge } from "@/components/PinBadge";
import { usePosts } from "@/context/PostsContext";
import { useVerifiedUsers } from "@/context/VerifiedUsersContext";
import { useImage } from "@/lib/hooks/useImage";
import { formatPostedDate, CATEGORY_CONFIG } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";
import { VerifiedBadge } from "@/components/VerifiedBadge";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = usePosts();
  const { isVerified } = useVerifiedUsers();
  const post = id ? getPostById(id) : undefined;
  const imageUrl = useImage(post?.imageUrl);

  if (!post) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
          <svg
            className="h-10 w-10 text-white/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">
          Post not found
        </h1>
        <p className="mt-2 text-white/70">
          This flyer may have been removed from the board.
        </p>
        <Link to="/" className="btn-primary mt-6">
          Back to Board
        </Link>
      </main>
    );
  }

  const categoryColor = CATEGORY_CONFIG[post.category].hex;

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Board
      </Link>

      <article className="card-surface animate-fade-in-up overflow-hidden">
        {/* Category accent bar at top */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: categoryColor }}
        />

        {imageUrl && (
          <div className="relative aspect-video w-full bg-gray-100 border-b border-gray-100">
            <img src={imageUrl} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <CategoryBadge category={post.category} />
            {post.pinned && <PinBadge />}
            <CountdownBadge deadline={post.deadline} size="md" />
            <div className="ml-auto">
              <BookmarkButton postId={post.id} size="md" />
            </div>
          </div>

          <h1 className="font-display mb-6 text-3xl font-bold leading-tight text-letin-ink sm:text-4xl">
            {post.title}
          </h1>

          <div
            className="prose prose-letin max-w-none mb-8 text-base leading-relaxed text-letin-purple-dark"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.description) }}
          />

          {post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-letin-muted px-2.5 py-1 text-sm text-letin-purple-dark"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mb-8 flex flex-wrap gap-4 text-sm text-letin-purple-dark">
            <span className="flex items-center gap-1">
              Posted by {post.postedBy}
              {isVerified(post.postedBy) && <VerifiedBadge />}
            </span>
            <span>·</span>
            <span>{formatPostedDate(post.postedAt)}</span>
          </div>

          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Apply / Learn More
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
