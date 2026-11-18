import type { Episode } from "@/content/types";
import { formatEpisodeDate } from "@/lib/episodes";

type FeaturedEpisodeProps = {
  episode: Episode;
};

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <article className="featured-episode">
      <p className="featured-label">Featured episode</p>
      <h2 className="featured-title">{episode.title}</h2>
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
      <p className="featured-summary">{episode.summary}</p>
    </article>
  );
}