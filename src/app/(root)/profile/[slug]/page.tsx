'use client';

import { useClientSession } from '@/context/sessionProvider';
import { Calendar, BookOpen, ArrowLeft, Link, Pencil, Star, Users, Facebook } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';


export default function ProfilePage() {

    const session = useClientSession();
    const router = useRouter();
    const params = useParams();

    const [role, setRole] = useState<"mentor"|"user">("mentor");

    const [activeTab, setActiveTab] = useState('overview');

    const isOwnProfile = session?.user?.username === params.slug;

    const {data} = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/user-profile/${params.slug}/`, (url: string) =>
        fetch(url).then((res) => res.json())
    );
    

    // get the user live data from online api......................................................

    return (
        <div className="p-6  bg-white rounded-xl shadow-sm border border-gray-200">

            <ArrowLeft className='text-gray-500 text-xl bg-slate-100 rounded-md p-1 cursor-pointer mb-6' onClick={()=>router.back()}/>

            { role == "user" ? (
                <div className='space-y-6'>

                    <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-5 md:p-10 rounded-md">

                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-600 border">
                            <img src={session?.user?.profile_pic} alt="avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className='space-y-1'>
                            <h1 className="text-xl font-semibold text-gray-800">{session?.user.full_name}</h1>
                            <p className="text-sm text-gray-500">@{session?.user?.username}</p>
                            <p className="text-xs text-gray-400">Member since 00/00/0000</p>
                        </div>

                        {/* {isOwnProfile && 
                            <button className='ml-auto flex items-center gap-2 bg-blue-500 p-2 text-sm rounded-lg text-white cursor-pointer'
                            onClick={()=>router.push(`/profile/edit/${session?.user?.username}`)}
                            >
                                <Pencil size={16}/> Edit profile
                            </button>
                        } */}
                        
                    </div>

                    <div>
                        <h2 className="text-md font-medium text-gray-700 mb-4">Profile Details</h2>
                        <div className="overflow-hidden rounded-md border text-gray-500 border-gray-200 divide-y divide-gray-200 text-sm">
                            <div className="flex justify-between p-3 bg-gray-50 font-medium">
                                <span>Full name</span>
                                <span className="text-gray-700">{session?.user?.full_name}</span>
                            </div>
                            <div className="flex justify-between p-3">
                                <span>Username</span>
                                <span className="text-gray-700">{session?.user?.username}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-50">
                                <span>Email address</span>
                                <span className="text-gray-700">sample@gmail.com</span>
                            </div>
                            <div className="flex justify-between p-3">
                                <span>Account type</span>
                                <span className="text-gray-700">{session?.user?.role}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-md font-medium text-gray-700 mb-4">Learning Statistics</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-violet-50">
                                <div className="p-2 bg-violet-600 text-white rounded-lg">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Courses Purchased</p>
                                    <p className="text-xl font-bold text-violet-700">00</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
                                <div className="p-2 bg-green-600 text-white rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Sessions Taken</p>
                                    <p className="text-xl font-bold text-green-700">00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ):(

                <div className='p-10'>

                    <div className='bg-blue-100 rounded-md h-48 w-full'/>

                    

                    <div className='mt-[-120px] ml-10 flex items-end'>

                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.animerankers.com%2Fwp-content%2Fuploads%2F2021%2F11%2Favatars-isQpTzkkjxzRPrxp-yK9v3w-t500x500-1024x1024.jpg" alt="mentor" className='h-50 w-50 rounded-full '  />

                        {isOwnProfile && 
                            <button className='mr-auto flex items-center gap-2 bg-blue-500 p-2 text-sm rounded-lg text-white cursor-pointer'
                            onClick={()=>router.push(`/profile/edit/${session?.user?.username}`)}
                            >
                                <Pencil size={16}/> Edit profile
                            </button>
                        }

                    </div>
                     


                <div className='ml-10 mt-2 p-3'>

               

                

                <div className='flex flex-col items-start gap-4 rounded-md flex-1/5'>
                   

                    <div className='flex justify-between w-full'>
                        <div>
                            <h1 className='text-gray-600 text-2xl font-semibold'>Kazuma</h1>
                            <p className='text-gray-700 text-sm mt-1'>Adventurer from axel</p>

                            <div className='flex items-center gap-2 text-gray-600 mt-2'>
                                <Star className='text-yellow-500' size={15}/> 
                                <span className='text-sm'>4.5</span>
                                <span className='text-sm'>( 5 reviews )</span>
                            </div>

                            <div className='flex flex-wrap items-center gap-2 mt-3'>
                                <h1 className='bg-slate-100 text-xs py-1 px-2 rounded-full text-center w-fit'>Steal</h1>
                                <h1 className='bg-slate-100 text-xs py-1 px-2 rounded-full text-center w-fit'>Create water</h1>
                                <h1 className='bg-slate-100 text-xs py-1 px-2 rounded-full text-center w-fit'>Ice</h1>
                                <h1 className='bg-slate-100 text-xs py-1 px-2 rounded-full text-center w-fit'>Stealth</h1>
                            </div>
                            
                        </div>

                        <div>
                            <Facebook className='text-gray-500 text-xl bg-slate-100 rounded-md p-1 cursor-pointer mb-6'/>
                            <h1 className='text-xs'>Member since 00/00/0000</h1>
                        </div>
                        

                    </div>
                </div>



                <div className='flex items-center gap-20 mt-6 text-sm text-gray-500 border-b border-gray-200'>
                    <button onClick={()=>setActiveTab("overview")} className={`${activeTab === "overview" ? "text-blue-500 border-b-2" : "text-gray-500 cursor-pointer"} pb-2`}>Overview</button>
                    <button onClick={()=>setActiveTab("sessions")} className={`${activeTab === "sessions" ? "text-blue-500 border-b-2" : "text-gray-500 cursor-pointer"} pb-2`}>Sessions</button>
                    <button onClick={()=>setActiveTab("courses")} className={`${activeTab === "courses" ? "text-blue-500 border-b-2" : "text-gray-500 cursor-pointer"} pb-2`}>Courses</button>
                </div>

                <div>

                    {activeTab === "overview" && <>
                        <div className='mt-2'>
                            <h1 className='text-gray-600 font-medium py-2'>About Me</h1>

                            <p className='text-gray-500 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, id blanditiis earum provident accusantium tenetur velit nisi laboriosam eaque? Ipsa officia necessitatibus, magni quia aperiam officiis. Doloremque iure dicta nulla quos aspernatur culpa rem possimus error vero numquam nemo dolorum, asperiores magni minus at quisquam debitis? Autem sed voluptatem fuga? Voluptate voluptatum perferendis minus eum voluptas natus possimus inventore ut ab corporis dignissimos enim magnam nemo suscipit dolor recusandae, dolores voluptatibus, aliquam necessitatibus. Nobis veniam repellendus sapiente totam dicta molestias, odio quae temporibus natus omnis, tenetur, odit nostrum quam iusto accusantium velit beatae ratione dolor quasi illo in provident nesciunt?</p>



                            {/* <h1 className='mt-4 text-gray-800'>Education</h1>

                            <div className="p-3 rounded-md">
                                <div className='flex items-center justify-between gap-4 rounded-md'>
                                    <div>
                                        <h1 className=' text-gray-800 pb-1'>Bachelor of Science in XYZ</h1>
                                <h1 className='text-xs text-gray-600'>University of XYZ</h1>
                                    </div>
                                    <p className='text-xs text-gray-600'>passign year : 2024</p>
                                </div>
                                
                                
                            </div>


                            <h1 className='mt-4 text-gray-800'>Work Experience</h1>

                            <div className="p-3 rounded-md">
                                <div className='flex items-center justify-between gap-4 rounded-md'>
                                    <div>
                                        <h1 className=' text-gray-800 pb-1'>Famous adventurer</h1>
                                <h1 className='text-xs text-gray-600'>axel</h1>
                                    </div>
                                    <p className='text-xs text-gray-600'>2021 - Present</p>
                                </div>
                                
                                
                            </div> */}
                        </div>


                    </>}

                    {activeTab === "sessions" && <>
                    
                        sessions
                    </>}

                    {activeTab === "courses" && <>
                    
                       courses
                    </>}
                 
                </div>
                


                

 </div>

                </div>


            )}
        
        </div>
    );
}
