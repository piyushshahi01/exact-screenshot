import { useMemo } from "react";
import { Heart } from "lucide-react";

function seeded(n: number) {
  // deterministic pseudo-random so SSR and client match
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function Petals({ count = 14, variant = "petal" }: { count?: number; variant?: "petal" | "heart" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 1) * 100,
        size: 8 + seeded(i + 7) * 14,
        dur: 14 + seeded(i + 3) * 16,
        delay: -seeded(i + 11) * 25,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-0 text-rose"
          style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        >
          {variant === "heart" ? (
            <Heart style={{ width: p.size, height: p.size }} className="fill-rose/60 stroke-none" />
          ) : (
            <span
              className="block bg-rose/70"
              style={{ width: p.size, height: p.size * 1.3, borderRadius: "80% 0 80% 0" }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

export function Stars({ count = 40, className = "bg-ivory" }: { count?: number; className?: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 101) * 100,
        top: seeded(i + 202) * 100,
        size: 1 + seeded(i + 303) * 2.5,
        delay: seeded(i + 404) * 3,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s, i) => (
        <span
          key={i}
          className={`animate-twinkle absolute rounded-full ${className}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
