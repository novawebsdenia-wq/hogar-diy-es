"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/headings";

interface Props {
  headings: Heading[];
}

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px" },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav className="not-prose rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-400">
        En este artículo
      </p>
      <ol className="space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
            <a
              href={`#${h.id}`}
              className={`block truncate transition-colors hover:text-green-700 ${
                activeId === h.id
                  ? "font-semibold text-green-700"
                  : "text-gray-600"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
