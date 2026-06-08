import { Link } from "react-router-dom";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CountdownBadge } from "@/components/CountdownBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { PinBadge } from "@/components/PinBadge";
import { useImage } from "@/lib/hooks/useImage";
import type { Post } from "@/lib/types";

type PostCardPosterProps = {
  post: Post;
  index?: number;
};

export function PostCardPoster({ post, index = 0 }: PostCardPosterProps) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  const imageUrl = useImage(post.imageUrl);

  return (
    <Link
      to={`/post/${post.id}`}
      className={`group relative mb-4 block break-inside-avoid animate-fade-in-up ${staggerClass} transition-transform duration-200 hover:-translate-y-1`}
    >
      <article className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-letin-ink shadow-card transition-shadow group-hover:shadow-card-hover">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-letin-purple-deep" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-letin-ink/90 via-letin-ink/30 to-transparent" />

        {post.pinned && (
          <div className="absolute -top-2 left-4 z-10">
            <PinBadge />
          </div>
        )}

        <div className="absolute right-3 top-3 z-10 rounded-full bg-black/20 backdrop-blur-sm">
          <BookmarkButton postId={post.id} variant="dark" />
        </div>

        <div className="absolute bottom-0 z-10 w-full p-5 text-white">
          <div className="mb-2">
            <CategoryBadge category={post.category} />
          </div>
          <h2 className="font-display mb-3 text-xl font-bold leading-tight">
            {post.title}
          </h2>
          <CountdownBadge deadline={post.deadline} />
        </div>
      </article>
    </Link>
  );
}
