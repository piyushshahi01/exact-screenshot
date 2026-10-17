# A love letter, made for her

Everything personal lives in **`src/love.config.ts`** — her name, every letter, captions, notes, button text, photos and music.

## Replace the photos
1. Put her photos in `public/photos/` (e.g. `1.jpg`, `2.jpg`).
2. In `src/love.config.ts`, set each `src`, e.g. `src: "/photos/1.jpg"`. Photos keep their original shape.
3. Add or remove entries to show more or fewer photos. Empty `src` shows a soft placeholder.

## Change the words
Edit any text in `src/love.config.ts` (apology, captions, notes, final letter, final buttons).

## Add music (optional)
Place a royalty-free track at `public/music/love.mp3`. A small music button appears bottom-right; it never plays until clicked. No file = no button, site works the same.

## Deploy
Click **Publish** in Lovable. The page is marked `noindex` so search engines don't list it.
