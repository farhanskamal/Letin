import { Link } from "react-router-dom";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CountdownBadge } from "@/components/CountdownBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { PinBadge } from "@/components/PinBadge";
import { useImage } from "@/lib/hooks/useImage";
import { CATEGORY_CONFIG } from "@/lib/utils";
import { stripHtml } from "@/lib/sanitize";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useVerifiedUsers } from "@/context/VerifiedUsersContext";
import type { Post } from "@/lib/types";

type PostCardProps = {
  post: Post;
  index?: number;
};

export function PostCard({ post, index = 0 }: PostCardProps) {
  const categoryColor = CATEGORY_CONFIG[post.category].hex;
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const imageUrl = useImage(post.imageUrl);
  const { isVerified } = useVerifiedUsers();

  return (
    <Link
      to={`/post/${post.id}`}
      className={`group relative mb-4 block break-inside-avoid animate-fade-in-up ${staggerClass} transition-transform duration-200 hover:-translate-y-1`}
    >
      <article
        className={`card-surface relative overflow-hidden p-5 ${
          post.pinned ? "ring-2 ring-letin-yellow/80" : ""
        }`}
      >
        {/* Category accent bar */}
        <div
          className="absolute left-0 top-0 h-full w-1 transition-all duration-200 group-hover:w-1.5 z-10"
          style={{ backgroundColor: categoryColor }}
        />

        {imageUrl && (
          <div className="-mx-5 -mt-5 mb-4 relative aspect-video bg-gray-100">
            <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}

        {post.pinned && (
          <div className="absolute -top-2 left-4">
            <PinBadge />
          </div>
        )}

        <div className="mb-3 flex items-start justify-between gap-2 pl-2">
          <CategoryBadge category={post.category} />
          <BookmarkButton postId={post.id} />
        </div>

        <h2 className="font-display mb-2 pl-2 text-lg font-bold leading-tight text-letin-ink group-hover:text-letin-purple-deep">
          {post.title}
        </h2>

        <p className="mb-3 line-clamp-3 pl-2 text-sm leading-relaxed text-letin-purple-dark">
          {stripHtml(post.description)}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5 pl-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-letin-muted px-2 py-0.5 text-xs text-letin-purple-dark"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pl-2">
          <CountdownBadge deadline={post.deadline} />
          <div className="flex items-center gap-1 text-xs text-letin-purple-dark/60">
            <span>by {post.postedBy}</span>
            {isVerified(post.postedBy) && <VerifiedBadge />}
          </div>
        </div>
      </article>
    </Link>
  );
}
