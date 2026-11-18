import { getEpisodesNewestFirst } from "@/lib/episodes";
import { EpisodeCard } from "./EpisodeCard";

export function EpisodeList() {
  const episodes = getEpisodesNewestFirst();

  return (
    <ol className="episode-list">
      {episodes.map((episode) => (
        <li key={episode.id}>
          <EpisodeCard episode={episode} />
        </li>
      ))}
    </ol>
  );
}