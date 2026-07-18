// Default :  get method
const response2 = await fetch('http://fkjbnsdfk.com/data')

const response = await fetch('https://api.example.com/data',{
  method: 'POST',
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name : 'John', age : 30})
});