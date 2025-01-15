"use server";

import { NextPage } from "next";

import Chat from "./_private/Chat";
import { generateText } from "ai";

import { getOllama } from "@/tools/ai/ollama";

const Page: NextPage = async () => {
  const ollama = await getOllama();

  const result = await generateText({
    model: ollama(process.env.OLLAMA_API_MODEL, {}),
    prompt: "Who are you ?.",
  });

  return (
    <>
      <h1>{result.text}</h1>
      <Chat />
    </>
  );
};

export default Page;
