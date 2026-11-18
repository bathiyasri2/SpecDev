import { PageHeader } from "@/components/PageHeader";
import { about } from "@/content/about";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" subtitle="What we cover, who we are for, and who hosts." />
      <div className="prose">
        {about.bodyParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}