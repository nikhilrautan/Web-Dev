// ========================================
// VANILLA JS - Creating DOM elements manually
// ========================================

// Problem with Vanilla JS:
// → Have to write same code again and again for every element
// → No reusability
// → Too much repetition


// Creating element 1 manually - step by step
const element1 = document.createElement('h1');  // Step 1: create tag
element1.textContent = "Hello Coder Army";       // Step 2: add text
element1.className = 'element';                  // Step 3: add class
element1.id = 'first';                           // Step 4: add id
element1.style.fontSize = "30px";               // Step 5: add styles one by one
element1.style.backgroundColor = "orange";
element1.style.color = "white";

// Creating element 2 manually - same steps repeated ❌
const element2 = document.createElement('h2');
element2.textContent = "Strike is Launched";
element2.className = 'element';
element2.id = 'second';
element2.style.fontSize = "20px";
element2.style.backgroundColor = "pink";
element2.style.color = "green";

// Attach to DOM manually
document.getElementById('root').append(element1);
document.getElementById('root').append(element2);

// Problem: 
// → 8 lines just for ONE element
// → Imagine doing this for 100 elements 😩
// → This is exactly why React was created!