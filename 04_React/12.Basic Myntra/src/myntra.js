import React, { useState } from "react";
import ReactDOM from "react-dom/client"
import Header from "./component/Header";
import Card from "./component/Card";
import Footer from "./component/Footer";
import arr from "./utils/dummy";


function App(){

  let[A,setA] = useState(arr);
  function sortArray(){
    A.sort((a,b)=> a.price - b.price);
    setA([...A]); // humne yha pr ek duplicate array bnaya uska refrence change krne k liye.
    // console.log(A);
 }

 function PriceAbove499(){
  arr.filter((value)=>value.Price>499)
 }


  return(<>
     <Header/>
     <button onClick={sortArray}> Sort by Price </button>
     <button onClick={PriceAbove499}>Price Above 499</button>
    <div className ="middle" style={{display:"flex", gap:"10px" , flexWrap:"wrap"}}>
        {
          A.map((value,index)=> <Card key={index} cloth={value.cloth} offer={value.Offer} price={value.price}/>)   
        }      
    </div>
    <Footer/>
 </>
  )
}


const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<App/>);
