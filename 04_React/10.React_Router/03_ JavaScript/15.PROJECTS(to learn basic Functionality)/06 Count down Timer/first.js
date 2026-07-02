
setInterval(()=>{
  const result = document.getElementById('result');
const currentTime = Date.now();
const NewyearTime = new Date(2027,0,1).getTime();
let timer = NewyearTime-currentTime;

// millsecond
const day = Math.floor((timer)/(1000*60*60*24));
timer%=1000*60*60*24;
const hour = Math.floor((timer)/(1000*60*60));
timer%=1000*60*60;
const minute = Math.floor((timer)/(1000*60));
timer%=1000*60;
const second = Math.floor((timer)/(1000));
timer%=1000;

result.textContent = `${day}:Days ${hour}:Hour  ${minute}:Minute ${second}:Second`;
},1000);