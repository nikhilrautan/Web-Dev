

function App(){

  let count = 0;
  function increaseNumber(){
    count++;
    //console.log(count);
  const para = document.querySelector('p');
    para.textContent = `Counter:${count}`;
  }
   const button = document.querySelector('button');
    button.textContent = `Increment:${count}`;
  return (
    <>
    <p>Counter: {count}</p>
    <button onClick={increaseNumber}>Increment: {count}</button>
    </>
  )

}

export default App;