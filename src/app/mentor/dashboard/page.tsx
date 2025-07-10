'use client';

import { useEffect, useState } from 'react';
import { Users, Video, DollarSign, Star, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Chart component (simplified version)
const EarningsChart = ({ period }: { period: 'Weekly' | 'Monthly' | 'Yearly' }) => {
  // This would normally use a chart library like Chart.js or Recharts
  // For simplicity, we're using a static SVG path
  return (
    <div className="relative h-48 w-full mt-4">
      <div className="absolute inset-0">
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <path
            d="M0,120 L33,100 L66,110 L100,90 L133,100 L166,80 L200,90 L233,70 L266,80 L300,60 L333,70 L366,50 L400,40"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <path
            d="M0,120 L33,100 L66,110 L100,90 L133,100 L166,80 L200,90 L233,70 L266,80 L300,60 L333,70 L366,50 L400,40"
            fill="url(#gradient)"
            fillOpacity="0.2"
            stroke="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Chart dots */}
          <circle cx="0" cy="120" r="3" fill="#8b5cf6" />
          <circle cx="33" cy="100" r="3" fill="#8b5cf6" />
          <circle cx="66" cy="110" r="3" fill="#8b5cf6" />
          <circle cx="100" cy="90" r="3" fill="#8b5cf6" />
          <circle cx="133" cy="100" r="3" fill="#8b5cf6" />
          <circle cx="166" cy="80" r="3" fill="#8b5cf6" />
          <circle cx="200" cy="90" r="3" fill="#8b5cf6" />
          <circle cx="233" cy="70" r="3" fill="#8b5cf6" />
          <circle cx="266" cy="80" r="3" fill="#8b5cf6" />
          <circle cx="300" cy="60" r="3" fill="#8b5cf6" />
          <circle cx="333" cy="70" r="3" fill="#8b5cf6" />
          <circle cx="366" cy="50" r="3" fill="#8b5cf6" />
          <circle cx="400" cy="40" r="3" fill="#8b5cf6" />
        </svg>
      </div>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 py-2">
        <div>₹ 10,000</div>
        <div>₹ 8,000</div>
        <div>₹ 6,000</div>
        <div>₹ 4,000</div>
        <div>₹ 2,000</div>
        <div>₹ 0</div>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-gray-500">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  );
};

// Course progress bar component
const CourseProgressBar = ({ 
  name, 
  percentage, 
  color 
}: { 
  name: string; 
  percentage: number; 
  color: string;
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500"
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${colorClasses[color as keyof typeof colorClasses]} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [earningsPeriod, setEarningsPeriod] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Monthly');
  
  // Mock data
  const stats = {
    totalStudents: 128,
    studentGrowth: 12,
    totalSessions: 64,
    sessionGrowth: 9,
    totalEarnings: 45200,
    earningsGrowth: 15,
    averageRating: 4.8,
    totalReviews: 57
  };
  
  const courses = [
    { name: "Web Development Basics", percentage: 85, color: "blue" },
    { name: "JavaScript Masterclass", percentage: 92, color: "green" },
    { name: "React for Beginners", percentage: 78, color: "purple" },
    { name: "Node.js Essentials", percentage: 65, color: "yellow" }
  ];
  
  const upcomingSessions = [
    { 
      id: 1, 
      title: "JavaScript Debugging Session", 
      date: "Today", 
      startTime: "3:00 PM", 
      endTime: "4:30 PM", 
      type: "javascript",
      status: "join" 
    },
    { 
      id: 2, 
      title: "React Project Review", 
      date: "Tomorrow", 
      startTime: "1:00 PM", 
      endTime: "2:00 PM", 
      type: "react",
      status: "prepare" 
    },
    { 
      id: 3, 
      title: "Node.js API Development", 
      date: "May 15", 
      startTime: "5:00 PM", 
      endTime: "6:30 PM", 
      type: "nodejs",
      status: "prepare" 
    }
  ];
  
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      rating: 5,
      comment: "Excellent mentor! John explained complex JavaScript concepts in a way that was easy to understand. Highly recommended!",
      daysAgo: 2
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      rating: 5,
      comment: "Great session on React hooks. The mentor was patient and helped me debug my project issues. Would book again.",
      daysAgo: 7
    },
    {
      id: 3,
      name: "Priya Sharma",
      avatar: "/avatars/priya.jpg",
      rating: 5,
      comment: "John's Node.js course is fantastic! He provided additional resources and was always available to answer questions.",
      daysAgo: 14
    }
  ];
  
  const getSessionTypeColor = (type: string) => {
    switch(type) {
      case 'javascript': return 'bg-yellow-100 text-yellow-800';
      case 'react': return 'bg-purple-100 text-purple-800';
      case 'nodejs': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getSessionTypeIcon = (type: string) => {
    switch(type) {
      case 'javascript': return 'JS';
      case 'react': return 'R';
      case 'nodejs': return 'N';
      default: return 'W';
    }
  };

  

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden');
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, [open]);
  
  

  
  
  return (
    <div className="p-6 relative">

      <div className='fixed inset-0 z-1 flex items-center justify-center bg-white/50 backdrop-blur-xs p-4'>
          <h1 className='text-3xl font-semibold text-gray-800'>Coming soon...</h1>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
        <p className="text-gray-600">Welcome back, John! Here's what's happening with your mentorship.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h3 className="text-3xl font-bold mt-1">{stats.totalStudents}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.studentGrowth}%
            </span>
            <span className="text-gray-500 text-sm ml-1">From last month</span>
          </div>
        </div>
        
        {/* Total Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm">Total Sessions</p>
              <h3 className="text-3xl font-bold mt-1">{stats.totalSessions}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Video className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.sessionGrowth}%
            </span>
            <span className="text-gray-500 text-sm ml-1">From last month</span>
          </div>
        </div>
        
        {/* Total Earnings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm">Total Earnings</p>
              <h3 className="text-3xl font-bold mt-1">৳{stats.totalEarnings.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
                <p className='text-green-500 text-2xl'>৳</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {stats.earningsGrowth}%
            </span>
            <span className="text-gray-500 text-sm ml-1">From last month</span>
          </div>
        </div>
        
        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h3 className="text-3xl font-bold mt-1">{stats.averageRating}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1">
              <StarRating rating={5} />
            </div>
            <span className="text-gray-500 text-sm">From {stats.totalReviews} reviews</span>
          </div>
        </div>
      </div>
      
      {/* Earnings and Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Earnings Overview</h3>
            <div className="flex space-x-2 text-sm">
              <button 
                className={`px-3 py-1 rounded-md ${earningsPeriod === 'Weekly' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setEarningsPeriod('Weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${earningsPeriod === 'Monthly' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setEarningsPeriod('Monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${earningsPeriod === 'Yearly' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setEarningsPeriod('Yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
          <EarningsChart period={earningsPeriod} />
        </div>
        
        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Course Performance</h3>
            <Link href="/courses" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <CourseProgressBar 
                key={index}
                name={course.name}
                percentage={course.percentage}
                color={course.color}
              />
            ))}
          </div>
          
          <button className="mt-6 w-full py-2 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Course
          </button>
        </div>
      </div>
      
      {/* Upcoming Sessions and Latest Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            <Link href="/sessions" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-lg ${getSessionTypeColor(session.type)} mr-4`}>
                  <Video className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{session.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{session.date}, {session.startTime} - {session.endTime}</span>
                  </div>
                </div>
                <button 
                  className={`px-4 py-1 rounded-md text-sm ${
                    session.status === 'join' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {session.status === 'join' ? 'Join' : 'Prepare'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Latest Reviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Latest Reviews</h3>
            <Link href="/reviews" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <div className="relative w-8 h-8 mr-3">
                    <Image 
                      src='https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740'
                      alt={review.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <div className="flex items-center">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-500 ml-2">{review.daysAgo} {review.daysAgo === 1 ? 'day' : 'days'} ago</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}