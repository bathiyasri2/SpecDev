import { episodes } from "@/content/episodes";
import type { Episode } from "@/content/types";

export function getEpisodesNewestFirst(): Episode[] {
  return [...episodes].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFeaturedEpisode(): Episode {
  return getEpisodesNewestFirst()[0];
}

export function formatEpisodeDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}