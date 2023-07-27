import asyncio
import re
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup
from openai import OpenAI, ChatCompletion

# Equivalent to OpenAI in Node.js, note that you'll need to obtain an API key from OpenAI and set it as an environment variable
openai = OpenAI("your_api_key_here")

def load_from_repo():
    # Placeholder for code to load a repo using GitHub's API
    pass

def get_links(markdown_path: str) -> List[Dict[str, str]]:
    regex_md_links = re.compile(r"\[([^\[]+)\]\((.*)\)") 
    with open(markdown_path, "r") as file:
        content = file.read()
    matches = re.findall(regex_md_links, content)
    links = [{'full': f"[{m[0]}]({m[1]})", 'title': m[0], 'link': m[1]} for m in matches]
    return links

async def summarize_links(links: List[Dict[str, str]]) -> List[Dict[str, str]]:
    tasks = [summarize_webpage(link) for link in links]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    summaries = [res for res in results if not isinstance(res, Exception)]
    return summaries

async def summarize_webpage(link: Dict[str, str]) -> Optional[Dict[str, str]]:
    if not link:
        return None
    response = requests.get(link['link'])
    soup = BeautifulSoup(response.text, 'html.parser')
    text = ' '.join(soup.stripped_strings)
    chat_model = 'gpt-4.0-turbo'  # Assuming the usage of gpt-4.0-turbo as the model
    message = [{'role': 'system', 'content': "You are a helpful assistant."}, {'role': 'user', 'content': f"Please summarize the following text: {text}"}]
    response = openai.ChatCompletion.create(model=chat_model, messages=message)
    if response['choices'][0]['finish_reason'] == 'stop':
        return {**link, 'summary': response['choices'][0]['message']['content']}
    return None

def write_summaries_to_file(filename: str, summaries: List[Dict[str, str]]):
    path_prefix = './_summaries/'
    full_path = path_prefix + filename
    title_line = f'# {filename} Link Summaries\n\n'
    with open(full_path, "w") as file:
        file.write(title_line)
        for summary in summaries:
            line_to_write = f"* [{summary['title']}]({summary['link']})\n    * {summary['summary']}\n"
            file.write(line_to_write)

async def run():
    file_name = '2023-06-28-socratic-seminar-125.md'
    path_prefix = './_posts/'
    links = get_links(path_prefix + file_name)
    summaries = await summarize_links(links[:10])
    print(f'# of summaries {len(summaries)}')
    write_summaries_to_file('2023-06-28-socratic-seminar-125.md', summaries)

# This is required to run asyncio code in Python
asyncio.run(run())
