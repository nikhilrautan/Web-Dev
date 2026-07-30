const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")

app.use(express.json());

// CRUD: Create Read Update Delete


app.get("/info",async (req,res)=>{

    const ans = await User.find({});
    res.send(ans);
})

app.post("/info", async(req,res)=>{
    
    //nyii info insert krne k liye..

    // const ans = new User(req.body);
    // await ans.save();
    

    //JB BHI NETWORK CALL KRE TO (TRY,CATCH ) K ANDR KRE
    try{ // kbhi koi error aaye to usko handle krne k liye
    await User.create(req.body);
    res.send("Succesfully Updated");
    }
    catch(err){
        res.status(500).send(err);
    }
})
 
// DELETE KRNA HAI TO...
app.delete("/info", async (req,res)=>{

    // jiska bhi naam "Vishal" hai usko delete krdo..
    await User.deleteOne({name:"Vishal"});
    res.send("Deleted");
})

app.put("/info", async (req,res)=>{
   
    //UPDATE..
    //1. updateOne
    //2. updateMany
    const result = await User.updateOne({ name: 'Mohan' }, { age: 40, city:"Bangladesh"});
    // isme ye phla wala dhundhega ki 'Mohan' naam wala aadmi kha hai fir jaake uski value change krdo
    res.send("Updated Succesfully");
})


main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));



