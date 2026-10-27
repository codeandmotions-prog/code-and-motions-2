import { aiAgentDevelopment } from "./aiAgentDevelopment";
import { aiChatbotDevelopment } from "./aiChatbotDevelopment";
import { aiWorkflowAutomation } from "./aiWorkflowAutomation";
import { aiVoiceAgents } from "./aiVoiceAgents";
import { aiSaasDevelopment } from "./aiSaasDevelopment";
import type { AiServiceContent } from "./types";

export type { AiServiceContent, AiServiceKind, AiServiceFaq, AiServiceLink } from "./types";

/** Order here is the order of the cards on the homepage. */
export const aiServices: AiServiceContent[] = [
  aiAgentDevelopment,
  aiChatbotDevelopment,
  aiWorkflowAutomation,
  aiVoiceAgents,
  aiSaasDevelopment,
];

export const AI_SERVICES_BASE_PATH = "/services/ai-development";

export function aiServiceHref(slug: string): string {
  return `${AI_SERVICES_BASE_PATH}/${slug}`;
}

export function getAiService(slug: string): AiServiceContent | undefined {
  return aiServices.find((service) => service.slug === slug);
}
