import { apiService } from "@/lib/actions/api";
import Image from "next/image";
import Link from "next/link";
import MentorShipCard from "./MentorShipCard";



export default async function MentorList({params}:any) {
        

    // console.log(category, sortBy, timeFilter, search, '🔴');


    const data = await apiService.get<[]>('/client/gig-list/')
    .catch(error => {
        console.error({"ERROR":error.message});
    });

    

    return (
        <div>
            
            <h1 className="text-lg text-gray-700 font-semibold mb-4 mt-10">Book Mentors</h1>

            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                {data?.map((instructor:any) => (
                    <MentorShipCard key={instructor.id} mentor={instructor}/>
                ))}
            </div>

        </div>
    )
}










    // Server-side data fetching function
// async function fetchMentors({ category, sortBy, timeFilter, search }) {
//   const params = new URLSearchParams({
//     category: category !== 'All' ? category : '',
//     sort: sortBy,
//     time: timeFilter,
//     search
//   });

//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/gig-list/?${params}`, {
//     next: { revalidate: 60 } // Cache for 60 seconds
//   });
  
//   if (!res.ok) {
//     throw new Error('Failed to fetch mentors');
//   }
  
//   return res.json();
// }








//         <div className="flex flex-wrap gap-4 p-4">

//         <Suspense fallback={<p>Loading activity…</p>}>

//             {instructorData.map((instructor:any) => (
//                 <InstructorCard key={instructor.id} instructor={instructor} />

//               //   <div key={instructor.id} className="border rounded-md shadow-md w-[220px] overflow-hidden hover:shadow-lg transition duration-300">
//               //     <Image 
//               //     // src={instructor.image} 
//               //     // alt={instructor.name} 
//               //     // width={20}
//               //     // height={20}
//               //     // className="w-full h-[150px] object-cover"
//               //     // placeholder="blur"
//               //     // blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIiAvPjwvc3ZnPg=="
//               //     // priority={false}
//               //     src={instructor.image}
//               //     alt={instructor.name}
//               //     width={220}
//               //     height={150}
//               //     className="object-cover"
//               //   />
//               //   <img
//               //     src={instructor.image}
//               //     alt={instructor.name}
//               //     className="w-full h-[150px] object-cover"
//               //   />
//               //   <div className="p-3 space-y-1">
//               //     <div className="flex justify-between items-center">
//               //       <h2 className="font-semibold text-sm">{instructor.name}</h2>
//               //       <span className="text-yellow-500 text-sm">⭐ {instructor.rating}</span>
//               //     </div>
//               //     <p className="text-xs text-gray-500">{instructor.title}</p>
          
//               //     <ul className="text-xs text-gray-600 space-y-0.5 mt-1">
//               //       <li>📆 {instructor.experience}</li>
//               //       <li>🎯 {instructor.sessions}</li>
//               //       <li>💡 {instructor.skills}</li>
//               //       <li>⏰ {instructor.availability}</li>
//               //     </ul>
          
//               //     <div className="flex justify-between items-center mt-2">
//               //       <span className="font-semibold text-sm">{instructor.price}</span>
//               //     </div>
//               //     <Link href={`/mentors/${instructor.id}`}>
//               //       <button className="w-full bg-black text-white rounded py-1 text-sm mt-2 hover:bg-gray-800 cursor-pointer">
//               //           View Profile
//               //       </button>
//               //     </Link>
//               //   </div>
//               // </div>
//             ))}
//         </Suspense>
            
//         </div>
