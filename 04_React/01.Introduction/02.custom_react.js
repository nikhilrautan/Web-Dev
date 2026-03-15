// ========================================
// CUSTOM REACT - Our own mini React
// ========================================

// Solution to Vanilla JS problem:
// → Wrap element creation inside a function
// → Pass tag, attributes, children as arguments
// → Reusable for any element!


// Our own mini React object
const React = {
    createElement: function(tag, attributes, children) {

        // Step 1: Create the actual DOM element
        const element = document.createElement(tag);

        // Step 2: Set the text inside the element
        element.textContent = children;

        // Step 3: Loop through all attributes and apply them
        for (const key in attributes) {
            if (key === 'style') {
                // style is an object → use Object.assign to apply all styles at once
                Object.assign(element.style, attributes.style);
            } else {
                // For everything else (className, id etc.) assign directly
                element[key] = attributes[key];
            }
        }
        return element; // return the fully built DOM element
    }
}

// Our own mini ReactDOM
const ReactDOM = {
    render: function(child, parent) {
        parent.append(child); // attach element to real DOM
    }
}

// Now creating elements is much cleaner! ✅
const el1 = React.createElement(
    'h1',
    { className: "element", id: "first", style: { fontSize: "30px", backgroundColor: "orange", color: "white" } },
    "Hello Coder Army"
);

const el2 = React.createElement(
    'h2',
    { className: "element", id: "second", style: { fontSize: "20px", backgroundColor: "pink", color: "green" } },
    "Strike is Launched"
);

ReactDOM.render(el1, document.getElementById('root'));
ReactDOM.render(el2, document.getElementById('root'));

// Much better! Same result but:
// → No repetition ✅
// → Reusable function ✅
// → But still directly touches real DOM... React solves this too!