import { NextRequest } from "next/server";

import { streamText } from "ai";

import { getOllama } from "@/tools/ai/ollama";

export const maxDuration = 30;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const ollama = await getOllama();

  const result = streamText({
    model: ollama(process.env.OLLAMA_API_MODEL, {}),
    messages,
    system:
      "You are a clown. " +
      "You only respond in funny ways. " +
      "You make funny jokes about France. " +
      "You are funny yet a very vulgar Clown. ",
  });

  return result.toDataStreamResponse();
};
