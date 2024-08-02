import { User } from "@/models/User";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString(); // Return the count as is if it's less than 1000
  } else if (count < 1000000) {
    // For counts in thousands
    const formattedCount = (count / 1000).toFixed(1);
    return `${formattedCount}K`;
  } else {
    // For counts in millions
    const formattedCount = (count / 1000000).toFixed(1);
    return `${formattedCount}M`;
  }
}

export function generateName() {
  const adjectives = [
    "Whimsical",
    "Enchanting",
    "Mystical",
    "Spectacular",
    "Breathtaking",
    "Astounding",
    "Captivating",
    "Dazzling",
    "Radiant",
    "Sparkling",
    "Ethereal",
    "Marvelous",
    "Enigmatic",
    "Vibrant",
    "Fascinating",
    "Illustrious",
    "Mesmerizing",
    "Phenomenal",
    "Resplendent",
    "Ineffable",
  ];

  const nouns = [
    "Phoenix",
    "Celestial",
    "Infinity",
    "Aurora",
    "Eclipse",
    "Serenity",
    "Galaxy",
    "Dreamweaver",
    "Velvetine",
    "Harmony",
    "Nebula",
    "Tranquility",
    "Luminosity",
    "Cascade",
    "Zephyr",
    "Peregrine",
    "Cynosure",
    "Aegis",
    "Umbra",
    "Quasar",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

export const getLoggedUser = (): User | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};
