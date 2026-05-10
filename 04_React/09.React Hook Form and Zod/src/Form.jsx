import { useForm } from "react-hook-form"

function Form(){
  
    const {register, handleSubmit, formState: { errors }} = useForm();
    

    function sumbitForm(data){
       console.log(data);
    }

    console.log("Render");

    return(
        <>
        <form onSubmit={handleSubmit(sumbitForm)}>
         <div>
            <label htmlFor="first">Name: </label>
            <input id="first" {...register('name',
                { required: "Name can't be empty"}
            )} />
            {errors.name && <span>{errors.name.message}</span>}
         </div>
          <div>
            <label htmlFor="second">Age: </label>
            <input id="second" {...register('age',
                {
                    min:{
                        value:10,
                        message:"Minimum Age should be 10"
                    },
                    max:{
                        value:80,
                        message:"Maximum Age should be 80"
                    }
                }
            )} />
            {errors.age && <span>{errors.age.message}</span>}
         </div>
         <div>
            <label htmlFor="third">Password: </label>
            <input type="password" id="third" {...register('password',
                {
                    minLength:{
                        value:5,
                        message:"Minimum Length of password should be 5"
                    },
                    maxLength:{
                        value:20,
                        message:"Maximum length of password should be 20"
                    }
                }
            )} />
            {errors.password && <span>{errors.password.message}</span>}
         </div>
         <button>Submit</button>
         </form>

        </>
    )

}

export default Form;