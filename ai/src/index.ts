import * as dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';
import { ScrapedDataResults, SummaryResults } from './types';
import { auto, mapLimit } from 'async';

import getScrapedData from './get_scraped_data';
import writeSummary from './write_summary';

dotenv.config();

const model = 'gpt-3.5-turbo-16k';

type Tasks = {
  initAi: {
    openai: OpenAIApi;
  };
  getScrapedData: {
    results: ScrapedDataResults[];
    summaryPath: string;
  };
  summarize: SummaryResults;
};

const main = async () => {
  try {
    return await auto<Tasks>({
      initAi: async () => {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        return { openai };
      },

      getScrapedData: [
        'initAi',
        async ({ initAi }) => {
          const { results, summaryPath } = await getScrapedData({});

          // try {
          //   const aiResults = await Promise.all([
          //     initAi.openai.createChatCompletion({
          //       model: 'gpt-3.5-turbo',
          //       messages: [{ role: 'user', content: `Can you explaint his for me? \n ${results[1].text}` }],
          //     }),
          //     initAi.openai.createChatCompletion({
          //       model: 'gpt-3.5-turbo',
          //       messages: [{ role: 'user', content: `Can you explain this like I am 15? ${results[1].text} ` }],
          //     }),
          //   ]);

          //   const chatCompletion = aiResults[0];
          //   const chatCompletionEli15 = aiResults[1];

          //   console.log(chatCompletion.data.choices);
          //   console.log(chatCompletionEli15.data.choices);

          //   const text = chatCompletion.data.choices[0].message?.content || 'No summary generated';
          //   const text2 = chatCompletion.data.choices[0].message?.content || 'No summary generated';
          //   return { text, title: results[0].title };
          // } catch (err: any) {
          //   console.error(`Summarization failed for ${results[0].title} \n`);
          //   console.log(err.response.data);
          // }

          // const newResults = results.map(n => {
          //   return {
          //     title: n.title,
          //     summary: n.text,
          //     summaryeli15: '',
          //   };
          // });

          // await writeSummary({ path: summaryPath, data: newResults });

          return { results, summaryPath };
        },
      ],

      summarize: [
        'getScrapedData',
        'initAi',
        async ({ getScrapedData, initAi }) => {
          const aiResults = async (summary: ScrapedDataResults) => {
            try {
              const aiCompletion = await Promise.all([
                initAi.openai.createChatCompletion({
                  model,
                  messages: [
                    { role: 'user', content: `Can you explaint this in great detail for me? \n ${summary.text}` },
                  ],
                }),
                initAi.openai.createChatCompletion({
                  model,
                  messages: [
                    { role: 'user', content: `Can you explain this in great detail like I am 15? ${summary.text} ` },
                  ],
                }),
              ]);
              const chatCompletion = aiCompletion[0].data.choices[0].message?.content || 'No summary generated';
              const chatCompletionEli15 = aiCompletion[1].data.choices[0].message?.content || 'No summary generated';
              return {
                summary: chatCompletion,
                summaryeli15: chatCompletionEli15,
                title: summary.title,
                link: summary.link,
              } as SummaryResults;
            } catch (err: any) {
              console.error(`Summarization failed for ${summary.title} \n`);
              console.log(err.response.data);
            }
          };
          const results = (await mapLimit(getScrapedData.results, 3, aiResults)).filter(
            (result): result is SummaryResults => result !== undefined
          );
          await writeSummary({ path: getScrapedData.summaryPath, data: results });
        },
      ],
    });
  } catch (err: any) {
    throw err.message;
  }
};

main();
