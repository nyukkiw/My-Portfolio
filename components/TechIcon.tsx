import { techIcons } from "./techIcons";

type Props = { name: string; className?: string };

// Logo satu warna (fill=currentColor). Dekoratif: nama teknologi sudah ada sebagai teks.
export function TechIcon({ name, className }: Props) {
  const path = techIcons[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
