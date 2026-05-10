import { useRef, useState } from 'react'


// stopwatch: start, stop, reset

function App() {
   
  const [time,setTime] = useState(0);
  const intrervalIdRef = useRef(null);

  function handleStart(){
    
    if(intrervalIdRef.current!=null){
      return;
    }

    intrervalIdRef.current = setInterval(()=>{
      setTime(time=>time+1);
    },1000);
  }

  function handleStop(){
    clearInterval(intrervalIdRef.current);
    intrervalIdRef.current = null;
  }

  function handleReset(){
    clearInterval(intrervalIdRef.current);
    intrervalIdRef.current = null;
    setTime(0);
  }
  

  return(
    <>
    <h1>Stopwatch: {time}</h1>
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
    </>
  )

}

export default App