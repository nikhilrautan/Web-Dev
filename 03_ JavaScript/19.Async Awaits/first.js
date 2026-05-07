// async await
// aysnc function always return a promise
// async function greet(){
//     return "Rohit";

//     // return new Promise((resolve,reject)=>{
//     //     reject("Rohit");
//     // })
// }

// const response = greet();
// // console.log(response);
// response.then((data)=>console.log(data))
// .catch((error)=>{
//     console.log("Error:", error);
// // })


//whenever we will use response it will give output in promises format
// fetch("https://api.github.com/users")
// .then((response)=>response.json())
// .then((data)=>console.log(data));


//By using async and await we made a project in which we added 30 profiles and their view profile link
//we also added try and catch to handle the situation in which any server error or server is not respnding etc... 
async function github() {

//try block
 try {
    const response = await fetch("https://api.github.com/users");
    if(!response.ok)//which means that is the output the same as we expected or not 
        {
        throw new Error("Data is not persent");
    }

    const data = await response.json();
    // console.log(data);
     
    const parent = document.getElementById("first");

    for(let user of data){
        
        const element = document.createElement("div");
        element.classList.add("user");

        const image = document.createElement('img');
        image.src = user.avatar_url;

        const userName = document.createElement('h2');
        userName.textContent = user.login;

        const anchor = document.createElement('a');
        anchor.href = user.html_url;
        anchor.textContent = "Visit Profile";

        element.append(image,userName,anchor);
        parent.append(element);
    }
    }
    //catch block(if any error occurs then we can handle it)
    catch(error){
        console.log("error");
    }
}
github();//calling out funtion




// Different Condition(hum kisi user ke 'Comments','Photos','chat',fetch kr k leke aare hai tb )
async function userDetail(params) {
    
    //pr yha pr hum dekh skte hai ki sbhi ek dusre pr dependent nhi hai (pr fir bhi unko ek dusre k liye rukna pdh rha hai)
    // const comment = await fetch("userComment");
    // const photos = await fetch("userPhoto");
    // const chat = await fetch("chat");
 
    //issi problem ko hum aise solve kr skte hai(saari calls hum ek sath parallel m chla denge)
    const [comment,photos,chat]= await Promise.all([fetch("userComment"),fetch("photo"),fetch("chat")]);
}
//Real world example jb hume ek sath different databases se data fetch krna hota hai tb isse use krte hai(sbhi ko ek sath connect krwa denge)