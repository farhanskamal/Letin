import { useState } from "react";
import { useBookmarks } from "@/lib/hooks/useBookmarks";

type BookmarkButtonProps = {
  postId: string;
  size?: "sm" | "md";
  variant?: "light" | "dark";
};

export function BookmarkButton({
  postId,
  size = "sm",
  variant = "light",
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [animating, setAnimating] = useState(false);
  const saved = isBookmarked(postId);

  const iconSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const buttonSize = size === "sm" ? "p-1.5" : "p-2";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(postId);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Remove bookmark" : "Save post"}
      aria-pressed={saved}
      className={`rounded-full ${buttonSize} transition-colors ${
        variant === "dark" ? "hover:bg-white/20" : "hover:bg-letin-muted"
      } ${animating ? "animate-bookmark-pop" : ""}`}
    >
      <svg
        className={`${iconSize} transition-colors ${
          saved
            ? "fill-letin-yellow text-letin-yellow"
            : variant === "dark"
              ? "fill-none text-white/70"
              : "fill-none text-letin-purple-dark/40"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    </button>
  );
}
