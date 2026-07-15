import { useSelector } from "react-redux"

export default function Counting(){


    const count = useSelector((state)=>state.slice.slice1.count)
    return(
        <>
        <h1>Counter is {count}</h1>
        <button>Increment</button>
        <button>Decrement</button>
        <button>Reset</button>
        </>
    )
}