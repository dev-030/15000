'use client'
import { MoreVertical,  Edit } from 'lucide-react';

import { useEffect, useState } from 'react';
import { X, Clock, DollarSign } from 'lucide-react';
import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import CreateSessionModal from '@/components/SessionModal';
import { SessionManagementData } from '@/lib/actions/actions';
import useSWR from 'swr';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';


interface Session {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceType: 'hour' | 'session';
  duration: number;
  isActive: boolean;
  icon: string;
} 


export default function SessionManagement() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data, isLoading} = useSWR("/api/session-list", (url: string) =>
    fetch(url).then((res) => res.json())
  );


  return (
    <div className="p-6 min-h-screen">

      <div className=" rounded-lg min-h-screen">

        <Toaster/>
        
        {isLoading ? (
          <div className="min-h-screen grid place-content-center">
              <p>Loading data...</p>
          </div>
        ) : data?.results && data.results.length > 0 ? (
          <div>

            <div className="flex flex-wrap space-y-3 justify-between items-center mb-10 bg-white p-6 rounded-lg">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Manage Your Sessions</h1>
                  <p className="text-sm text-gray-600">Create and manage your mentoring sessions</p>
                </div>

                <Link href="/mentor/session-management/create"  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded flex items-center gap-2 cursor-pointer">
                  <Plus className="h-5 w-5 mr-1 text-white" />
                  Create New Session
                </Link>
            </div>

            <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
              {data?.results?.map((session:any) => (

                <div key={session.id} className="group w-full max-w-2xl rounded-md overflow-hidden bg-white shadow-sm transition-all duration-300 border border-gray-200">
                                {console.log(session)}
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                    src={session?.thumbnail_url || '/placeholder-course.jpg'}
                    alt={session?.title || 'Mentorship thumbnail'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE2Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=="
                    />
                  </div>
              
                  <div className="py-3 px-3 flex flex-col">
                    <h3 className="font-semibold text-gray-800 text-md leading-tight line-clamp-2 mb-2">
                    {session?.title}
                    </h3>
            
                    <p className="text-gray-600 text-sm line-clamp-2">{session.description}</p>

                    <div className="flex items-stretch gap-2 justify-between py-3 divide-x-2 divide-gray-300">
                      <div className=" py-1.5 w-full flex flex-col gap-0.5 items-center justify-center">
                          <p className="text-gray-500 text-xs">Duration</p>
                          <p className="text-gray-700 text-sm">{session?.duration}</p>
                      </div>
                      <div className=" py-1.5 w-full flex flex-col gap-0.5 items-center justify-center">
                          <p className="text-gray-500 text-xs">Price</p>
                          <p className="text-gray-700 text-sm">{session?.price}</p>
                      </div>
                    </div>

                    <div className='flex items-center justify-between '>
                      <button>
                        availability
                      </button>
                      <Link href={`/mentor/session-management/${session.id}`} className="bg-blue-600 p-2 text-center w-full rounded-full text-white text-sm">Edit</Link>
                    </div>
              
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-6 bg-white rounded-lg  flex flex-col items-center justify-between">
       
            <div className="mb-8 relative">
              <div className="absolute -inset-1 "></div>
              <div className="relative bg-white p-2 rounded-full">
                <Calendar className="h-20 w-20 text-indigo-500" />
              </div>
            </div>
          
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Sessions Created Yet</h2>

            <p className="text-gray-600 text-center mb-6">
              Create your first session time slot to start accepting bookings from students. You can set your availability and session details.
            </p>

            <Link href="/mentor/session-management/create" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center gap-2 cursor-pointer">
              <Plus className="h-5 w-5 mr-1" />
              Create New Session
            </Link>
            
          </div>
        )}

      </div>

    </div>
  );
};











