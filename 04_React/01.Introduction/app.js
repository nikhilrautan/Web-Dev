//________________________________________________________________________
// UNDERSTANDING HOW REACT WORKS UNDER THE HOOD
// This file shows the journey from vanilla JS → custom React → real React
// _______________________________________________________________________


// ____________________________________________________________
// SECTION 1: VANILLA JS - Creating DOM elements manually
// The traditional way before React existed
// ____________________________________________________________

// attributes = {
//     className: "element",
//     id: "first",
//     style: {
//         fontSize: "30px",
//         backgroundColor: "orange",
//         color: "white"
//     }
// }

// A plain object representing what we want our element to look like
// element = {
//     tag: "h1",
//     textContent: "Hello Coder Army",
//     className: "element",
//     id: "first",
//     style: {
//         fontSize: "30px",
//         backgroundColor: "orange",
//         color: "white"
//     }
// }

// -- Creating elements one by one manually --
// Problem: too much repetitive code for every element

// const element1 = document.createElement('h1');  // Step 1: create the tag
// element1.textContent = "Hello Coder Army";       // Step 2: add text
// element1.className = 'element';                  // Step 3: add class
// element1.id = 'first';                           // Step 4: add id
// element1.style.fontSize = "30px";               // Step 5: add styles one by one
// element1.style.backgroundColor = "orange";
// element1.style.color = "white";

// const element2 = document.createElement('h2');
// element2.textContent = "Strike is Launched";
// element2.className = 'element';
// element2.id = 'second';
// element2.style.fontSize = "20px";
// element2.style.backgroundColor = "pink";
// element2.style.color = "green";

// console.log(element1); // check the element in console


// __________________________________________________________________
// SECTION 2: CUSTOM REACT - We build our own mini React
// Goal: reduce repetition by wrapping element creation in a function
// __________________________________________________________________

// const React = {
//     createElement: function(tag, attributes, children) {
//         // Create the actual DOM element
//         const element = document.createElement(tag);

//         // Set the text inside the element
//         element.textContent = children;

//         // Loop through all attributes and apply them
//         for (const key in attributes) {
//             if (key === 'style') {
//                 // style is an object so we use Object.assign to apply all styles at once
//                 Object.assign(element.style, attributes.style);
//             } else {
//                 // For everything else (className, id, etc.) assign directly
//                 element[key] = attributes[key];
//             }
//         }
//         return element; // return the fully built DOM element
//     }
// }

// const ReactDOM = {
//     render: function(child, parent) {
//         parent.append(child); // attach the element to the real DOM
//     }
// }


// __________________________________________________________________
// SECTION 3: ORIGINAL REACT - How React actually works
// Key insight: React does NOT touch the DOM immediately.
// It first creates a plain JS object (Virtual DOM), then renders it.
// ___________________________________________________________________

// -- React.createElement returns a Virtual DOM object, NOT a real DOM element --
// const React = {
//     createElement: function(type, props, children) {
//         return {
//             type: type,          // the HTML tag e.g. 'h1', 'div'
//             props: {
//                 ...props,        // spread all props (className, id, style, etc.)
//                 children: children  // text or nested elements go inside props
//             }
//         }
//     }
// }

// -- This is what React.createElement('h1', {...}, 'Hello') returns --
// const reactElement = {
//     type: 'h1',
//     props: {
//         className: "element",
//         id: "first",
//         style: { fontSize: "30px", backgroundColor: "orange", color: "white" },
//         children: "Hello Coder Army"   // the text content lives inside props
//     }
// }

// -- ReactDOM.render converts the Virtual DOM object into a real DOM element --
// const ReactDOM = {
//     render: function(reactElement, root) {
//         root.innerHTML = ''; // clear the container before rendering

//         // Create a real DOM element from the virtual element's type
//         const element = document.createElement(reactElement.type);

//         // Destructure props for easier access
//         const { props } = reactElement;

//         // Loop through all props and apply them to the real element
//         for (const key in props) {
//             if (key === 'style') {
//                 // style is an object — use Object.assign to apply all at once
//                 Object.assign(element.style, props.style);
//             } else if (key === 'children') {
//                 // children is the text content
//                 element.textContent = props[key];
//             } else {
//                 // everything else: className, id, etc.
//                 element[key] = props[key];
//             }
//         }
//         root.append(element); // finally attach to the real DOM
//     }
// }


// ============================================================
// SECTION 4: REAL REACT IN ACTION
// Now using the actual React library (loaded via CDN or npm)
// ============================================================

// -- Creating individual elements --
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

// -- Nesting elements inside a parent div --
// React.createElement can take multiple children after the props argument
// This creates a Virtual DOM tree (not real DOM yet)
const div = React.createElement(
    'div',       // parent container
    null,        // no props/attributes on the div itself

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
    ),
);

// console.log(div); // uncomment to inspect the Virtual DOM object in console


// ____________________________________________________________
// SECTION 5: RENDERING TO THE BROWSER
// ReactDOM.createRoot targets the <div id="root"> in your HTML
// .render() converts the Virtual DOM tree into real DOM and displays it
// ____________________________________________________________

// Select the root container from index.html: <div id="root"></div>
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the div (which contains both h1 and h2) into the root
root.render(div);


// _______________________________________________________________
// OLDER WAY (React 17 and below) - kept for reference
// ReactDOM.render was replaced by ReactDOM.createRoot in React 18
// _______________________________________________________________

// ReactDOM.render(element1, document.getElementById('root'));
// ReactDOM.render(element2, document.getElementById('root'));  // this would REPLACE element1

// const root = document.getElementById('root');
// ReactDOM.render(element1, root);
// ReactDOM.render(element2, root);