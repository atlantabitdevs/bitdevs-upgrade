import { link, readFileSync } from 'fs';

import { isValidURL } from './utils';

type Args = {
  path: string;
};
const getLinks = async ({ path }: Args) => {
  const linksRegex = /\[([^\[]+)\](\(.*\))/gm;
  const singleMatchRegex = /\[([^\[]+)\]\((.*)\)/;
  const file = readFileSync(path, 'utf-8');
  const startIndex = file.indexOf('### Mailing Lists');

  if (startIndex === -1) {
    throw new Error('Header not found');
  }

  const restOfFile = file.slice(startIndex);

  const matches = restOfFile.match(linksRegex) ?? [];
  const links = [];

  for (let i = 0; i < matches.length; i++) {
    const match = singleMatchRegex.exec(matches[i]);
    if (!match) continue;

    if (!isValidURL({ url: match[2] })) {
      continue;
    }

    links.push({
      full: match[0],
      title: match[1],
      link: match[2],
    });
  }

  return links;
};

export default getLinks;
