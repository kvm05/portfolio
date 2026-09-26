export default function Logo() {
  return (
    <svg
      viewBox="0 0 34 24"
      width="34"
      height="24"
      className="overflow-visible"
      aria-label="KM logo"
    >
      <path
        d="M2 2 L2 22 M2 12 L12 2 M2 12 L12 22"
        stroke="#E8B95B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="logo-path"
      />
      <path
        d="M18 22 L18 2 L24 14 L30 2 L30 22"
        stroke="#E8B95B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="logo-path"
        style={{ animationDelay: "0.3s" }}
      />
      <circle cx="17" cy="12" r="1.3" fill="#4FB6A8" className="logo-orbit" />
    </svg>
  );
}