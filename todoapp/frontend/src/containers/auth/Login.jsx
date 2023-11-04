import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [errors,setErrors] = useState({
        email:"",
        password:""
    });
    const [inputs,setInputs] = useState({});
    const [csrfToken, setCsrfToken] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updated_inputs = {...inputs,csrfToken};
            const response = await axios.post('http://localhost:3000/login',updated_inputs,{
                withCredentials: true,
            })
            if (response.status === 200) {
                setErrors(response.data.errors);
                if(!response.data.errors){
                    navigate('/')
                }
            }
            else if(response.status === 401){
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}));
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
                        <p className="text-center">Login</p>
                    </div>
                    <form onSubmit={handleSubmit} action="" method="post" className="flex flex-col">
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
                        <div className="flex mb-3 flex-col">
                            <button type="submit" className="font-thin p-2 rounded bg-amber-500">Login</button>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-5">
                            <p className="font-semibold text-xs text-center">Dont have an account?Sign Up</p>
                            <p className="font-semibold text-xs text-center">Forgot Password</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login