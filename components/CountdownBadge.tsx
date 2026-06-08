import { useCountdown } from "@/lib/hooks/useCountdown";

type CountdownBadgeProps = {
  deadline?: string;
  size?: "sm" | "md";
};

export function CountdownBadge({ deadline, size = "sm" }: CountdownBadgeProps) {
  const countdown = useCountdown(deadline);

  if (!countdown) return null;

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  const colorClasses = countdown.isPast
    ? "bg-gray-200 text-gray-600"
    : countdown.isUrgent
      ? "bg-red-500 text-white animate-urgent-pulse"
      : "bg-board-paper text-gray-700 ring-1 ring-gray-200";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${colorClasses}`}
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {countdown.label}
    </span>
  );
}
