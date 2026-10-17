import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Opening, Apology, Gallery, NeverDoubt, Notes, FilmStrip, Lightbox, ImportantLetter, Finale } from "@/components/love/Sections";
import { MusicToggle } from "@/components/love/MusicToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For you, my love ♡" },
      { name: "description", content: "A little love letter, made just for you." },
      { property: "og:title", content: "For you, my love ♡" },
      { property: "og:description", content: "A little love letter, made just for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "apology", label: "Sorry" },
  { id: "gallery", label: "You" },
  { id: "notes", label: "Notes" },
  { id: "letter", label: "Letter" },
  { id: "finale", label: "Us" },
];

function Index() {
  const [opened, setOpened] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>{!opened && <Opening onOpen={() => { setOpened(true); window.scrollTo(0, 0); }} />}</AnimatePresence>

      {opened && (
        <>
          <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-rose to-burgundy" />
          <nav className="fixed top-3 left-1/2 z-50 hidden -translate-x-1/2 gap-1 rounded-full bg-ivory/70 px-2 py-1 shadow-soft backdrop-blur sm:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-full px-3 py-1 font-serif text-sm text-burgundy/70 italic transition-colors hover:bg-blush/60 hover:text-burgundy">{n.label}</a>
            ))}
          </nav>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Apology />
            <Gallery onOpen={setLightbox} />
            <NeverDoubt />
            <Notes />
            <FilmStrip onOpen={setLightbox} />
            <ImportantLetter />
            <Finale />
          </motion.div>
          <Lightbox index={lightbox} setIndex={setLightbox} />
        </>
      )}
      <MusicToggle />
    </main>
  );
}
