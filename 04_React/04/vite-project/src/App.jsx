

function App(){

  let count = 0;
  function increaseNumber(){
    count++;
    //console.log(count);
    const para = document.querySelector('p');
    para.textContent = `Counter:${count}`;
  }
  return (
    <>
    <p>Counter: {count}</p>
    <button onClick={increaseNumber}>Increment</button>
    </>
  )

}
export default App;