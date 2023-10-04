function EditProfile() {
    return (
        <>
            <div className="flex justify-center items-center flex-col h-full p-5">
                <div className="flex w-full mb-32">
                    <p className="font-bold text-sm">.todo</p>
                </div>
                <div className="w-full flex flex-col shadow-lg shadow-gray-500 p-5 rounded lg:w-1/3 md:w-1/2">
                    <div className="flex flex-col w-full mb-5 justify-center">
                        <h1 className="text-2xl text-center">Simple Todo App</h1>
                        <p className="text-center">Edit Profile</p>
                    </div>
                    <form action="" method="post" className="flex flex-col">
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="fname" className="text-xs font-semibold text-left">First Name</label>
                            <input type="text" name="fname" id="" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="lname" className="text-xs font-semibold text-left">Last Name</label>
                            <input type="text" name="lname" id="" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="email" className="text-xs font-semibold text-left">Email</label>
                            <input type="email" name="email" id="" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="password" className="text-xs font-semibold text-left">Password</label>
                            <input type="password" name="password" id="" className="border-gray-400 border rounded p-1" />
                        </div>
                        <div className="flex mb-3 flex-col gap-y-2">
                            <label htmlFor="password_confirmation" className="text-xs font-semibold text-left">Confirm Password</label>
                            <input type="password" name="password_confirmation" id="" className="border-gray-400 border rounded p-1" />
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

export default EditProfile