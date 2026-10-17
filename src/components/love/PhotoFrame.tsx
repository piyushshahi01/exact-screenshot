import { Heart } from "lucide-react";
import type { Photo } from "@/love.config";

/** Shows her photo at its natural aspect ratio, or a soft placeholder if none is set. */
export function PhotoImg({ photo, className = "" }: { photo: Photo; className?: string }) {
  if (photo.src) {
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className={`block h-auto w-full object-contain ${className}`}
      />
    );
  }
  return (
    <div
      className={`grain flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush to-muted text-burgundy/60 ${className}`}
    >
      <Heart className="h-7 w-7 fill-rose/50 stroke-burgundy/40" />
      <span className="font-serif text-sm italic">her photo goes here</span>
    </div>
  );
}
