import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain, AnalyzeDocumentChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { readFileSync, writeFile, writeFileSync } from "fs";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

/*
  1. Ingest a markdown file and extract each link.
  2. For each link, read each webpage and summarize it.
  3. Create sumaries at multiple skill levels for each link ("Detailed", "ELI5")
  4. Create a new markdown file with the summaries.
*/
const NYC_BITDEVS = 'https://github.com/BitDevsNYC/BitDevsNYC.github.io';

const loadFromRepo = async () => {
  const loader = new GithubRepoLoader(
    NYC_BITDEVS,
    { branch: "main", recursive: false, unknown: "warn", ignorePaths: ["*.md"] }
  );
  const docs = await loader.load();
};

type Link = {
  full: string;
  title: string;
  link: string;
  summary?: string;
}


/**
 * Ingest a markdown file and extract each link.
 */
const getLinks = async (markdownPath: string): Promise<Link[]> => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm // gets all markdown links 
  const singleMatch = /\[([^\[]+)\]\((.*)\)/ // gets the url
  const file = await readFileSync(markdownPath, "utf-8");
  const matches = file.match(regexMdLinks) ?? [];
  const links = []
  for (let i = 0; i < matches.length; i++) {
    const match = singleMatch.exec(matches[i])
    // const match = matches[i];
    if (!match) continue;
    links.push({
      full: match[0],
      title: match[1],
      link: match[2]
    })
  }
  return links;
}
async function summarizeLinks(links: Link[]): Promise<Link[]> {
  const result = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const summary = await summarizeWebpage(link.link).catch(e => console.error(e));
    if (!summary) continue;
    console.log(summary);
    result.push({...link, summary: summary.text});
  }
  return result

}

export async function summarizeWebpage(link: string) { 
  if (!link) return;
  const model = new OpenAI({ temperature: 0, maxTokens: 2000  });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 4000 });

  const loader = new CheerioWebBaseLoader(link);
  
  const docs = await loader.loadAndSplit(textSplitter);
  console.log('docs length', docs.length);
  const combineDocsChain = await loadSummarizationChain(model, { type: "map_reduce" });
  try {
    const summary = await combineDocsChain.call({input_documents: docs}) 
    return summary;
  } catch (e) {
    // @ts-ignore 
    console.error(e?.response?.data);
    return null;
  }
}

const writeSummariesToFile = async (filename: string, summaries: Link[]) => {
  const pathPrefix = './_summaries/';
  const fullPath = pathPrefix + filename;
  const titleLine = '# ' + filename + ' Link Summaries\n\n'
  writeFileSync(fullPath, titleLine);
  const result = []
  for (let i = 0; i < summaries.length; i++) {
    //  * [Title](link)
    //     * Summary
    const lineToWrite = '* [' + summaries[i].title + '](' + summaries[i].link + ')\n    * ' + summaries[i].summary + '\n\n';
    result.push(lineToWrite);
  }
  writeFileSync(fullPath, result.join(''))

};

const run = async () => { 
  const fileName = '2023-06-28-socratic-seminar-125.md';
  const pathPrefix = './_posts/';
  const links = await getLinks(pathPrefix + fileName);
  const summaries = await summarizeLinks(links);
  console.log('# of summaries', summaries);
  const result = await writeSummariesToFile('2023-06-28-socratic-seminar-125.md', summaries);
};
run()
