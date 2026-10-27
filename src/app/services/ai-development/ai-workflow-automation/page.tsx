import AiServicePage, { aiServiceMetadata } from "@/components/ai-services/AiServicePage";

const slug = "ai-workflow-automation";

export const metadata = aiServiceMetadata(slug);

export default function Page() {
  return <AiServicePage slug={slug} />;
}
