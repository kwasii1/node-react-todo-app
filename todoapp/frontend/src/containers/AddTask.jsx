import Header from "../components/Header"

function AddTask(){
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
                    <form action="" method="post" className="flex flex-col">
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="name" className="text-xs font-semibold text-left">Task Name</label>
                            <input type="text" name="name" id="name" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="description" className="text-xs font-semibold text-left">Description</label>
                            <textarea name="description" id="description" className="border-gray-400 border rounded p-1"></textarea>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="category" className="text-xs font-semibold text-left">Category</label>
                            <select name="category" id="category" className="border-gray-400 border rounded p-1">
                                <option defaultValue={""} value="">Select Category</option>
                                <option value="Home">Home</option>
                                <option value="Important">Important</option>
                                <option value="Event">Event</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="startdate" className="text-xs font-semibold text-left">Start Date</label>
                            <input type="date" name="startdate" id="startdate" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="duration" className="text-xs font-semibold text-left">Duration</label>
                            <input type="number" name="duration" id="duration" className="border-gray-400 border rounded p-1" />
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