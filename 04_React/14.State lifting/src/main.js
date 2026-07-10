import React, { useState , useMemo, useCallback, useEffect} from "react";
import reactDOM from "react-dom/client"


function App(){
    const [count,setCount] = useState(0);

    return (
        <>
      <h1>Counter is :{count}</h1>
      <Increment counts={count}/>
      
        </>
    )
}




reactDOM.createRoot(document.getElementById('root')).render(<App></App>);