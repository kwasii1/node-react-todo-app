import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../customHook/authHook";
import { useCsrfToken } from "../customHook/csrfToken";

function EditTask(){
    const {taskid} = useParams();
    const [tasks,setTask] = useState([]);
    const {isAuth,user} = useAuth();
    const csrfToken = useCsrfToken()
    const navigate = useNavigate();
    const [errors,setErrors] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setTask(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const updated = {...tasks,csrfToken};
        axios.post(`http://localhost:3000/tasks/update/${taskid}`,updated,{withCredentials:true})
        .then((response) => {
            if(response.status === 200){
                console.log("DONE");
                console.log(response.data.message);
                setErrors(response.data.errors);
                if(!response.data.errors){
                    navigate('/viewtask')
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/tasks/view/${taskid}`,{withCredentials:true})
        .then((response) => {
            if(response.status === 200){
                console.log(response.data.task[0]);
                setTask(response.data.task[0])
            }
        })
    },[taskid])
    if(isAuth === undefined){
        return null;
    }

    return isAuth ?  (
        <>
            <Header/>
            <div className="flex justify-center items-center flex-col h-full p-5">
                <div className="flex w-full mb-32">
                    <p className="font-bold text-sm">.todo</p>
                </div>
                <div className="w-full flex flex-col shadow-lg shadow-gray-500 p-5 rounded lg:w-1/3 md:w-1/2">
                    <div className="flex flex-col w-full mb-5 justify-center">
                        <h1 className="text-2xl text-center">Edit Task</h1>
                        <p className="text-center"></p>
                    </div>
                    <form onSubmit={handleSubmit} action="" method="post" className="flex flex-col">
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="name" className="text-xs font-semibold text-left">Task Name</label>
                            <input type="text" name="name" id="name" className="border-gray-400 border rounded p-1" onChange={handleChange} value={tasks.name || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.name}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="description" className="text-xs font-semibold text-left">Description</label>
                            <textarea name="description" id="description" className="border-gray-400 border rounded p-1" onChange={handleChange} value={tasks.description || ""}></textarea>
                            <span className="text-xs font-thin text-red-800">{errors.description}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="category" className="text-xs font-semibold text-left">Category</label>
                            <select name="category" id="category" className="border-gray-400 border rounded p-1" onChange={handleChange} value={tasks.category || ""}>
                                <option value="" defaultValue={""}>Select Category</option>
                                <option value="Home">Home</option>
                                <option value="Important">Important</option>
                                <option value="Event">Event</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                            <span className="text-xs font-thin text-red-800">{errors.category}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="startdate" className="text-xs font-semibold text-left">Start Date</label>
                            <input type="date" name="startdate" id="startdate" className="border-gray-400 border rounded p-1" onChange={handleChange} value={tasks.startdate || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.startdate}</span>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="duration" className="text-xs font-semibold text-left">Duration</label>
                            <input type="number" name="duration" id="duration" className="border-gray-400 border rounded p-1" onChange={handleChange} value={tasks.duration || ""}/>
                            <span className="text-xs font-thin text-red-800">{errors.duration}</span>
                        </div>
                        <div className="flex mb-3 flex-col">
                            <button type="submit" className="font-thin p-2 rounded bg-amber-500">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ):navigate('/login')
}

export default EditTask