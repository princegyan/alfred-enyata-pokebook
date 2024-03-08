// PokemonColorUtils.ts

// Import statement
import ColorThief from "colorthief";

// Type definition
export type PokeType = keyof typeof TYPE_EMOJI_MAP;

// Constants
export const BASE_URL = "https://pokeapi.co/api/v2";

// Emoji map
const TYPE_EMOJI_MAP = {
  "normal": "🐻",
  "fighting": "🥊",
  "flying": "🦋",
  "poison": "☠️",
  "ground": "🏜️",
  "rock": "🪨",
  "bug": "🐞",
  "ghost": "👻",
  "steel": "⚙️",
  "fire": "🔥",
  "water": "🌊",
  "grass": "🌿",
  "electric": "⚡",
  "psychic": "🔮",
  "ice": "❄️",
  "dragon": "🐉",
  "dark": "🌑",
  "fairy": "🧚"
} as const;

// ColorThief utility function
export function getDominantColor(imageUrl: string, callback: (color: any) => void) {
  const img: HTMLImageElement = document.createElement("img");
  const colorThief = new ColorThief();
  img.setAttribute("src", imageUrl);
  img.crossOrigin = "Anonymous";
  if (img.complete) {
    callback(colorThief.getColor(img));
  } else {
    img.addEventListener("load", function () {
      callback(colorThief.getColor(img));
    });
  }
}

// Export Emoji map
export { TYPE_EMOJI_MAP };
