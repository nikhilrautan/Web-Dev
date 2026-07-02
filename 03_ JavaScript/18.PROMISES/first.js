console.log("Hello World");


const p1 = fetch("https://api.github.com/users");
console.log(p1);/*
=====================================
ZOMATO ORDER SIMULATION
PROMISE VERSION
=====================================

Advantages:

✔ Clean Code
✔ Easy Error Handling
✔ No Nesting
✔ Professional Code

Flow:

1. Payment
2. Preparation
3. Pickup
4. Delivery

=====================================
*/


const orderDetail = {
    orderId: 123123,
    food:["Pizza","Biryani","Coke"],
    cost: 620,
    customer_name: "Rohit",
    customer_location: "Dwarka",
    restaurant_location: "Delhi"
};



// STEP 1

function placedOrder(orderDetail){

    console.log(`${orderDetail.cost} Payment in progress`);

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            console.log("Payment Done");

            orderDetail.status = true;

            resolve(orderDetail);

        },2000);

    });

}



// STEP 2

function preparingOrder(orderDetail){

    console.log("Preparing Food");

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            console.log("Food Prepared");

            orderDetail.token = 123;

            resolve(orderDetail);

        },2000);

    });

}



// STEP 3

function pickupOrder(orderDetail){

    console.log("Pickup Started");

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            console.log("Order Picked");

            orderDetail.received = true;

            resolve(orderDetail);

        },2000);

    });

}



// STEP 4

function deliverOrder(orderDetail){

    console.log("Delivering Order");

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            console.log("Order Delivered");

            orderDetail.delivery = true;

            resolve(orderDetail);

        },2000);

    });

}



// PROMISE CHAIN

placedOrder(orderDetail)

.then((data)=>preparingOrder(data))

.then((data)=>pickupOrder(data))

.then((data)=>deliverOrder(data))

.then((data)=>{

    console.log("\nFinal Order Details:");

    console.log(data);

})

.catch((error)=>{

    console.log("Error:",error);

})

.finally(()=>{

    console.log("\nCleanup Done");

});