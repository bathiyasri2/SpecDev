import Link from "next/link";
import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { show } from "@/content/show";
import { getFeaturedEpisode } from "@/lib/episodes";

export default function HomePage() {
  const featured = getFeaturedEpisode();

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <h1 id="home-title" className="page-title">
          {show.name}
        </h1>
        <p className="home-tagline">{show.tagline}</p>
      </section>
      <FeaturedEpisode episode={featured} />
      <Link href="/episodes" className="btn-primary">
        Browse all episodes
      </Link>
    </>
  );
}