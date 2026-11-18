import type { Episode } from "@/content/types";
import { formatEpisodeDate } from "@/lib/episodes";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="episode-card">
      <h2 className="episode-card-title">{episode.title}</h2>
      <dl className="episode-meta">
        <div>
          <dt>Published</dt>
          <dd>{formatEpisodeDate(episode.publishedAt)}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{episode.durationMinutes} min</dd>
        </div>
      </dl>
      <p className="episode-card-summary">{episode.summary}</p>
    </article>
  );
}