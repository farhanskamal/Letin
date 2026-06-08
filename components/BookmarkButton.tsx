import { useState } from "react";
import { useBookmarks } from "@/context/BookmarksContext";

type BookmarkButtonProps = {
  postId: string;
  size?: "sm" | "md";
  theme?: "light" | "dark";
};

export function BookmarkButton({ postId, size = "sm", theme = "light" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [animating, setAnimating] = useState(false);
  const saved = isBookmarked(postId);

  const iconSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const buttonSize = size === "sm" ? "p-1.5" : "p-2";
  const hoverClass = theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/5";
  const iconColor = saved 
    ? "fill-amber-500 text-amber-500" 
    : theme === "dark" ? "fill-none text-white/80" : "fill-none text-gray-400";

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
      className={`rounded-full ${buttonSize} transition-colors ${hoverClass} ${
        animating ? "animate-bookmark-pop" : ""
      }`}
    >
      <svg
        className={`${iconSize} transition-colors ${iconColor}`}
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
