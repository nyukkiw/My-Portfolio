import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-judul`}
      className="py-(--space-section)"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
            {index}
          </p>
          <h2
            id={`${id}-judul`}
            className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
