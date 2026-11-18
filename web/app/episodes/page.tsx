import { PageHeader } from "@/components/PageHeader";
import { EpisodeList } from "@/components/EpisodeList";

export default function EpisodesPage() {
  return (
    <>
      <PageHeader
        title="Episodes"
        subtitle="Twenty conversations, newest first—all sample content for this showcase."
      />
      <EpisodeList />
    </>
  );
}