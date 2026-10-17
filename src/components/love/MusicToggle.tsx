import { useEffect, useRef, useState } from "react";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { love } from "@/love.config";

export function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!love.music) return;
    const a = new Audio();
    a.loop = true;
    a.volume = 0.5;
    a.preload = "none";
    a.src = love.music;
    // check the file exists without autoplaying
    fetch(love.music, { method: "HEAD" })
      .then((r) => setAvailable(r.ok && (r.headers.get("content-type") ?? "").startsWith("audio")))
      .catch(() => setAvailable(false));
    ref.current = a;
    return () => a.pause();
  }, []);

  if (!available) return null;

  const toggle = async () => {
    const a = ref.current!;
    if (playing) { a.pause(); setPlaying(false); }
    else { try { await a.play(); setPlaying(true); } catch { setPlaying(false); } }
  };
  const mute = () => { const a = ref.current!; a.muted = !a.muted; setMuted(a.muted); };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex gap-2">
      <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} className="rounded-full bg-ivory/80 p-3 text-burgundy shadow-soft backdrop-blur">
        {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      </button>
      {playing && (
        <button onClick={mute} aria-label={muted ? "Unmute" : "Mute"} className="rounded-full bg-ivory/80 p-3 text-burgundy shadow-soft backdrop-blur">
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
