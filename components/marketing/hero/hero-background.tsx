/**
 * Ambient background: a faint dot grid fading toward the edges, plus one
 * contained, low-opacity glow. No page-wide gradient — kept deliberately quiet.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 dark:opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute -top-32 right-0 size-[36rem] rounded-full opacity-[0.07] blur-3xl dark:opacity-[0.12]"
        style={{ backgroundColor: "var(--highlight)" }}
      />
    </div>
  );
}
