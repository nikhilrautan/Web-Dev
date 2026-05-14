let count = 0;

function render() {
    document.getElementById('root').innerHTML = `
        <p>This is the counter for react App</p>
        <h1>Counter: ${count}</h1>
        <button onclick="increment()">Increment</button>
        <button onclick="decrement()">Decrement</button>
    `;
}

function increment() {
    count=0;
    render();
}

function decrement() {
    count--;
    render();
}

render();