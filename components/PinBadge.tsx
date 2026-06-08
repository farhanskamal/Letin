export function PinBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-letin-yellow px-2.5 py-0.5 text-xs font-bold text-letin-ink shadow-letin">
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
      </svg>
      Pinned
    </span>
  );
}
