import { Link, useNavigate } from "react-router-dom";
import { AdminPostForm } from "@/components/AdminPostForm";
import { usePosts } from "@/context/PostsContext";
import { trackPostSubmitted } from "@/lib/impactTracker";
import type { Post } from "@/lib/types";

export default function SubmitPage() {
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = (data: Omit<Post, "id" | "postedAt">) => {
    createPost({ ...data, pinned: false });
    trackPostSubmitted();
    navigate("/");
  };

  return (
    <main id="main-content" className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
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

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">
          Submit an Opportunity
        </h1>
        <p className="mt-2 text-white/70">
          Share an event, resource, or deadline with the community.
        </p>
      </div>

      <div className="card-surface p-6 sm:p-8">
        <AdminPostForm onSubmit={handleSubmit} submitLabel="Submit Post" />
      </div>
    </main>
  );
}
