import { useRef, useState } from "react";


function Login(){
    
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");

    const emailRef = useRef(null);
    const passRef = useRef(null);
     
    console.log("render");

    function handleSubmit(e){
      e.preventDefault();

      console.log(emailRef.current.value);
      console.log(passRef.current.value);
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="email" ref={emailRef}></input>
            <input type="password" ref={passRef}></input>
            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default Login;