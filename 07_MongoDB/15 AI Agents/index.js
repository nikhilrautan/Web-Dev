const { GoogleGenAI, ResponseFormat } = require ("@google/genai");
require('dotenv').config();
readlineSync = require('readline-sync');

//Wait for user's response
const useName = readlineSync.question('How can I help you-->');

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
       const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=d6a3bcd7a43c4ed59c2155208252404&q=${city}`);
       const data = await response.json();    
       weatherInfo.push(data);
    }
    else{
        const response = await fetch(`http://api.weatherapi.com/v1/future.json?key=d6a3bcd7a43c4ed59c2155208252404&q=${city}&dt=${date}`);
        const data = await response.json();    
        weatherInfo.push(data);
    }
  }
}

const question = readlineSync.question('Howe I can Help you-->');
const prompt = `
You are an AI agent , who will respond to me in json format only .
Analyse the user query and try to fetch city and date details from it .
Date format Should be in ( year-month-date) if user ask for future weather .
If user ask for todays weather , mark date as 'today' .
To fetch weather details , I already have some funmction which can fetch the weather fetails for me,


JSON format should look like below :
{
  "weather_details_needed": boolean,
  "location":[{"city": "mumbai}] 
}
`
//  Delhi and Mumbai ka mausam bta 

//  LLM ko bolunga : Delhi and Mumbai ka mausam bata , return m mujhe location wala array de dena 
//  [{city:"delhi",date:'today},{city:"mumbai",date:'today}];

//  Location getweather--> Actual Weather laake de dega

//  Actual weather aaya hai, LLM ko dunga , iska weather report card ready kr de

// User output mein show kra dunga 