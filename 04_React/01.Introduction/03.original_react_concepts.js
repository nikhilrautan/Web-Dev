// ========================================
// ORIGINAL REACT CONCEPT - Virtual DOM
// ========================================

// Key Insight of Real React:
// → React does NOT touch the real DOM immediately
// → First creates a plain JS Object called "Virtual DOM"
// → Then compares with previous Virtual DOM (diffing)
// → Only updates what CHANGED in real DOM (efficient!) ✅

// FLOW:
// React.createElement() → Virtual DOM (JS Object) → ReactDOM → Real DOM


// Our React now returns a JS Object (Virtual DOM), NOT a real DOM element
const React = {
    createElement: function(type, props, children) {
        return {
            type: type,       // the HTML tag e.g. 'h1', 'div'
            props: {
                ...props,     // spread all props (className, id, style etc.)
                children: children  // text or nested elements go inside props
            }
        }
    }
}

// This is what React.createElement('h1', {...}, 'Hello') returns:
// {
//     type: 'h1',
//     props: {
//         className: "element",
//         id: "first",
//         style: { fontSize: "30px", backgroundColor: "orange", color: "white" },
//         children: "Hello Coder Army"  ← text lives inside props!
//     }
// }


// ReactDOM converts Virtual DOM → Real DOM
const ReactDOM = {
    render: function(reactElement, root) {
        root.innerHTML = ''; // clear container before rendering

        // Create real DOM element from virtual element's type
        const element = document.createElement(reactElement.type);

        // Destructure props for easier access
        const { props } = reactElement;

        // Loop through all props and apply to real element
        for (const key in props) {
            if (key === 'style') {
                Object.assign(element.style, props.style);
            } else if (key === 'children') {
                element.textContent = props[key]; // text content
            } else {
                element[key] = props[key]; // className, id etc.
            }
        }
        root.append(element); // attach to real DOM
    }
}

// Test it
const element = React.createElement(
    'h1',
    { className: "element", id: "first", style: { fontSize: "30px", backgroundColor: "orange", color: "white" } },
    "Hello Coder Army"
);

console.log(element); // inspect Virtual DOM object in console
ReactDOM.render(element, document.getElementById('root'));