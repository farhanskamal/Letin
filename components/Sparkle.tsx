type SparkleProps = {
  color?: "yellow" | "blue";
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Sparkle({
  color = "yellow",
  size = 12,
  className = "",
  style,
}: SparkleProps) {
  const fill = color === "yellow" ? "#FFDE4C" : "#36B5FF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill={fill} />
    </svg>
  );
}
