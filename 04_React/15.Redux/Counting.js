import { useSelector } from "react-redux"

export default function Counting(){

    return(
        <>
        <h1>Counter is {count}</h1>
        <button>Increment</button>
        <button>Decrement</button>
        <button>Reset</button>
        </>
    )
}