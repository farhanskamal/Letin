import { Link, useNavigate } from "react-router-dom";
import { AdminPostForm } from "@/components/AdminPostForm";
import { usePosts } from "@/context/PostsContext";

export default function SubmitPage() {
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Force pinned to false for public submissions
    createPost({ ...data, pinned: false });
    navigate("/");
  };

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-8 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
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
        <h1 className="font-display text-3xl font-bold text-gray-900">
          Submit an Opportunity
        </h1>
        <p className="mt-2 text-gray-600">
          Share an event, resource, or deadline with the community.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <AdminPostForm onSubmit={handleSubmit} submitLabel="Submit Post" />
      </div>
    </main>
  );
}
