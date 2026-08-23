const { GoogleGenAI, ResponseFormat } = require ("@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({apiKey: process.env.GCP_API_KEY});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: "How are you",
  });

  return response.text;
}

main();