import { SITE_URL } from "@/lib/constants";

interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
}

export function FAQSchema({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
