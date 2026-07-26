const express = require("express");
const app = express();
const {Auth} = require("./middleware/auth")

// CRUD: Create Read update Delete

// Database: array
app.use(express.json());
const FoodMenu = [
    {id:1, food:"Chowmein", category:"veg", price:500},
    {id:2, food:"Butter Naan", category:"veg", price:100},
    {id:3, food:"Chicken", category:"non-veg", price:1000},
    {id:4, food:"Mutton", category:"non-veg", price:1500},
    {id:5, food:"Momo", category:"veg", price:300},
    {id:6, food:"Chai", category:"veg", price:50},
    {id:7, food:"Rajma", category:"veg", price:300},
    {id:8, food:"Roti", category:"veg", price:20},
    {id:9, food:"Lolipop", category:"non-veg", price:700},
    {id:10, food:"Kebab", category:"non-veg", price:400},
    {id:11, food:"paneer", category:"veg", price:800},
    {id:12, food:"Egg Curry", category:"non-veg", price:300},
    {id:13, food:"salad", category:"veg", price:100},
    {id:14, food:"shourma", category:"veg", price:300},
    {id:15, food:"Butter Chicken", category:"non-veg", price:900},
    {id:16, food:"Mushroom", category:"veg", price:700},
]


const AddToCart = [];
// user ka jo bhi food add hga, wo idhr jaayega


app.get("/food", (req,res)=>{
    res.status(200).send(FoodMenu);
})


// Authenticate admin here
// app.use("/admin",Auth) kai baar isko aisa na likh kr jaise neeche likha hai vaise likhte



app.post("/admin", Auth, (req,res)=>{

    
    FoodMenu.push(req.body);
    res.status(201).send("Item Added Succesfully");
    

})

app.delete("/admin/:id", Auth, (req,res)=>{
    
    const id = parseInt(req.params.id);

    const index = FoodMenu.findIndex(item => item.id ===id);

        if(index===-1){
           res.send("Item Doesn't Exist");
        }
        else{
            FoodMenu.splice(index,1);
            res.send("Succesfully Deleted");
        }
    
    
})

app.patch("/admin", Auth, (req,res)=>{
   
        
    const id = req.body.id;

    const fooddata = FoodMenu.find(item=> item.id===id);

        if(fooddata){
            
            if(req.body.food)
                fooddata.food = req.body.food;
            if(req.body.category)
                fooddata.category = req.body.category;
            if(req.body.price)
                fooddata.price = req.body.price;

            res.send("Successfully Updated");
        }
        else{
            res.send("Item not exist")
        }


})

// localhost:3000/admin

// agr kisi user ko item add krna hai
app.post("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    const foodItem =FoodMenu.find(item=>item.id===id);

    if(foodItem){
       AddToCart.push(foodItem);
       res.status(200).send("Item added successfully");
    }
    else{
        res.send("Item Out of Stock");
    }
})

// item ko cart se htane k liye
app.delete("/user/:id",(req,res)=>{
  // aise hi try , catch block hum hr jgh use kr skte hai..
    try{
    const id =parseInt(req.params.id);

    const index =AddToCart.findIndex(item=>item.id===id);
    if(index!=-1){
        AddToCart.splice(index,1);
        res.send("Item removed succesfully");
    }
    else{
        res.send("Item is not present in Cart");
    }}
    catch(err){
        res.send("Some error:"+ err);
    }
})

// user ko apne cart k elements ko dhundhna hai to
app.get("/user",(req,res)=>{
    if(AddToCart.length==0)
        res.send("Card is empty");
    else
    res.send(AddToCart);
})

// Error Handling krne k liye:

//express.json()-> jyada accha hai "JSON.parse(JSON)" 
// se kyuki frontend se data (0/1) ki form m aat ahai to ye usse jyada acche se handle jrta hai, 
// internally wo JSON.parse(JSON) hi use krta hai
app.get("/dummy",(req,res)=>{
    try{
        JSON.parse("invalid json"); // agr yha valid JSON hai to theekk hai vrna error throw krega
        throw new Error('BROKEN')
        res.send("Hello Coders");
    }
    catch(err){
        res.send("Some error occured");
    }
})

app.listen(3000, ()=>{
    console.log("Listening at port 3000");
})

