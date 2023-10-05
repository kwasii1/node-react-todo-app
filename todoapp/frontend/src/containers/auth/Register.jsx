import { useState,useEffect } from "react"
import axios from "axios"



function Register() {
    console.log("TOP");
    const [inputs,setInputs] = useState({});
    const [csrfToken, setCsrfToken] = useState('');



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const handleSubmit = async (event) => {
        axios.get('http://localhost:3001/api/csrfToken')
        .then((response) => {
            console.log(response.data.csrfToken);
            setCsrfToken(response.data.csrfToken);
        })
        .catch((error) => {
            console.log(error);
        })
        
        
        try {
            const updated_inputs = {...inputs,csrfToken};
            console.log(updated_inputs);
            const response = await axios.post('http://localhost:3001/api/register',updated_inputs);
            if(response.status === 200){
                console.log("SUCCESS");
            }
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
    }


    useEffect(() => {
        
    },[]);

    



    return(
        <>
            <div className="flex justify-center items-center flex-col h-full p-5">
                <div className="flex w-full mb-32">
                    <p className="font-bold text-sm">.todo</p>
                </div>
                <div className="w-full flex flex-col shadow-lg shadow-gray-500 p-5 rounded lg:w-1/3 md:w-1/2">
                    <div className="flex flex-col w-full mb-5 justify-center">
                        <h1 className="text-2xl text-center">Simple Todo App</h1>
                        <p className="text-center">Register</p>
                    </div>
                    <form onSubmit={handleSubmit} action="" method="post" className="flex flex-col">
                        <input type="hidden" name="csrfToken" />
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="fname" className="text-xs font-semibold text-left">First Name</label>
                            <input type="text" name="fname" id="fname" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.fname || ""} />
                            <p>hh {inputs.csrfToken}</p>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="lname" className="text-xs font-semibold text-left">Last Name</label>
                            <input type="text" name="lname" id="lname" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.lname || ""} />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="email" className="text-xs font-semibold text-left">Email</label>
                            <input type="email" name="email" id="email" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.email || ""} />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="password" className="text-xs font-semibold text-left">Password</label>
                            <input type="password" name="password" id="password" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.password || ""} />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="confirm_password" className="text-xs font-semibold text-left">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.confirm_password || ""} />
                        </div>
                        <div className="flex mb-3 flex-col">
                            <button type="submit" className="font-thin p-2 rounded bg-amber-500">Submit</button>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-5">
                            <p className="font-semibold text-xs text-center">Already have an account?Sign In</p>
                            {/* <p className="font-semibold text-xs text-center">Forgot Password</p> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register