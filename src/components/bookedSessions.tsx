import { apiService } from "@/lib/actions/api";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookedSessionsCard from "./BookedSessionsCard";
import Link from "next/link";




export default async function BookedSessions(){

    const user = await auth();

    if(!user) redirect('/login');

    const data = await apiService.get('/client/booked-sessions/',{
        requiresAuth: true,
        cache: 'no-cache'
    })
    .catch(error => {
        console.log(error, '🔴');
    })

      
  return(
    <div>
      
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Booked Sessions</h2>
          <p className="text-gray-600 text-sm">Access your booked sessions</p>
        </div>

        {data ? (
            <BookedSessionsCard data={data}/>
        ):(
            <div className="grid place-content-center min-h-screen mt-[-5.5rem]">
                <div className="flex flex-col gap-4 place-items-center bg-white p-10 rounded-lg shadow-sm">
                    <h1 className="text-gray-500 text-base mb-2">
                        You haven’t booked any sessions yet
                    </h1>
                    <Link href="/mentors" className="bg-blue-500 text-white font-semibold border border-blue-500  rounded-md text-sm px-2.5 py-2">
                        Book Now
                    </Link>
                </div>
            </div>
        )}

    </div>
  );
};