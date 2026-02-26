import { ReactNode } from "react";

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="scroll-card rounded-sm p-5">
      <h2 className="flex items-center gap-2 font-title text-lg text-ink">
        <span className="inline-block h-5 w-1 bg-vermilion" aria-hidden />
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
