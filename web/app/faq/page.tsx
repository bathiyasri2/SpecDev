import { PageHeader } from "@/components/PageHeader";
import { FaqSection } from "@/components/FaqSection";
import { faqItems } from "@/content/faq";

export default function FaqPage() {
  return (
    <>
      <PageHeader title="FAQ" subtitle="Practical answers about the show and this site." />
      <FaqSection items={faqItems} />
    </>
  );
}