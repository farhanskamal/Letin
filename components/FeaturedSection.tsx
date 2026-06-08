import { Link } from "react-router-dom";
import { CategoryBadge } from "@/components/CategoryBadge";
import { CountdownBadge } from "@/components/CountdownBadge";
import { useImage } from "@/lib/hooks/useImage";
import { stripHtml } from "@/lib/sanitize";
import type { Post } from "@/lib/types";

type FeaturedSectionProps = {
  title: string;
  posts: Post[];
  icon: React.ReactNode;
};

function FeaturedCard({ post }: { post: Post }) {
  const imageUrl = useImage(post.imageUrl);

  return (
    <Link
      to={`/post/${post.id}`}
      className="card-surface group relative flex w-72 shrink-0 flex-col overflow-hidden transition-transform hover:-translate-y-1"
    >
      {imageUrl ? (
        <div className="relative aspect-[3/2] w-full bg-letin-muted">
          <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ) : (
        <div className="relative aspect-[3/2] w-full bg-letin-muted p-5">
          <p className="line-clamp-4 text-sm text-letin-purple-dark">
            {stripHtml(post.description)}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <CategoryBadge category={post.category} />
        </div>
        <h3 className="mb-3 line-clamp-2 font-display text-lg font-bold leading-tight text-letin-ink group-hover:text-letin-purple-deep">
          {post.title}
        </h3>
        <div className="mt-auto">
          <CountdownBadge deadline={post.deadline} />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedSection({ title, posts, icon }: FeaturedSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-10 animate-fade-in-up">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-letin-yellow text-letin-ink shadow-letin">
          {icon}
        </div>
        <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-6 pt-2 snap-x snap-mandatory sm:mx-0 sm:px-0 scrollbar-hide">
        {posts.map((post) => (
          <div key={post.id} className="snap-start">
            <FeaturedCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
