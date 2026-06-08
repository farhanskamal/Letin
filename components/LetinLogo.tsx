type LetinLogoProps = {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

const SIZES = {
  sm: { icon: 36, text: "text-lg" },
  md: { icon: 48, text: "text-2xl" },
  lg: { icon: 64, text: "text-4xl" },
};

export function LetinLogo({
  size = "md",
  showWordmark = true,
  className = "",
}: LetinLogoProps) {
  const { icon, text } = SIZES[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex shrink-0 items-center justify-center rounded-2xl bg-letin-yellow shadow-letin"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-[58%] w-[58%]"
          aria-hidden="true"
        >
          <path d="M24 8 L32 20 L24 16 L16 20 Z" fill="white" />
          <path d="M40 24 L28 32 L32 24 L28 16 Z" fill="white" />
          <path d="M24 40 L16 28 L24 32 L32 28 Z" fill="white" />
          <path d="M8 24 L20 16 L16 24 L20 32 Z" fill="white" />
        </svg>
      </div>
      {showWordmark && (
        <span className={`font-display font-bold tracking-tight text-white ${text}`}>
          Letin
        </span>
      )}
    </div>
  );
}
