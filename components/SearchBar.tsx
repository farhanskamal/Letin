type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search posts, tags, keywords…",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-letin-purple-dark"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-0 bg-white py-3 pl-10 pr-4 text-sm text-letin-ink shadow-card transition-shadow placeholder:text-letin-purple-dark/50 focus:outline-none focus:ring-2 focus:ring-letin-yellow"
      />
    </div>
  );
}
