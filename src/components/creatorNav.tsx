



export default function CreatorNav(){

    return(
        <div className="flex justify-between items-center mx-7">
            <a href="/" className="text-blue-400 text-3xl font-bold">edcluster</a>

            <div className="flex items-center gap-2">
                <button className="bg-black text-white px-2.5 py-1">
                    Login
                </button>
                <button className="bg-black text-white px-2.5 py-1">
                    Register
                </button>
            </div>
        </div>
    )
}