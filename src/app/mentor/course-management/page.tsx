import { MoreVertical,  Edit, MonitorCog } from 'lucide-react';
import { Clock} from 'lucide-react';
import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';


export default async function CourseManagement() {  
  
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/gig-list/`, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MjU5ODQ0LCJpYXQiOjE3NDczOTU4NDQsImp0aSI6ImRiNmM4YzM5NzEwZjQ1MmE4YjdhNzNmYjU0N2M0YjU3IiwidXNlcl9pZCI6IjkzOWEzZDYyLTQzYjEtNDJlMi1iNGFjLWFmMzMxYmU1YzY2MiIsInVzZXJuYW1lIjoiYXlvbl9kZWVhMDNkMiIsImZ1bGxfbmFtZSI6IiIsInByb2ZpbGVfcGljIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAxNS8xMC8wNS8yMi8zNy9ibGFuay1wcm9maWxlLXBpY3R1cmUtOTczNDYwXzEyODAucG5nIn0.jhZU6SsMtQcisAWBbN5tksjzlatUtHb_MrNJ2XYQsRw`,
        }
    })


    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <div className="rounded-lg">

                {response?.data?.results.length > 0 ? (

                <div>

                    <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-lg">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">Manage Your Courses</h1>
                            <p className="text-sm text-gray-600">Create and manage your course</p>
                        </div>
                        <Link href="/mentor/course-management/create" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded flex items-center gap-2 cursor-pointer">
                            <Plus className="h-5 w-5 mr-1 text-white" />
                            Create New Courses
                        </Link>
                    </div>
                
                    <div className="flex flex-wrap gap-4">
                    {response?.data?.results?.map((session:any) => (
                        <div key={session.id} className="bg-white rounded-lg p-4 shadow-sm max-w-sm">

                            <div className="flex justify-between items-start mb-4">

                                <h3 className="font-medium text-lg text-gray-700">{session.title}</h3>

                                <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${session.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-700'}`}>
                                    {session.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <MoreVertical size={16} />
                                </button>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                                <div>
                                <h4 className="text-xs text-gray-600 mb-1">PRICE</h4>
                                <div className="flex items-center">
                                    <span className="text-gray-800 text-sm">
                                    ৳ {session.price.toLocaleString()}
                                    </span>
                                </div>
                                </div>
                                
                                <div>
                                <h4 className="text-xs text-gray-600 mb-1">DURATION</h4>
                                <div className="flex items-center">
                                    <Clock size={15} className="text-gray-600 mr-1" />
                                    <span className="text-gray-800 text-sm">{session.duration} minutes</span>
                                </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-xs text-gray-700 mb-1">DESCRIPTION</h4>
                                <p className="text-sm text-gray-800">
                                One-on-one mentoring session for web development. Get personalized guidance on HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners and intermediate developers looking to improve their skills.
                                </p>
                            </div>


                            <div className="flex flex-col sm:flex-row gap-2">
                                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg flex items-center justify-center cursor-pointer">
                                <Edit size={15} className="mr-1" /> 
                                <p className='text-sm'>Manage Availability</p>
                                </button>
                                <button className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-0 rounded-lg flex items-center justify-center cursor-pointer">
                                <Edit size={15} className="mr-1" /> 
                                <p className='text-sm'>Edit Session</p>
                                </button>
                            </div>

                        </div>
                    ))}
                    </div>
                </div>
                ):(
                <div className="w-full h-[70vh] p-6 bg-white rounded-lg flex flex-col items-center justify-center text-center">
            
                    <div className="mb-8 relative">
                        <div className="relative bg-white p-2 rounded-full">
                            <MonitorCog className="h-20 w-20 text-indigo-500" />
                        </div>
                    </div>
                
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Courses Created Yet</h2>

                    <p className="text-gray-600 text-center mb-6">
                        Create your first course .
                    </p>

                    <Link href="/mentor/course-management/create" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center gap-2 cursor-pointer">
                        <Plus className="h-5 w-5 mr-1" />
                        Create New Course
                    </Link>
                    
                </div>
                )}

            </div>

        </div>
    );
};











