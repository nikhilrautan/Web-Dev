// ========================================
// PROPS DESTRUCTURING
// ========================================

// Why Destructuring?
// → Instead of writing props.name, props.age every time
// → We destructure directly in the parameter
// → Cleaner and shorter code

// ----------------------------------------
// Without Destructuring (Old way)
// ----------------------------------------
// function Greeting(props){
//     return <h1>Hello {props.name}, Age: {props.age}</h1>
// }

// ----------------------------------------
// With Destructuring (Modern way) ✅
// ----------------------------------------
// const props = { name:"Rohit", age:20 }
// const {name, age} = props  ← this is what happens internally
// ----------------------------------------


// Destructuring directly in parameter
function Greeting({ name, age }){
    return (
        <h1>Hello {name}, Age: {age}</h1>
    )
}

// Destructuring with default values
// → If prop is not passed, default value is used
function Welcome({ name = "Guest", role = "User" }){
    return (
        <h2>{name} is logged in as {role}</h2>
    )
}

function App(){
    return (
        <>
            <Greeting name="Rohit" age={20} />
            <Greeting name="Amit" age={25} />

            {/* role not passed → will use default "User" */}
            <Welcome name="Rohit" role="Admin" />
            <Welcome name="Priya" />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);