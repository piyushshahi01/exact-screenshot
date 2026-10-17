/**
 * Everything personal lives here: her name, the letters, captions, photos and music.
 * Replace photo `src` values with your own images (put files in /public/photos/).
 * Leave `src` empty ("") to show an elegant placeholder frame instead.
 */
export type Photo = { src: string; caption: string; alt: string };

export const love = {
  herName: "my love",
  signature: "— yours, always",

  opening: {
    title: "Hey, my favourite person. ❤️",
    lines: [
      "I made a little something for you.",
      "Not because it's a special day,",
      "but because YOU are special to me. Every day.",
    ],
    button: "Open this, my love ♡",
  },

  apology: {
    title: "Before anything else, I'm sorry.",
    paragraphs: [
      "My love, I know I messed up. I picked a fight, and I know that was my fault. You didn't deserve to be hurt by the person who is supposed to make you feel safe, valued, and loved.",
      "I'm not making excuses for how I acted. I just want you to know that I regret it. You mean so much more to me than any argument, any ego, or any moment of anger.",
      "I'm sorry for making your heart heavy when all I ever want is to be one of the reasons you smile.",
      "I can't undo that moment, but I can learn from it, listen better, understand you better, and show you through my actions how much I love you.",
      "You deserve patience, kindness, honesty, and love — especially from me.",
      "I'm genuinely sorry, baby. And I love you more than my words can properly explain.",
    ],
  },

  galleryTitle:
    "If I could keep a thousand beautiful things, I'd still look for you in every one of them.",

  photos: [
    { src: "", caption: "My favourite face.", alt: "Her photo 1" },
    { src: "", caption: "How are you even real?", alt: "Her photo 2" },
    { src: "", caption: "One picture, a thousand feelings.", alt: "Her photo 3" },
    { src: "", caption: "The girl who makes my world softer.", alt: "Her photo 4" },
    { src: "", caption: "My pretty girl, always.", alt: "Her photo 5" },
    { src: "", caption: "Still my favourite view.", alt: "Her photo 6" },
  ] as Photo[],

  neverDoubt: [
    "I love you, even when I struggle to express it properly.",
    "You are never just another person in my life. You are someone incredibly precious to me.",
    "Your feelings matter to me, even when we disagree.",
    "I don't want to win arguments against you. I want us to understand each other and grow together.",
  ],

  notesTitle: "Open these whenever you need a little reminder ♡",
  notes: [
    {
      label: "When you miss me",
      text: "If I could be anywhere right now, I'd choose to be beside you. No big plans, no perfect moment. Just me, you, and the comfort of being together.",
    },
    {
      label: "When you feel upset with me",
      text: "You never have to hide your feelings from me. I want to listen, understand, and make things right instead of expecting you to pretend everything is okay.",
    },
    {
      label: "When you need to smile",
      text: "Official reminder: someone out here thinks you're ridiculously pretty, endlessly special, and worth making a whole website for. Yes, that someone is me. 🙈❤️",
    },
    {
      label: "When you doubt how much I love you",
      text: "I may not always find the perfect words, but my feelings for you are real. I want to keep choosing you with patience, honesty, respect, and little efforts that make you feel loved.",
    },
  ],

  filmTitle: "Proof that my camera roll has excellent taste.",

  finalLetter: {
    title: "One thing I need you to know...",
    paragraphs: [
      "I don't expect a beautiful website to fix what happened, and I don't expect you to stop feeling hurt just because I made this.",
      "I made it because I wanted to put some effort into telling you what I sometimes fail to express properly.",
      "You matter to me. Your happiness matters to me. Your feelings matter to me.",
      "I'm sorry for my part in what happened. I love you, and I want to be better at showing you that love — not just today, not just when things are perfect, but in the little moments too.",
      "You don't have to forgive me immediately. Take the time you need. I'll respect that.",
      "I just hope that somewhere in all these little words and pictures, you can feel how much love I have for you.",
    ],
    closing: ["I'm sorry, my pretty girl.", "I love you. Always. ❤️"],
  },

  finale: {
    title: "Can I make things right, one little step at a time? ♡",
    sub: "I can't promise I'll never make a mistake. But I can promise to keep learning, listen to you, respect your feelings, and never stop putting effort into us.",
    talk: {
      button: "Let's talk, my love ♡",
      reply:
        "Thank you for giving me a chance to talk to you. I'll listen with an open heart. No arguments, no excuses. Just us. ❤️",
    },
    time: {
      button: "I need a little time",
      reply:
        "Of course, my love. Take all the time you need. I'm sorry for hurting you, and I'll respect your space. You don't have to rush anything. ❤️",
    },
  },

  /** Put a royalty-free track at /public/music/love.mp3, or leave "" to hide music. */
  music: "/music/love.mp3",
};
