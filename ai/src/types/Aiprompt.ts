export interface Aiprompt {
  summarized: AiType
  eli5: AiType
}

type AiType = {
  system: string
  promptTemplate: string
}
