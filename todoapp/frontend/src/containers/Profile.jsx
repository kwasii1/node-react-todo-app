import Header from "../components/Header"

function Profile() {
    return (
        <>
            <Header />
            <section className="flex flex-col p-5">
                <div className="flex w-full flex-col shadow-lg shadow-gray-400 p-5 rounded gap-y-10">
                    <h3 className="font-semibold text-xl">
                        Your Profile
                    </h3>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex flex-row gap-x-5">
                            <p className="text-sm font-bold">First Name:</p>
                            <p className="text-sm font-thin">Kwasi</p>
                        </div>
                        <div className="flex flex-row gap-x-5">
                            <p className="text-sm font-bold">Last Name:</p>
                            <p className="text-sm font-thin">Baidoo</p>
                        </div>
                        <div className="flex flex-row gap-x-5">
                            <p className="text-sm font-bold">Email:</p>
                            <p className="text-sm font-thin">kesbijnr@gmail.com</p>
                        </div>
                        <div className="flex flex-row gap-x-5">
                            <button className="p-1 w-20 bg-amber-400 rounded">Edit</button>
                            <button className="p-1 w-20 bg-red-400 rounded">Delete</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile