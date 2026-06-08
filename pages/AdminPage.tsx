import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminPostForm } from "@/components/AdminPostForm";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PinBadge } from "@/components/PinBadge";
import { usePosts } from "@/context/PostsContext";
import { useVerifiedUsers } from "@/context/VerifiedUsersContext";
import { formatPostedDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

/* DEMO ONLY — replace with server-side auth for production */
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "board2025";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

let toastId = 0;

export default function AdminPage() {
  const { posts, createPost, updatePost, deletePost } = usePosts();
  const { verifiedUsers, addVerifiedUser, removeVerifiedUser } = useVerifiedUsers();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newVerifiedUser, setNewVerifiedUser] = useState("");
  const [loginError, setLoginError] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const handleCreate = (data: Omit<Post, "id" | "postedAt">) => {
    createPost(data);
    showToast("Post created and pinned to the board!");
  };

  const handleUpdate = (data: Omit<Post, "id" | "postedAt">) => {
    if (!editingPost) return;
    updatePost(editingPost.id, data);
    setEditingPost(null);
    showToast("Post updated successfully.");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this post from the board?")) {
      deletePost(id);
      if (editingPost?.id === id) setEditingPost(null);
      showToast("Post removed from the board.");
    }
  };

  const handleTogglePin = (post: Post) => {
    updatePost(post.id, { pinned: !post.pinned });
    showToast(post.pinned ? "Post unpinned." : "Post pinned to top!");
  };

  if (!isAuthenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-card">
          <h1 className="font-display mb-2 text-2xl font-bold text-gray-900">
            Admin Login
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            Sign in to manage board posts.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-500">{loginError}</p>
            )}
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Sign In
            </button>
          </form>

          <div className="mt-5 rounded-lg bg-board-paper px-4 py-3">
            <p className="text-xs font-medium text-gray-500">Demo credentials</p>
            <p className="mt-1 font-mono text-xs text-gray-700">
              admin / board2025
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 block text-center text-sm text-gray-500 hover:text-gray-900"
          >
            Back to Board
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6">
      {/* Toast notifications */}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-fade-in-up rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === "success"
                ? "bg-letin-yellow text-letin-ink"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Create, edit, and pin posts for the community board.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/"
            className="btn-secondary"
          >
            View Board
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsAuthenticated(false);
              setUsername("");
              setPassword("");
            }}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mb-10 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-display mb-4 text-xl font-bold text-letin-ink">
          {editingPost ? "Edit Post" : "Create Post"}
        </h2>
        <AdminPostForm
          key={editingPost?.id ?? "create"}
          initialData={editingPost ?? undefined}
          onSubmit={editingPost ? handleUpdate : handleCreate}
          onCancel={editingPost ? () => setEditingPost(null) : undefined}
          submitLabel={editingPost ? "Save Changes" : "Create Post"}
        />
      </section>

      <section className="mb-10 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-display mb-4 text-xl font-bold text-letin-ink">
          Verified Users
        </h2>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newVerifiedUser}
            onChange={(e) => setNewVerifiedUser(e.target.value)}
            placeholder="Username to verify..."
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="button"
            onClick={() => {
              if (newVerifiedUser.trim()) {
                addVerifiedUser(newVerifiedUser.trim());
                setNewVerifiedUser("");
                showToast("User verified.");
              }
            }}
            className="btn-primary"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {verifiedUsers.map((user) => (
            <div key={user} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm">
              <span className="font-medium text-gray-700">{user}</span>
              <button
                onClick={() => {
                  removeVerifiedUser(user);
                  showToast("User verification removed.");
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          {verifiedUsers.length === 0 && (
            <p className="text-sm text-gray-500">No verified users.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-4 text-xl font-bold text-letin-ink">
          All Posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <p className="text-sm text-gray-500">No posts on the board yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <CategoryBadge category={post.category} />
                    {post.pinned && <PinBadge />}
                  </div>
                  <h3 className="truncate font-medium text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {formatPostedDate(post.postedAt)} · {post.postedBy}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(post)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200 hover:bg-board-paper"
                  >
                    {post.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost(post)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-gray-200 hover:bg-board-paper"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
