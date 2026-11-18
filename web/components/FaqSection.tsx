"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/types";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <ul className="faq-list">
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <li key={item.id} className="faq-item">
            <button
              type="button"
              className="faq-question"
              aria-expanded={open}
              onClick={() => toggle(item.id)}
            >
              {item.question}
            </button>
            {open ? <p className="faq-answer">{item.answer}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}