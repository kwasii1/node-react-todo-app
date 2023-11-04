import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header"
import { useAuth } from "../customHook/authHook"
import { useEffect, useState } from "react";
import axios from "axios";

function View(){
    const navigate = useNavigate();
    const {isAuth,user} = useAuth();
    const {taskid} = useParams();
    const [taskdetails,setTaskDetails] = useState([])

    const handleDelete = (taskid) => {
        axios.get(`http://localhost:3000/tasks/delete/${taskid}`,{withCredentials:true})
        .then((response) => {
            if(response.status === 200){
                navigate('/viewtask')
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }


    const handleEdit = () => {
        navigate(`/edittask/${taskid}`)
    }


    useEffect(() => {
        axios.get(`http://localhost:3000/tasks/view/${taskid}`,{withCredentials:true})
        .then((response) => {
            if(response.status === 200){
                console.log(response.data.task);
                setTaskDetails(response.data.task[0])
            }
        })
    },[taskid])

    if(isAuth === undefined){
        return null
    }
    return isAuth ? (
        <>
            <Header />
            <section className="p-5">
                <div>
                    <p>Title: {taskdetails.name}</p>
                    <p>Description: {taskdetails.description}</p>
                    <p>Category: {taskdetails.category}</p>
                    <p>Startdate: {taskdetails.startdate}</p>
                    <p>Duration {taskdetails.duration} days</p>
                </div>
            </section>
            <section className="flex flex-row p-5 gap-x-5">
                <button onClick={() => handleDelete(taskdetails.taskid)} className="px-5 py-2 bg-red-500 rounded-md text-white text-xs font-bold">Delete</button>
                <button onClick={handleEdit} className="px-5 py-2 bg-amber-500 rounded-md text-white text-xs font-bold">Edit</button>
            </section>
        </>
    ):navigate('/login');
}

export default View