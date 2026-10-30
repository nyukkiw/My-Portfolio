import { content } from "@/content";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { site, nav } = content;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <a
          href="#beranda"
          aria-label={`${site.name}, ke beranda`}
          className="inline-flex min-h-11 min-w-0 items-center font-mono text-base font-semibold"
        >
          {site.wordmark}
          <span aria-hidden="true" className="cursor-blink text-accent">
            _
          </span>
        </a>

        {/* Layar >= 640px: tautan berjajar */}
        <nav aria-label={nav.label} className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Layar < 640px: tombol Menu */}
        <MobileNav
          label={nav.label}
          openLabel={nav.menuOpen}
          closeLabel={nav.menuClose}
          links={nav.links}
        />
      </div>
    </header>
  );
}
