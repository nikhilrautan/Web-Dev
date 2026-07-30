// Default get method
// fetch by default sends a GET request, no need to specify method
const response2 = await fetch('https://api.example.com/data')

// converting response to JSON
// note: .json() also returns a promise, so it needs await
const data = await response2.json();  // <-- fixed: added missing await



// POST request - used to send new data to server
const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // batana zaroori hai ki hum JSON bhej rahe hain
    },
    body: JSON.stringify({ name: 'John', age: 30 }) // JS object ko JSON string me convert kar rahe hain
});


// PATCH request - used to update only some fields of existing data
const response3 = await fetch('https://api.example.com/data', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({age: 30 }) // sirf age update ho rahi hai, baaki fields wahi rahenge
});