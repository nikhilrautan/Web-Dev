// ZOMATO ORDER SIMULATION
// Using CALLBACKS (Async Flow)



// Order Object (Initial Data)
const orderDetail = {
    orderId: 123123,
    food: ["Pizza", "Biryani", "Coke"],
    cost: 620,
    customer_name: "Rohit",
    customer_location: "Dwarka",
    restaurant_location: "Delhi"
};


// -------------------------------
// STEP 1: PLACE ORDER
// -------------------------------
// • Simulates payment processing
// • Uses setTimeout (async)
// • Calls callback after payment success

function placedOrder(orderDetail, callback) {

    console.log(`${orderDetail.cost} Payment is in progress`);

    setTimeout(() => {
        console.log("Payment received and order placed");

        orderDetail.status = true;   // updating order object

        callback(orderDetail);       // calling next function

    }, 3000);
}


// -------------------------------
// STEP 2: PREPARE ORDER
// -------------------------------
// • Runs only after payment
// • Adds token number
// • Calls next callback

function preparingOrder(orderDetail, callback) {

    console.log(`Food preparation started for: ${orderDetail.food}`);

    setTimeout(() => {
        console.log("Order prepared");

        orderDetail.token = 123;

        callback(orderDetail);

    }, 3000);
}


// -------------------------------
// STEP 3: PICKUP ORDER
// -------------------------------
// • Delivery partner goes to restaurant
// • Marks order as received
// • Calls next callback

function pickupOrder(orderDetail, callback) {

    console.log(`Delivery boy going to ${orderDetail.restaurant_location}`);

    setTimeout(() => {
        console.log("Order picked up");

        orderDetail.received = true;

        callback(orderDetail);

    }, 3000);
}


// ------------------------------
// STEP 4: DELIVER ORDER 
// ------------------------------
// • Final step
// • Marks delivery complete

function deliverOrder(orderDetail) {

    console.log(`On the way to ${orderDetail.customer_location}`);

    setTimeout(() => {
        console.log("Order delivered successfully");

        orderDetail.delivery = true;

        console.log("Final Order Status:", orderDetail);

    }, 3000);
}


// ---------------------------------------------------
// CALLBACK CHAINING (Sequential Execution)
// ---------------------------------------------------

// • Callback = function passed as argument
// • It runs after async task completes
// • Used here to maintain execution order
// • But leads to CALLBACK HELL (nested structure)

placedOrder(orderDetail, (orderDetail) => {
    preparingOrder(orderDetail, (orderDetail) => {
        pickupOrder(orderDetail, (orderDetail) => {
            deliverOrder(orderDetail);
        });
    });
});


/*
-----------------------------------------------------
⚠ CALLBACK HELL (Pyramid of Doom)

• Multiple callbacks nested inside each other
• Code becomes deeply indented
• Hard to read
• Hard to debug
• Difficult error handling
• Not scalable for large applications

Example structure:

function1(() => {
   function2(() => {
      function3(() => {
         function4(() => {
         });
      });
   });
});



Why modern JS avoids this:

• Promises solve nesting problem
• Async/Await makes code cleaner
• Better error handling using try/catch
-----------------------------------------------------
*/
