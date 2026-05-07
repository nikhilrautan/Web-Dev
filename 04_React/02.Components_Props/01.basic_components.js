// ========================================
// REACT COMPONENTS - BASICS
// ========================================

// What is a Component?
// → A reusable piece of UI (like a function that returns JSX)
// → Component name MUST start with Capital Letter
// → Every component returns JSX

// ----------------------------------------
// Types of Components:
// 1. Functional Component  ✅ (Modern way)
// 2. Class Component       ❌ (Old way, rarely used now)
// ----------------------------------------


// Simple Functional Component
function Header(){
    return (
        <h1>Welcome to My Website</h1>
    )
}

// Another Component
function Main(){
    return (
        <h2>This is the Main Section</h2>
    )
}

// Another Component
function Footer(){
    return (
        <h3>Thanks for visiting!</h3>
    )
}

// ----------------------------------------
// App Component = Root Component
// → All other components are used INSIDE App
// → This is called "Component Composition"
// ----------------------------------------
function App(){
    return (
        <>
            {/* Self closing tag → when no children needed */}
            <Header />

            {/* Opening + closing tag → both are valid */}
            <Main></Main>

            <Footer />
        </>
        // Note: <> </> is Fragment → avoids extra div in DOM
    )
}

// Render App into DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);