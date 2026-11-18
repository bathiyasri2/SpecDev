import type { AboutContent } from "./types";
import { show } from "./show";

export const about: AboutContent = {
  bodyParagraphs: [
    `Signal & Static explores ${show.subject.toLowerCase()} Each episode is edited for clarity, not clickbait.`,
    `The show is built for ${show.audience.toLowerCase()}`,
    `${show.host} hosts every episode, asking the questions that do not fit in a tweet thread.`,
  ],
};