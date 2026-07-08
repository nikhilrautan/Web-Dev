import React , { useState,useEffect } from "react";

function Colorful({name}){
   
     const [color,setColor] = useState("black");
        
        console.log('first');
        // console.log(name);
        // useEffect(Callback Function, dependency)
        useEffect(()=>{
            console.log("UseEffect Executed");
            document.body.style.backgroundColor = color;
        },[color]);
    
        // console.log("second")
      
        return (
            <>
              <h2>{name}</h2>
              <h1>Background Color Changer</h1>
              <div className="but">
                <button style={{backgroundColor:"red"}} onClick={()=>setColor("red")}>Red</button>
                <button style={{backgroundColor:"blue"}} onClick={()=>setColor("blue")}>Blue</button>
                <button style={{backgroundColor:"orange"}} onClick={()=>setColor("orange")}>Orange</button>
                <button style={{backgroundColor:"green"}} onClick={()=>setColor("green")}>Green</button>
                <button style={{backgroundColor:"pink"}} onClick={()=>setColor("pink")}>Pink</button>
              </div>
            </>
        )

}


export default React.memo(Colorful);// export krne k time use krte hai isko (memorize krlo ki colorful wale ko koi effect nhi pdega )
// yha pr humne react memo Hook use kiya hai jo bolta hai ki ek k changes dusre ko affect nhi krne chaiye (kyuki hume us change ki need hi nhi hai)
// is case m jb hum counter wale ko change kr rhe hai to wo coulorful wale ko affect nhi krega ab

// haan agr props change ho rhe hai to memo allow krega re-render krne ko 