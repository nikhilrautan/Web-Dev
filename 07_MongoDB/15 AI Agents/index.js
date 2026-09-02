const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
const readlineSync = require('readline-sync');

const ai = new GoogleGenAI({ apiKey: process.env.GCP_API_KEY });
const conversationHistory = [];

async function askGemini() {
  const result = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: conversationHistory,
  });
  return result.text;
}

async function getWeather(locations) {
  const weatherInfo = [];
  for (const { city, date } of locations) {
    const url = date.toLowerCase() === 'today'
      ? `http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
      : `http://api.weatherapi.com/v1/future.json?key=${process.env.WEATHER_API_KEY}&q=${city}&dt=${date}`;

    const response = await fetch(url);
    const data = await response.json();
    weatherInfo.push(data);
  }
  return weatherInfo;
}

async function chatting() {
  const question = readlineSync.question('How can I help you--> ');

  const prompt = `
You are an AI agent who responds only in JSON format.
Analyse the user query and extract city and date details from it.
Date format should be (year-month-date) if the user asks for future weather.
If the user asks for today's weather, mark date as "today".

If you need weather information, respond in this format:
{
  "weather_details_needed": true,
  "location": [{"city": "mumbai", "date": "today"}, {"city": "delhi", "date": "2025-04-30"}]
}

Once you have the weather report details, respond in this format:
{
  "weather_details_needed": false,
  "weather_report": "Bhai Delhi ka mausam to badiya hai"
}

User asked: ${question}

Strictly respond in JSON format only.
`;

  conversationHistory.push({ role: "user", parts: [{ text: prompt }] });

  let responseText = await askGemini();
  let parsed = JSON.parse(responseText);

  // Agent loop: keep going until the model has enough info to answer
  while (parsed.weather_details_needed) {
    const weatherData = await getWeather(parsed.location);

    conversationHistory.push({ role: "model", parts: [{ text: responseText }] });
    conversationHistory.push({
      role: "user",
      parts: [{ text: `Here is the weather data: ${JSON.stringify(weatherData)}. Respond in the final JSON format now.` }]
    });

    responseText = await askGemini();
    parsed = JSON.parse(responseText);
  }

  console.log(parsed.weather_report);
}


chatting();