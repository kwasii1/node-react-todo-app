import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import { useAuth } from "../customHook/authHook"
import { useState } from "react";
import { useCsrfToken } from "../customHook/csrfToken";
import axios from "axios";

function AddTask(){
    const [inputs,setInputs] = useState({})
    const navigate = useNavigate()
    const {isAuth,user} = useAuth();
    const [errors,setErrors] = useState({})
    const csrfToken = useCsrfToken()

    if(isAuth === false){
        navigate('/login')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const updated_inputs = {...inputs,csrfToken}
        axios.post('http://localhost:3000/tasks/add',updated_inputs,{
            withCredentials:true,
        }).then((response) => {
            if(response.status === 200){
                setErrors(response.data.errors);
                if(!response.data.errors){
                    navigate('/viewtask')
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}));
    }
    if(isAuth === false){
        navigate('/login')
    }

    
    return (
        <>
            <Header/>
            <div className="flex justify-center items-center flex-col h-full p-5">
                <div className="flex w-full mb-32">
                    <p className="font-bold text-sm">.todo</p>
                </div>
                <div className="w-full flex flex-col shadow-lg shadow-gray-500 p-5 rounded lg:w-1/3 md:w-1/2">
                    <div className="flex flex-col w-full mb-5 justify-center">
                        <h1 className="text-2xl text-center">Add Task</h1>
                        <p className="text-center"></p>
                    </div>
                    <form action="" method="post" className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="name" className="text-xs font-semibold text-left">Task Name</label>
                            <input type="text" name="name" id="name" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.name || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.name}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="description" className="text-xs font-semibold text-left">Description</label>
                            <textarea name="description" id="description" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.description || ""}></textarea>
                            <span className="text-xs font-thin text-red-800">{errors.description}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="category" className="text-xs font-semibold text-left">Category</label>
                            <select name="category" id="category" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.category || ""}>
                                <option defaultValue={""} value="">Select Category</option>
                                <option value="Home">Home</option>
                                <option value="Important">Important</option>
                                <option value="Event">Event</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            <span className="text-xs font-thin text-red-800">{errors.category}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="startdate" className="text-xs font-semibold text-left">Start Date</label>
                            <input type="date" name="startdate" id="startdate" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.startdate || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.startdate}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="duration" className="text-xs font-semibold text-left">Duration</label>
                            <input type="number" name="duration" id="duration" className="border-gray-400 border rounded p-1" onChange={handleChange} value={inputs.duration || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.duration}</span>
                        </div>
                        <div className="flex mb-3 flex-col">
                            <button type="submit" className="font-thin p-2 rounded bg-amber-500">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTask