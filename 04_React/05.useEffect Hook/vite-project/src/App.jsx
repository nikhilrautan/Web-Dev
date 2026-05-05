import { useEffect, useState } from "react";
// [<img>]

function App(){
   
   const [users,setUsers] = useState([]);

    async function GithubProfile() {
       
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setUsers(data);
   }

   GithubProfile();
   
  return (
    <>
    <h1>Github User</h1>
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap" , gap:"10px"}}>
      {
        users.map(user=>(
          <img src={user.avatar_url} height={"100px"} width={"100px"} key={user.login}/>
        ))
      }
    </div>
    </>
  )
}
export default App;