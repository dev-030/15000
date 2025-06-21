import { apiService } from "@/lib/actions/api";
import Image from "next/image";
import Link from "next/link";


// const InstructorCard = dynamic(() => import('@/components/instructorCard'));


export default async function MentorList({params}:any) {
        

    // console.log(category, sortBy, timeFilter, search, '🔴');


    const data = await apiService.get<[]>('/client/gig-list/')
    .catch(error => {
        console.error({"ERROR":error.message});
    });
    

    return (
        <div>
            
            <h1 className="text-xl text-gray-700 font-bold mb-4 mt-10">Book Mentors</h1>

            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
                {data?.map((instructor:any) => (
                   <div key={instructor.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 w-fit transition duration-300">

                        <div>
                            <img src={instructor.thumbnail_url} alt={instructor.name} width={200} height={200} className="w-full h-[150px] object-cover" />
                        </div>

                        <div className="p-3">

                            <h3 className="font-semibold text-lg text-gray-700 mb-1">
                                {instructor.title}
                            </h3>            

                            <p className="text-gray-600 text-sm mb-3">
                                {/* {instructor.description} */}
                                5+ years of experience in React, Node.js, and cloud technologies. Helped 200+ students land their dream jobs.
                            </p>
                           
                           
                            <div className="flex items-center gap-10 justify-between bg-slate-50 border-[0.5px] border-gray-300 rounded-lg py-2 px-3">
                                <div className="flex flex-col items-center gap-0.5">
                                    <p className="text-xs text-gray-500">DURATION</p>
                                    <p className="text-sm text-gray-700">{instructor.duration} min</p>
                                </div>

                                <div className="flex flex-col items-center gap-0.5">
                                    <p className="text-xs text-gray-500">PRICE</p>
                                    <p className="text-sm text-gray-700">{instructor.price}</p>
                                </div>

                                <div className="flex flex-col items-center gap-0.5">
                                    <p className="text-xs text-gray-500">TYPE</p>
                                    <p className="text-sm text-gray-700 text-">1-on-1</p>
                                </div>
                            </div>

                            <Link href={`/mentors/${instructor.id}`}>
                                <button className="bg-blue-500 text-lg w-full text-white py-2.5 rounded-lg mt-2 cursor-pointer">
                                Book Now
                                </button>
                            </Link>

                        </div>
                        
                   </div>
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
