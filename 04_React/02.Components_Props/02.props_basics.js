// ========================================
// PROPS BASICS
// ========================================

// What are Props?
// → Props = Properties
// → Way to pass data from Parent → Child component
// → Props are READ ONLY (child cannot change them)
// → Passed like HTML attributes

// ----------------------------------------
// FLOW:
// Parent passes props → Child receives as object → Child uses them
// ----------------------------------------


// Child Component
// → props is an OBJECT containing all passed attributes
// → Access using props.name, props.age etc.
function Greeting(props){
    console.log(props); // { name: "Rohit", age: 20 }
    return (
        <h1>Hello {props.name}, you are {props.age} years old!</h1>
    )
}

// Parent Component
// → Passing string prop  → name="Rohit"       (no curly braces)
// → Passing number prop  → age={20}            (curly braces for JS values)
// → Passing boolean prop → isLoggedIn={true}   (curly braces)
function App(){
    return (
        <>
            {/* Passing props like HTML attributes */}
            <Greeting name="Rohit" age={20} />
            <Greeting name="Amit" age={25} />
            <Greeting name="Priya" age={22} />
            {/* Same component, different data → Reusability! */}
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);