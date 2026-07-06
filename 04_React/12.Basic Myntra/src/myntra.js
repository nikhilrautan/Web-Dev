import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./component/Header";
import Card from "./component/Card";
import Footer from "./component/Footer";
import arr from "./utils/dummy";


function App(){

  function sortArray(){
    arr.sort((a,b)=> a.price - b.price);
    console.log
 }
  return(<>
     <Header/>
     <button onClick={sortArray}> Sort by Price </button>
    <div className ="middle" style={{display:"flex", gap:"10px" , flexWrap:"wrap"}}>
        {
          arr.map((value,index)=> <Card key={index} cloth={value.cloth} offer={value.Offer} price={value.price}/>)   
        }      
    </div>
    <Footer/>
 </>
  )
}


const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(<App/>);
