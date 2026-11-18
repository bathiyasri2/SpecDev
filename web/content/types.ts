export type Show = {
  name: string;
  tagline: string;
  subject: string;
  audience: string;
  host: string;
};

export type Episode = {
  id: string;
  title: string;
  publishedAt: string;
  durationMinutes: number;
  summary: string;
};

export type AboutContent = {
  bodyParagraphs: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};