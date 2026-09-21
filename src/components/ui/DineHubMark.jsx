const DineHubMark = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`flex items-center justify-center overflow-hidden rounded-lg bg-orange-500 text-slate-950 shadow-[0_6px_18px_rgba(249,115,22,0.22)] transition-colors group-hover:bg-orange-600 ${className}`}
  >
    <svg viewBox="0 0 32 32" fill="none" className="h-[72%] w-[72%]" role="presentation">
      <path
        d="M7.5 18.75c.65-5.15 3.82-8.25 8.5-8.25s7.85 3.1 8.5 8.25"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M5.5 19h21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M8 19.25h16c-.2 2.25-1.75 3.75-4.25 3.75h-7.5C9.75 23 8.2 21.5 8 19.25Z"
        fill="currentColor"
      />
      <path d="M16 7v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  </span>
)

export default DineHubMark
