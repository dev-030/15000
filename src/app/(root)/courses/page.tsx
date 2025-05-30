'use client'
import CourseCard from "@/components/courseCard";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';



export default function Courses() {

  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [priceFilter, setPriceFilter] = useState('All');
  const [courseData, setCourseData] = useState([]);

  useEffect(()=>{
    const data = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
        method: 'GET',
      });
      const data = await res.json();
      setCourseData(data);
    };

    data()
  },[])
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'design', name: 'Design' },
    { id: 'programming', name: 'Programming' },
    { id: 'business', name: 'Business' },
    { id: 'communication', name: 'Communication' },
    { id: 'school', name: 'School Subjects' },
    { id: 'freelancing', name: 'Freelancing' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'photography', name: 'Photography' },
    { id: 'language', name: 'Language' },
  ];
  
  
  return (
    <>
      <main className="min-h-screen">

        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
          <p className="text-gray-600 text-sm">Explore expert-led courses across various skills</p>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex flex-wrap space-x-2 space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === category.name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white px-4 py-2 rounded-md">
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md text-sm py-1.5"
            >
              <option>Recommended</option>
              <option>Newest</option>
              <option>Highest Rated</option>
              <option>Most Popular</option>
            </select>
          </div>

          <div className="flex gap-1 bg-gray-50 p-1 rounded-md overflow-hidden">
              <button 
                onClick={() => setPriceFilter('All')}
                className={`py-1.5 px-4 text-sm font-medium cursor-pointer rounded-md ${priceFilter === 'All' ? 'bg-white text-blue-500' : 'bg-gray-50 hover:bg-gray-100 '}`}
              >
                All
              </button>
              <button 
                onClick={() => setPriceFilter('Free')}
                className={`py-1.5 px-4 text-sm font-medium cursor-pointer rounded-md ${priceFilter === 'Free' ? 'bg-white text-blue-500' : 'bg-gray-50 hover:bg-gray-100 '}`}
              >
                Free
              </button>
              <button 
                onClick={() => setPriceFilter('Paid')}
                className={`py-1.5 px-4 text-sm font-medium cursor-pointer rounded-md ${priceFilter === 'Paid' ? 'bg-white text-blue-500' : 'bg-gray-50 hover:bg-gray-100 '}`}
              >
                Paid
              </button>
            </div>
          
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search in courses..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>

        </div>


        <div className="flex flex-wrap gap-5">
          {courseData.map((course:any) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <CourseCard course={course}/>
              </Link>
            ))}
        </div>


        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-1">
            <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 bg-blue-500 text-white rounded-md text-sm">
              1
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              2
            </button>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer">
              12
            </button>
            <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>

      </main>
    </>
  );
}