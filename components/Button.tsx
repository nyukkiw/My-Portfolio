import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-[transform,background-color] duration-200 hover:-translate-y-px";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "border border-accent bg-transparent text-accent hover:bg-accent/10",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
