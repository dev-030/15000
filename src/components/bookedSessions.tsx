import { apiService } from "@/lib/actions/api";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookedSessionsCard from "./BookedSessionsCard";
import Link from "next/link";
import { ArrowRight, CalendarX } from "lucide-react";




export default async function BookedSessions(){

    const user = await auth();

    if(!user) redirect('/login');

    const data = await apiService.get<{results:[]}>('/client/booked-sessions/',{
        requiresAuth: true,
        cache: 'no-cache'
    })
    .catch(error => {
        console.error({"ERROR":error.message});
    })


    return(
        
        <div>
        
            {data?.results && data.results.length > 0 ? (
                <BookedSessionsCard data={data}/>
            ):(
                <div className="grid place-content-center min-h-screen  mt-[-5.5rem]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-5xl text-blue-500">         
                        <CalendarX className="h-20 w-20 text-blue-500 mb-4" />
                        </div>
                        <p className="text-lg font-semibold mb-2">
                            You currently don't have any booked sessions
                        </p>
                        <p className="text-sm text-gray-600 mb-4 w-2/3 text-center">
                            Schedule one-on-one sessions with instructors to accelerate your learning journey.
                        </p>
                        <Link href={`/mentors`} className="group px-4 py-2 flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-3xl font-medium overflow-hidden relative border border-blue-600">
                        <span className="relative z-10">Book Now</span>
                        <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
};