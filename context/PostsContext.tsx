import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPosts } from "@/lib/mockData";
import { generatePostId } from "@/lib/utils";
import type { Post } from "@/lib/types";

const STORAGE_KEY = "letin_posts";

function readStoredPosts(): Post[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeStoredPosts(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

type PostsContextValue = {
  posts: Post[];
  createPost: (data: Omit<Post, "id" | "postedAt">) => Post;
  updatePost: (id: string, data: Partial<Omit<Post, "id">>) => void;
  deletePost: (id: string) => void;
  getPostById: (id: string) => Post | undefined;
  resetToDefaults: () => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = readStoredPosts();
    return stored ?? getPosts();
  });

  const persistAndSet = useCallback((updater: (prev: Post[]) => Post[]) => {
    setPosts((prev) => {
      const next = updater(prev);
      writeStoredPosts(next);
      return next;
    });
  }, []);

  const createPost = useCallback(
    (data: Omit<Post, "id" | "postedAt">): Post => {
      const newPost: Post = {
        ...data,
        id: generatePostId(),
        postedAt: new Date().toISOString(),
      };
      persistAndSet((prev) => [newPost, ...prev]);
      return newPost;
    },
    [persistAndSet],
  );

  const updatePost = useCallback(
    (id: string, data: Partial<Omit<Post, "id">>) => {
      persistAndSet((prev) =>
        prev.map((post) => (post.id === id ? { ...post, ...data } : post)),
      );
    },
    [persistAndSet],
  );

  const deletePost = useCallback(
    (id: string) => {
      persistAndSet((prev) => prev.filter((post) => post.id !== id));
    },
    [persistAndSet],
  );

  const getPostById = useCallback(
    (id: string) => posts.find((post) => post.id === id),
    [posts],
  );

  const resetToDefaults = useCallback(() => {
    const defaults = getPosts();
    setPosts(defaults);
    writeStoredPosts(defaults);
  }, []);

  const value = useMemo(
    () => ({
      posts,
      createPost,
      updatePost,
      deletePost,
      getPostById,
      resetToDefaults,
    }),
    [posts, createPost, updatePost, deletePost, getPostById, resetToDefaults],
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
