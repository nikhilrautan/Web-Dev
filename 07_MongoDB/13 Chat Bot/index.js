const express = require('express');
const app = express();
const main = require('./aiChatting')

app.use(express.json());

// abhi humne bs isse history tk provide ki hai ( yha pr hume database bhi connect krna hoga acche se use krne k liye)
  const chattingHistory = {};
  // const chattingHistory = {
//     1: [{role:'user', parts: [{text:"Hi, How are you"}]}, {role:'model', parts:[{text:"I am Good what about you "}]}],
//     2: [],
//     3:[],
//     4:[],
// }
  // We will install our user chat history here 
  // key: value pair
  // key = id
  // value = array 
app.post('/chat',async(req,res)=>{
   
  const {id, msg} = req.body;
  
  if(!chattingHistory[id]){
    chattingHistory[id]= [];
  }

  //extract user history
  const History = chattingHistory[id];

  // history + current, array ki form m bhejna hai 
  const promptmessage = [...History, {
    role: 'user',
    parts: [{text:msg}]
  }]

 const answer = await main(promptmessage);
 //user question ko bhi insert krna hai 
 // model k request ko bhi insert krna hai
 History.push({role:'user',parts:[{text:msg}]}); // user ne jo sawal poocha usko bhi insert kra diya humne history m
 History.push({role:'user',parts:[{text:answer}]}); // aur jo answer aaya tha usko bhi 
  res.send(answer);

})

app.listen(3000,()=>{
  console.log("Listening at Port 3000");
})

module.exports = MaskReferenceImage;