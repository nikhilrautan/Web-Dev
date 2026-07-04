# React - useState Hook

This folder contains my practice projects and examples for learning the **useState Hook** in React.

The goal of this section is to understand how state works in functional components and how React updates the UI whenever the state changes.

## Concepts Practiced

- Creating state with `useState`
- Updating state using setter functions
- Event handling
- Counter application
- Multiple state variables
- Boolean state
- Conditional rendering
- Rendering based on state changes

## Learning Objectives

After completing this topic, I can:

- Understand the difference between normal variables and state variables.
- Use `useState` in functional components.
- Update the UI dynamically.
- Handle button clicks and user interactions.
- Manage multiple pieces of state.

## Technologies Used

- React
- JavaScript (ES6+)
- HTML
- CSS
- Parcel

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx parcel index.html
```

## Sample Code

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

## Folder Purpose

This folder is part of my React learning journey. Each example focuses on understanding one or more use cases of the `useState` Hook before moving on to more advanced React concepts like `useEffect`, routing, context, and state management.