import { content } from "@/content";

function Separator() {
  return <span aria-hidden="true">&middot;</span>;
}

export function Footer() {
  const { footer } = content;

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <p className="flex flex-wrap items-center justify-center gap-x-3 text-center font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          <span>{footer.brand}</span>
          <Separator />
          <span>&copy; {footer.year}</span>
          {footer.handles.map((handle) => (
            <span key={handle.label} className="contents">
              <Separator />
              <a
                href={handle.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center normal-case transition-colors duration-200 hover:text-accent"
              >
                {handle.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
