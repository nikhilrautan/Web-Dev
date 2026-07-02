//Here we will do out food ordering one which we where doing previously usign callback and promises
const orderDetail = {
    orderId: 123123,
    food:["Pizza","biryani","coke"],
    cost: 620,
    customer_name: "Rohit",
    customer_location: "Dwarka",
    restaurant_location: "Delhi"
}

function placedOrder(orderDetail){
    console.log(`${orderDetail.cost} Payment is in progress`);
    
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
     
      if(Math.random()>0.1){
      console.log("Payment is received and order get placed");
      orderDetail.status = true;
       resolve(orderDetail);
      }
      else{
        reject("Payment is failed");
      }

    },3000)
    })
   
}



function preparingOrder(orderDetail){
    console.log(`Your food preparation started of ${orderDetail.food}`);
    
    return new Promise((resolve,reject)=>{
  
     setTimeout(()=>{

        if(Math.random()>0.05){ 
        console.log("Your order is now prepared");
        orderDetail.token = 123;
        resolve(orderDetail);
        }
        else{
            reject("Food item is not persent at restaurant");
        }
        
    },3000);
    })
    
}


function pickupOrder(orderDetail){
    console.log(`Delivery boy is on way to pickup order from ${orderDetail.restaurant_location} `);
    
    return new Promise((resolve,reject)=>{


        setTimeout(()=>{
         if(Math.random()>0.05){   
        console.log("I have picked up the order");
        orderDetail.received = true;
        resolve(orderDetail);
        }
        else{
           reject("Delivery boy Unable to reach restaurant")
        }
    },3000);
    })
    
}


function deliverOrder(orderDetail){
    console.log(`I am on my way to deliver order ${orderDetail.customer_location}`);
    
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
        console.log("Order delivered succesfully");
        orderDetail.delivery = true;
        resolve(orderDetail);
    },3000)
    })
    
}

//now using async and await we can easily solve our probolem withut any complex syntax like(callback and promises)
async function ordering() {
    try{
    const response1 = await placedOrder(orderDetail);
    const response2 = await preparingOrder(response1);
    const response3 = await pickupOrder(response2);
    const response4 = await deliverOrder(response3);

    console.log(response4);
    }
    catch(error){
        console.log("Error: ",error);
    }
}
ordering();
