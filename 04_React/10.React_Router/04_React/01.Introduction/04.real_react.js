// ========================================
// REAL REACT IN ACTION
// ========================================

// Now using the ACTUAL React library (loaded via CDN in index.html)
// Same concept as our custom React but:
// → Much more optimized
// → Handles nested elements, lists, events etc.
// → Uses efficient diffing algorithm


// Creating a single element
// React.createElement(type, props, children)
const element1 = React.createElement(
    "h1",
    { className: "element", id: "first", style: { fontSize: "30px", backgroundColor: "orange", color: "white" } },
    "Hello Coder Army"
);

const element2 = React.createElement(
    'h2',
    { className: "element", id: "second", style: { fontSize: "20px", backgroundColor: "pink", color: "green" } },
    "Strike is launched"
);

// Nesting elements inside a parent div
// → React.createElement can take multiple children after props
// → This creates a Virtual DOM TREE
const div = React.createElement(
    'div',  // parent container
    null,   // no props on the div itself

    // child 1
    React.createElement(
        "h1",
        { className: "element", id: "first", style: { fontSize: "30px", backgroundColor: "orange", color: "white" } },
        "Hello Coder Army"
    ),

    // child 2
    React.createElement(
        'h2',
        { className: "element", id: "second", style: { fontSize: "20px", backgroundColor: "pink", color: "green" } },
        "Strike is launched"
    )
);

console.log(div); // inspect Virtual DOM tree in console


// Rendering to browser
// ReactDOM.createRoot → targets <div id="root"> in index.html
// .render() → converts Virtual DOM into real DOM and displays it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(div);


// ----------------------------------------
// OLDER WAY (React 17 and below) - for reference only
// ReactDOM.render was replaced by ReactDOM.createRoot in React 18
// ----------------------------------------
// ReactDOM.render(element1, document.getElementById('root'));
// ReactDOM.render(element2, document.getElementById('root')); // REPLACES element1!