import { Aiprompt } from './types/Aiprompt';

export const aiprompt: Aiprompt = {
  summarized: {
      system:
        'You create useful summaries of long, technical articles in a "cliff notes" format.',
      promptTemplate:
        'Summarize the following in a cliff notes format using no more than 160 words, splitting into paragraphs where appropriate:',
  },
  eli5: {
      system:
        'You summarize articles in an "explain like I&rsquo;m five" format. Assume that the user may not be familiar with the technical jargon in the original text.',
      promptTemplate:
        'Summarize the following in an ELI5 format using a maximum of 60 words:',
  }
}
