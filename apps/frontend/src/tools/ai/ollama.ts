"use server";

import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_API_URL,
});

export const getOllama = async () => {
  return ollama;
};
