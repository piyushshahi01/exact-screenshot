import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Mail, MailOpen, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { love } from "@/love.config";
import { Petals, Stars } from "./Ambient";
import { PhotoImg } from "./PhotoFrame";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 text-xs tracking-[0.35em] uppercase ${light ? "text-blush/80" : "text-burgundy/60"}`}>
      {children}
    </p>
  );
}

/* ---------------- 1. Opening ---------------- */
export function Opening({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();
  const go = () => {
    setOpening(true);
    setTimeout(onOpen, reduce ? 50 : 1500);
  };
  return (
    <motion.section
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
      className="grain bg-blush-glow fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Stars count={30} className="bg-ivory" />
      <Petals count={16} />

      {/* Envelope */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative mb-10 h-36 w-52 sm:h-44 sm:w-64"
        style={{ perspective: 800 }}
      >
        {/* letter */}
        <motion.div
          animate={opening ? { y: -70 } : { y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="paper-lines absolute inset-x-4 top-3 bottom-3 rounded-sm shadow-soft"
        >
          <p className="mt-4 font-script text-2xl text-burgundy">for you</p>
        </motion.div>
        {/* body */}
        <div className="absolute inset-0 rounded-md bg-ivory shadow-soft" style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} />
        {/* flap */}
        <motion.div
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "top", clipPath: "polygon(0 0, 100% 0, 50% 58%)", zIndex: opening ? 0 : 2 }}
          className="absolute inset-0 rounded-md bg-blush"
        />
        <motion.div
          animate={opening ? { opacity: 0, scale: 0.4 } : { opacity: 1 }}
          className="animate-heartbeat absolute top-[44%] left-1/2 z-10 -ml-5 grid h-10 w-10 place-items-center rounded-full bg-burgundy shadow-glow"
        >
          <Heart className="h-5 w-5 fill-ivory stroke-none" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="text-4xl leading-tight font-medium text-burgundy italic sm:text-6xl"
      >
        {love.opening.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1.2 }}
        className="mt-6 space-y-1 font-serif text-lg text-burgundy/80 sm:text-xl"
      >
        {love.opening.lines.map((l) => <p key={l}>{l}</p>)}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        onClick={go}
        disabled={opening}
        className="btn-love mt-10"
      >
        {love.opening.button}
      </motion.button>
    </motion.section>
  );
}

/* ---------------- 2. Apology letter ---------------- */
export function Apology() {
  return (
    <section id="apology" className="relative px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1 }}
        className="grain paper-lines relative mx-auto max-w-2xl rounded-sm px-7 py-12 shadow-soft sm:px-14 sm:py-16"
      >
        <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-blush/70" aria-hidden />
        <Eyebrow>I owe you an apology</Eyebrow>
        <h2 className="mb-8 text-3xl text-burgundy italic sm:text-5xl">{love.apology.title}</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.35 } } }}
          className="space-y-5 font-serif text-lg leading-[2.1rem] text-foreground sm:text-xl"
        >
          {love.apology.paragraphs.map((p) => (
            <motion.p key={p} variants={fade}>{p}</motion.p>
          ))}
        </motion.div>
        <p className="mt-10 text-right font-script text-3xl text-burgundy">{love.signature}</p>
      </motion.div>
    </section>
  );
}

/* ---------------- 3. Gallery collage ---------------- */
const tilts = [-3, 2, -1.5, 3, -2, 1.5];
export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="gallery" className="relative px-5 py-24">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="mx-auto mb-16 max-w-3xl text-center">
        <Eyebrow>Her little corner of my world</Eyebrow>
        <h2 className="text-3xl leading-snug text-burgundy italic sm:text-5xl">{love.galleryTitle}</h2>
      </motion.div>
      <div className="mx-auto max-w-5xl columns-1 gap-8 sm:columns-2 lg:columns-3">
        {love.photos.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            style={{ rotate: tilts[i % tilts.length] }}
            className="mx-auto mb-10 max-w-xs cursor-pointer break-inside-avoid bg-paper p-3 pb-4 shadow-soft"
            onClick={() => onOpen(i)}
          >
            <PhotoImg photo={p} className="sepia-[.12]" />
            <figcaption className="mt-3 text-center font-script text-2xl text-burgundy">{p.caption}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 4. Never doubt ---------------- */
export function NeverDoubt() {
  return (
    <section id="never-doubt" className="relative overflow-hidden bg-blush/40 px-5 py-28">
      <Petals count={8} variant="heart" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow>Things I never want you to doubt</Eyebrow>
        <div className="mt-12 space-y-16">
          {love.neverDoubt.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-5"
            >
              <span className="flex items-center gap-3 text-rose">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose" />
                <Heart className="h-4 w-4 fill-rose stroke-none" />
                <span className="font-serif text-sm text-burgundy/60">0{i + 1}</span>
                <Heart className="h-4 w-4 fill-rose stroke-none" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose" />
              </span>
              <p className="font-serif text-2xl leading-snug text-burgundy sm:text-4xl">{t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. Love notes ---------------- */
export function Notes() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="notes" className="px-5 py-28">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="mx-auto mb-14 max-w-2xl text-center">
        <Eyebrow>An interactive love note</Eyebrow>
        <h2 className="text-3xl text-burgundy italic sm:text-5xl">{love.notesTitle}</h2>
      </motion.div>
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {love.notes.map((n, i) => {
          const isOpen = open === i;
          return (
            <motion.button
              key={n.label}
              layout
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              whileHover={{ y: -4 }}
              className={`grain relative rounded-md border p-7 text-left shadow-soft transition-colors ${isOpen ? "paper-lines border-rose" : "bg-paper"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-serif text-xl text-burgundy italic sm:text-2xl">{n.label}</span>
                <motion.span animate={{ rotate: isOpen ? -8 : 0 }} className="shrink-0 text-rose">
                  {isOpen ? <MailOpen className="h-6 w-6" /> : <Mail className="h-6 w-6" />}
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.p
                    key="t"
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden pt-5 font-serif text-lg leading-[2.1rem] text-foreground"
                  >
                    {n.text}
                  </motion.p>
                ) : (
                  <motion.p key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-3 text-xs tracking-[0.25em] text-burgundy/50 uppercase">
                    tap to open ♡
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- 6. Film strip ---------------- */
export function FilmStrip({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="film" className="relative overflow-hidden py-24">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="mb-12 px-5 text-center">
        <Eyebrow>A little collection of her</Eyebrow>
        <h2 className="text-3xl text-burgundy italic sm:text-5xl">{love.filmTitle}</h2>
      </motion.div>
      <div className="grain bg-plum py-5">
        <div className="mb-3 h-3 w-full" style={{ background: "repeating-linear-gradient(90deg, transparent 0 14px, var(--ivory) 14px 26px, transparent 26px 40px)", opacity: 0.6 }} />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6">
          {love.photos.map((p, i) => (
            <button key={i} onClick={() => onOpen(i)} className="w-56 shrink-0 snap-center overflow-hidden rounded-sm transition-transform hover:scale-[1.03] sm:w-64" aria-label={`View ${p.alt}`}>
              <PhotoImg photo={p} className="contrast-[1.05] saturate-[.9]" />
            </button>
          ))}
        </div>
        <div className="mt-3 h-3 w-full" style={{ background: "repeating-linear-gradient(90deg, transparent 0 14px, var(--ivory) 14px 26px, transparent 26px 40px)", opacity: 0.6 }} />
      </div>
      <p className="mt-4 text-center text-xs tracking-[0.25em] text-burgundy/50 uppercase">swipe · tap to view</p>
    </section>
  );
}

export function Lightbox({ index, setIndex }: { index: number | null; setIndex: (i: number | null) => void }) {
  const n = love.photos.length;
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/90 p-4 backdrop-blur-sm"
          onClick={() => setIndex(null)}
          role="dialog"
          aria-modal
        >
          <motion.figure
            key={index}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="max-h-[85vh] w-full max-w-md bg-paper p-3 pb-5 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] overflow-hidden"><PhotoImg photo={love.photos[index]} className="max-h-[70vh] object-contain" /></div>
            <figcaption className="mt-3 text-center font-script text-3xl text-burgundy">{love.photos[index].caption}</figcaption>
          </motion.figure>
          <button aria-label="Close" onClick={() => setIndex(null)} className="absolute top-4 right-4 rounded-full bg-ivory/90 p-2 text-burgundy"><X className="h-5 w-5" /></button>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + n) % n); }} className="absolute left-3 rounded-full bg-ivory/90 p-2 text-burgundy"><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % n); }} className="absolute right-3 rounded-full bg-ivory/90 p-2 text-burgundy"><ChevronRight className="h-5 w-5" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- 7. Most important letter ---------------- */
export function ImportantLetter() {
  return (
    <section id="letter" className="grain bg-night relative overflow-hidden px-6 py-32 text-ivory">
      <Stars count={70} className="bg-ivory" />
      <div aria-hidden className="animate-twinkle pointer-events-none absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-rose/20 blur-3xl" />
      <div aria-hidden className="animate-twinkle pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-burgundy/40 blur-3xl" style={{ animationDelay: "1.5s" }} />
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} className="mx-auto mb-10 grid h-20 w-20 place-items-center">
          <Heart className="animate-heartbeat h-16 w-16 fill-rose stroke-none drop-shadow-[0_0_25px_var(--rose)]" />
        </motion.div>
        <Eyebrow light>The most important letter</Eyebrow>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="mb-12 text-4xl text-blush italic sm:text-6xl">
          {love.finalLetter.title}
        </motion.h2>
        <div className="space-y-7 font-serif text-xl leading-relaxed text-ivory/90 sm:text-2xl">
          {love.finalLetter.paragraphs.map((p) => (
            <motion.p key={p} initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.2 }}>
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.6 }} className="mt-14 font-script text-4xl text-blush sm:text-5xl">
          {love.finalLetter.closing.map((c) => <p key={c}>{c}</p>)}
        </motion.div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ivory" />
    </section>
  );
}

/* ---------------- 8. Finale ---------------- */
export function Finale() {
  const [choice, setChoice] = useState<"talk" | "time" | null>(null);
  return (
    <section id="finale" className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
      <Petals count={12} />
      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-blush/60 shadow-glow">
          <Heart className="animate-heartbeat h-10 w-10 fill-burgundy stroke-none" />
        </div>
        <h2 className="text-4xl leading-tight text-burgundy italic sm:text-6xl">{love.finale.title}</h2>
        <p className="mx-auto mt-6 max-w-xl font-serif text-xl text-foreground/80">{love.finale.sub}</p>
        <AnimatePresence mode="wait">
          {choice === null ? (
            <motion.div key="btns" exit={{ opacity: 0, y: -10 }} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="btn-soft w-full sm:w-auto" onClick={() => setChoice("talk")}>{love.finale.talk.button}</button>
              <button className="btn-soft w-full sm:w-auto" onClick={() => setChoice("time")}>{love.finale.time.button}</button>
            </motion.div>
          ) : (
            <motion.div key="reply" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="paper-lines mt-12 rounded-sm px-7 py-8 shadow-soft">
              <Sparkles className="mx-auto mb-3 h-5 w-5 text-rose" />
              <p className="font-serif text-xl leading-[2.1rem] text-burgundy sm:text-2xl">{love.finale[choice].reply}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#apology" className="btn-soft !px-5 !py-2 !text-base">Read the letter again</a>
                <a href="#gallery" className="btn-soft !px-5 !py-2 !text-base">See the photos</a>
                <button onClick={() => setChoice(null)} className="px-3 text-sm text-burgundy/60 underline underline-offset-4">go back</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
