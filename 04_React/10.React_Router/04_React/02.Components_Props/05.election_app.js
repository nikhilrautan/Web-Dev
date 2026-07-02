// ========================================
// ELECTION APP - FINAL PROJECT
// ========================================

// Concepts used in this project:
// ✅ Multiple Components
// ✅ Props (string, object)
// ✅ Props Destructuring
// ✅ Conditional Rendering (ternary)
// ✅ Fragment <> </>
// ✅ Component Composition (combining components in App)
// ========================================


// ----------------------------------------
// Header Component
// → Receives: name (string)
// → Shows welcome message with name
// ----------------------------------------
function Header({ name }){
    return (
        <h1>{name} - Welcome to Indian Election Commission Website</h1>
    )
}

// ----------------------------------------
// VoterCard Component
// → Receives: user (object) → { name, age, city }
// → Shows voter details
// → Conditionally shows eligibility based on age
// ----------------------------------------
function VoterCard({ user }){
    return (
        <>
            <h2>Voter Name: {user.name}</h2>

            {/* Ternary Operator for conditional rendering */}
            {/* condition ? show if true : show if false  */}
            <h3>
                {user.age >= 18
                    ? "✅ You are eligible to vote"
                    : "❌ You are not eligible to vote"}
            </h3>

            <p>City: {user.city}</p>
            <p>Age: {user.age}</p>
            <hr />
        </>
    )
}

// ----------------------------------------
// Footer Component
// → No props needed
// → Static content
// ----------------------------------------
function Footer(){
    return (
        <h3>Thanks for visiting the Election Commission Website</h3>
    )
}

// ----------------------------------------
// App Component (Root)
// → Combines all components together
// → Passes data down via props
// ----------------------------------------
function App(){

    // Voter data stored as objects
    const voter1 = { name: "Nikhil", age: 30, city: "Chaukhutia" }
    const voter2 = { name: "Priya", age: 16, city: "Delhi"   }
    const voter3 = { name: "Amit",  age: 22, city: "Mumbai"  }

    return (
        <>
            {/* String prop */}
            <Header name="Rohit" />

            {/* Object prop using variable */}
            <VoterCard user={voter1} />
            <VoterCard user={voter2} />
            <VoterCard user={voter3} />

            {/* No props needed */}
            <Footer />
        </>
    )
}

// ----------------------------------------
// Render to DOM
// → createRoot selects #root div from index.html
// → render() mounts the App component
// ----------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);