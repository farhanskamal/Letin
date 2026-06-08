import { CATEGORY_CONFIG } from "@/lib/utils";
import type { PostCategory } from "@/lib/types";

type CategoryBadgeProps = {
  category: PostCategory;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${config.bgClass} ${config.textClass}`}
    >
      {config.label}
    </span>
  );
}
