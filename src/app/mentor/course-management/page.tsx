import { MoreVertical,  Edit, MonitorCog } from 'lucide-react';
import { Clock} from 'lucide-react';
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { apiService } from '@/lib/actions/api';
import Image from 'next/image';


export default async function CourseManagement() {  
  
    const response = await apiService.get(`/course/list/`,{
        requiresAuth: true
    }).catch((error) => {
        console.error({"ERROR":error.message});
    })
    

    return (

        <div className="p-6 bg-gray-50 min-h-screen">

            <div className="rounded-lg">

                {response?.length > 0 ? (

                <div>

                    <div className="flex flex-wrap space-y-3 justify-between items-center mb-10 bg-white p-6 rounded-lg">
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

                    {response?.map((course:any) => (
                        <Link
                            href={`/mentor/course-management/${course.id}`}
                            key={course.id}
                            className="group bg-white rounded-lg p-1.5 border border-gray-200 hover:border-blue-300 transition-all duration-200 w-full max-w-[300px]"
                            >
                            <div className="w-full aspect-video overflow-hidden rounded-lg mb-2">
                                <Image
                                src={course.thumbnail}
                                alt="Course thumbnail"
                                width={250}
                                height={225}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{course.course_name}</h3>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.course_description}</p>

                            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                                <span className="text-blue-600 font-medium">
                                {course.is_paid ? `$${course.course_price}` : 'Free'}
                                </span>
                            </div>
                        </Link>
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











