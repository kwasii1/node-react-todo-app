import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import { useAuth } from "../customHook/authHook"
import { useNavigate } from "react-router-dom"

function ViewTask () {
    const {isAuth,user} = useAuth();
    const navigate = useNavigate();
    const [tasks,setTask] = useState([]);

    const handleClick = (task) => {
        navigate(`/viewtask/${task}`)
    }

    
    if(isAuth === false){
        navigate('/login');
    }
    useEffect(() => {
        axios.get('http://localhost:3000/tasks',{withCredentials:true})
        .then((response) => {
            console.log("HEY");
            if(response.status === 200){
                setTask(response.data.tasks)
            }
            setTask(response.data.tasks)
        })
    },[])



    return (
        <>
            <Header />
            <section className="flex flex-col p-5">
                <section className="flex flex-col">
                    <h3 className="text-xl font-bold">
                        All Tasks
                    </h3>
                </section>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-4"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4"
                                            >
                                                Category
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task,index) => {
                                            return (
                                                <tr key={task.taskid} className="border-b dark:border-neutral-500 hover:bg-gray-100" onClick={() => handleClick(task.taskid)}>
                                                    <td className="whitespace-nowrap px-6 py-4">{task.name}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{task.category}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewTask