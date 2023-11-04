import { useState,useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'



function Register() {
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    const [inputs,setInputs] = useState({});
    const [csrfToken, setCsrfToken] = useState('');



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        
        try {
            const updated_inputs = {...inputs,csrfToken};
            const response = await axios.post('http://localhost:3000/api/register',updated_inputs,{
                withCredentials:true,
                headers:{'X-CSRF-Token':csrfToken}
            });
            if(response.status === 200){
                console.log("SUCCESS");
                setErrors(response.data.errors);
                // navigate('/login')
                if(!response.data.errors){
                    console.log("NO ERROR");
                    navigate('/login')
                }
                console.log(response.data.errors);
                
            }
        } catch (error) {
            console.log(error);
        }
        
    }


    useEffect(() => {
        if (!csrfToken) {
            console.log("HEY FRONTEND");
            axios.get('http://localhost:3000/api/csrfToken',{withCredentials:true})
            .then((response) => {
                console.log(response.data.csrfToken);
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
            console.log(error);
            })
        }
    },[csrfToken]);

    



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
                    <form onSubmit={handleSubmit} action="" className="flex flex-col">
                        <input type="hidden" name="csrfToken" />
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="fname" className="text-xs font-semibold text-left">First Name</label>
                            <input type="text" name="fname" id="fname" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.fname || ""} />
                            <span className="text-xs font-thin text-red-800">{errors.fname}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="lname" className="text-xs font-semibold text-left">Last Name</label>
                            <input type="text" name="lname" id="lname" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.lname || ""} />
                            <span className="text-xs font-thin text-red-800">{errors.lname}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="email" className="text-xs font-semibold text-left">Email</label>
                            <input type="email" name="email" id="email" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.email || ""} />
                            <span className="text-xs font-thin text-red-800">{errors.email}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="password" className="text-xs font-semibold text-left">Password</label>
                            <input type="password" name="password" id="password" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.password || ""} />
                            <span className="text-xs font-thin text-red-800">{errors.password}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="confirm_password" className="text-xs font-semibold text-left">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.confirm_password || ""} />
                            <span className="text-xs font-thin text-red-800">{errors.confirm_password}</span>
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