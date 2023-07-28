import { ScrapedDataResults } from './types';
import getLinks from './get_links';
import { map } from 'async';
import path from 'path';
import { readdirSync } from 'fs';
import scrape from './scrape';

type Link = {
  full: string;
  title: string;
  link: string;
};

const getScrapedData = async ({}) => {
  const eventsDir = path.join(__dirname, '../', '../', 'posts');

  const files = readdirSync(eventsDir);

  const newEventFiles = files.filter(file => file.startsWith('new-event') && file.endsWith('.md'));

  if (!newEventFiles.length) {
    throw new Error('No event files found');
  }

  // Sort the files based on the date in their filenames
  newEventFiles.sort((a, b) => {
    // Extract the dates from the filenames
    const dateA = a.slice('new-event-'.length);
    const dateB = b.slice('new-event-'.length);

    // Compare the dates lexicographically
    return dateB.localeCompare(dateA);
  });

  const mostRecentEvent = newEventFiles[0];

  const eventPath = path.join(eventsDir, mostRecentEvent);

  const summaryPath = path
    .join(__dirname, '../', '../', 'summaries', mostRecentEvent.replace('new-event', 'summary'))
    .replace('.md', '.json');

  const links = await getLinks({
    path: eventPath,
  });

  const results: ScrapedDataResults[] = (await map(links, scrapeFiles)).filter(n => !!n.text && !!n.title);

  return { results, summaryPath };
};

const scrapeFiles = async (link: Link) => {
  const { text } = await scrape({ url: link.link });

  return { text, title: link.title, link: link.link };
};

export default getScrapedData;
