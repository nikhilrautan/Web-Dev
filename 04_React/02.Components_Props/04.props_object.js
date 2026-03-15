// ========================================
// PASSING OBJECT AS PROP
// ========================================

// Why pass Object as prop?
// → When you have multiple related values (name, age, city)
// → Instead of passing 10 separate props, pass 1 object
// → Cleaner and more organized


// ----------------------------------------
// Method 1: Pass object directly inline
// → Double curly braces {{ }}
// → Outer { } = JSX expression
// → Inner { } = JavaScript object
// ----------------------------------------
function UserCard({ user }){
    return (
        <>
            <h2>Name: {user.name}</h2>
            <h3>Age: {user.age}</h3>
            <p>City: {user.city}</p>
            {/* Conditional rendering using ternary */}
            <p>{user.age >= 18 ? "✅ Adult" : "❌ Minor"}</p>
        </>
    )
}

// ----------------------------------------
// Method 2: Store object in variable first (cleaner)
// ----------------------------------------
function App(){

    // Object stored in variable
    const user1 = { name: "Rohit", age: 20, city: "Kotdwar" }
    const user2 = { name: "Amit",  age: 16, city: "Delhi"   }

    return (
        <>
            {/* Method 1: Inline object (double curly braces) */}
            <UserCard user={{ name:"Priya", age:22, city:"Mumbai" }} />

            {/* Method 2: Variable (single curly braces) */}
            <UserCard user={user1} />
            <UserCard user={user2} />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);