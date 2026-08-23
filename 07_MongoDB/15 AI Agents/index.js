const { GoogleGenAI, ResponseFormat } = require ("@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({apiKey: process.env.GCP_API_KEY});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: msg
  });

  return response.text;
}


// Weather leke aaega

async function getWeather(location){

    const weatherInfo= [];
     for(const {city,date} of location){
        if(date.toLowerCase()=='today')
        {
       const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=d6a3bcd7a43c4ed59c2155208252404&q=${city}`)
       const data = await response.json();    
       weatherInfo.push(data);
    }
    else{
        const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=d6a3bcd7a43c4ed59c2155208252404&q=${city}`)
        const data = await response.json();    
        weatherInfo.push(data);
    }
  }
}
main();