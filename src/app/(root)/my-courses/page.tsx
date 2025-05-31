import CourseCard from "@/components/courseCard";
import Link from "next/link";


import { Search, Star, ChevronLeft, ChevronRight, Landmark } from 'lucide-react';
import axios from "axios";

export default async function MyCourses() {




  
  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Course',
      instructor: 'Arslan Khan',
      category: 'Programming',
      rating: 4.5,
      students: '1,245',
      price: 4900,
      premium: true,
      image: 'blue-circle'
    },
    {
      id: 2,
      title: 'Introduction to Business Management',
      instructor: 'Sadie Rahman',
      category: 'Business',
      rating: 4.2,
      students: '3,782',
      price: 0,
      premium: false,
      image: 'orange-lightning'
    },
    {
      id: 3,
      title: 'Flutter Mobile App Development',
      instructor: 'Arslan Khan',
      category: 'Programming',
      rating: 4.7,
      students: '876',
      price: 5500,
      premium: true,
      image: 'purple-bowtie'
    },
    {
      id: 4,
      title: 'English Speaking for Beginners',
      instructor: 'Sarah Rahman',
      category: 'Language',
      rating: 4.7,
      students: '8,471',
      price: 0,
      premium: false,
      image: 'blue-circle-light'
    },
    {
      id: 5,
      title: 'Introduction to Programming',
      instructor: 'Arslan Khan',
      category: 'Programming',
      rating: 4.6,
      students: '7,648',
      price: 0,
      premium: false,
      image: 'blue-bowtie'
    },
    {
      id: 6,
      title: 'UI/UX Design Masterclass',
      instructor: 'Nusrat Jahan',
      category: 'Design',
      rating: 4.9,
      students: '2,154',
      price: 5500,
      premium: true,
      image: 'pink-triangle'
    },
    {
      id: 7,
      title: 'Digital Marketing Strategy',
      instructor: 'Kamal Hassan',
      category: 'Marketing',
      rating: 4.5,
      students: '1,876',
      price: 5500,
      premium: true,
      image: 'orange-red-square'
    },
    {
      id: 8,
      title: 'Freelancing Success Blueprint',
      instructor: 'Tamer Ahmed',
      category: 'Freelancing',
      rating: 4.0,
      students: '1,745',
      price: 7800,
      premium: true,
      image: 'teal-hourglass'
    },
  ];
  

  
  

  return (
    <div className="min-h-screen ">
      
      {/* Main Content */}
      <main className="">

        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
          <p className="text-gray-600 text-sm">Access your learning anytime</p>
        </div>
        
        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Toggle View:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={hasCourses}
                onChange={() => setHasCourses(!hasCourses)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div> */}



      {/* {hasCourses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <div className="relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
                />
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
                  course.status === 'In Progress'
                    ? 'bg-green-200 text-green-800'
                    : course.status === 'New Started'
                    ? 'bg-yellow-200 text-yellow-800'
                    : course.status === 'Completed'
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {course.status}
                </span>
              </div>
              <h3 className="mt-2 text-md font-semibold">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600">By {course.author}</p>
              <div className="mt-2 text-sm text-gray-500">
                {course.status === 'Completed' && course.completedAt && (
                  <p>Completed: {course.completedAt}</p>
                )}
                {course.status !== 'Completed' && course.lastAccessed && (
                  <p>Last accessed: {course.lastAccessed}</p>
                )}
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <button className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded">
                {course.status === 'Completed' ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">

            <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-5xl text-blue-500">         
                <Landmark className="h-50 w-50 text-blue-500 mb-4 text-center" />
            </div>
          <p className="text-lg font-semibold mb-2">
            You haven’t bought any courses yet
          </p>
          <p className="text-sm text-gray-600 mb-4 w-1/3">
            Explore our courses and start learning today! We have a wide range of
            courses to help you develop new skills.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded">
            Browse Courses
          </button>
            </div>
            


          <div className="mt-10">
            <h3 className="text-left text-lg font-semibold mb-2">Recommended for you</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="mt-2 text-md font-semibold">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">By {course.author}</p>
                  <p className="text-sm font-semibold text-gray-900">৳ 3,500</p>
                  <button className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded">
                    View Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
        
        


      </main>
    </div>
  );
}



