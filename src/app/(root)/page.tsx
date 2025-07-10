import HomeBanner from "@/components/HomeBanner";
import MentorShipCard from "@/components/MentorShipCard";
import PopularCourses from "@/components/popularCourses";
import TopMentors from "@/components/TopMentors";
import { apiService } from "@/lib/actions/api";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";





export default async function Home() {


  const data = await apiService.get<any>('/client/home/',{
    next: { revalidate: 60*30 } // revalidate every 30 minutes. Change only the 30 to change the interval. This is called   incremental static regeneration(ISR).
  })
  .catch((error) => {
    console.error({"ERROR":error.message});
  })


  // console.log(data?.consultancies);


  return (
    <main>
      
      <HomeBanner/>

      <PopularCourses data={data?.courses}/>

      {/* <div className="bg-slate-50 rounded-lg py-9 my-10">
        <TopMentors/>
      </div> */}

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Book Mentors</h2>
        <p className="text-gray-500 text-sm mb-5">Schedule one-on-one sessions with our expert mentors</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data?.consultancies.map((mentor:any) => (
            <MentorShipCard key={mentor.id} mentor={mentor}/>
          ))}
        </div>

        <div className="flex items-center justify-center mt-10 text-sm">
          <Link href={"/mentors"} className="border border-blue-600 text-blue-600 p-2 px-5 rounded-full text-center shadow-sm">View All Mentors</Link>
        </div>

      </div>
     
     </main>
  ); 
}
