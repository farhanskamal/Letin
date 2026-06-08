import { FILTER_TABS, CATEGORY_CONFIG } from "@/lib/utils";
import type { FilterCategory } from "@/lib/types";

type CategoryFilterProps = {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_TABS.map((tab) => {
        const isActive = active === tab.value;
        const categoryColor =
          tab.value !== "all" ? CATEGORY_CONFIG[tab.value].hex : null;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
              isActive
                ? "bg-letin-yellow text-letin-ink shadow-letin"
                : "bg-white/90 text-letin-ink/70 hover:bg-white hover:text-letin-ink"
            }`}
            style={
              isActive && categoryColor
                ? { backgroundColor: categoryColor }
                : undefined
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
