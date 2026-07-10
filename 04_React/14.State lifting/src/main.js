import React, { useState , useMemo, useCallback, useEffect} from "react";
import reactDOM from "react-dom/client"
import Increment from "./increment"

function App(){
    const [count,setCount] = useState(0);

    return (
        <>
      <h1>Parent Counter is :{count}</h1>
      <Increment counts={count}/>

        </>
    )
}




reactDOM.createRoot(document.getElementById('root')).render(<App></App>);