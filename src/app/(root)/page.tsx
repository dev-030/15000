'use client'

import { Star, User } from "lucide-react";

export default function Home() {

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      category: "Programming",
      categoryColor: "bg-green-100 text-green-800",
      badge: "Featured",
      badgeColor: "bg-orange-500",
      rating: 4.8,
      reviews: 2342,
      description: "Master HTML, CSS, JavaScript, React, Node.js and become a full-stack developer in 12 weeks.",
      price: "$8,999",
      originalPrice: "$12,000",
      icon: "🗂️",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-200"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      category: "Design",
      categoryColor: "bg-purple-100 text-purple-800",
      badge: "Best",
      badgeColor: "bg-blue-600",
      rating: 4.7,
      reviews: 1892,
      description: "Learn professional UI/UX design principles and create stunning user interfaces for web and mobile.",
      price: "$7,499",
      originalPrice: "$9,999",
      icon: "🎨",
      bgColor: "bg-pink-100",
      iconBg: "bg-pink-200"
    },
    {
      id: 3,
      title: "Data Science & Machine Learning",
      category: "Data Science",
      categoryColor: "bg-blue-100 text-blue-800",
      badge: "Bestseller",
      badgeColor: "bg-orange-500",
      rating: 4.9,
      reviews: 3421,
      description: "Master data analysis, visualization, machine learning algorithms and AI with Python and R.",
      price: "$9,999",
      originalPrice: "$14,000",
      icon: "📊",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200"
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      categoryColor: "bg-green-100 text-green-800",
      badge: "",
      badgeColor: "",
      rating: 4.6,
      reviews: 1543,
      description: "Learn SEO, social media marketing, email campaigns, and content marketing strategies.",
      price: "$6,499",
      originalPrice: "$8,999",
      icon: "🎯",
      bgColor: "bg-green-100",
      iconBg: "bg-green-200"
    },
    {
      id: 5,
      title: "Productivity & Time Management",
      category: "Business Development",
      categoryColor: "bg-yellow-100 text-yellow-800",
      badge: "Best",
      badgeColor: "bg-blue-600",
      rating: 4.5,
      reviews: 2178,
      description: "Master time management, goal setting, and productivity systems to achieve more in less time.",
      price: "$5,999",
      originalPrice: "$7,999",
      icon: "⏰",
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-200"
    },
    {
      id: 6,
      title: "Personal Finance Fundamentals",
      category: "Finance",
      categoryColor: "bg-red-100 text-red-800",
      badge: "",
      badgeColor: "",
      rating: 4.7,
      reviews: 1867,
      description: "Learn budgeting, investing, retirement planning, and how to achieve financial freedom.",
      price: "$7,499",
      originalPrice: "$9,999",
      icon: "💰",
      bgColor: "bg-red-100",
      iconBg: "bg-red-200"
    }
  ];


   const mentors = [
    {
      id: 1,
      name: "Dr. Tanvir Ahmed",
      specialty: "Web Development Expert",
      description: "Former Google engineer with 15+ years of experience in full-stack development.",
      rating: 4.9,
      reviews: 224,
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-600",
      textColor: "text-white"
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      specialty: "UI/UX Design Specialist",
      description: "Award-winning designer with experience at Apple and Adobe. Specializes in user-centered design.",
      rating: 4.8,
      reviews: 187,
      bgColor: "bg-gradient-to-br from-pink-400 to-purple-500",
      textColor: "text-white"
    },
    {
      id: 3,
      name: "Dr. Rafiqul Islam",
      specialty: "Data Science & AI Expert",
      description: "PhD in Computer Science with expertise in machine learning and AI applications.",
      rating: 5.0,
      reviews: 156,
      bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
      textColor: "text-white"
    }
  ];

  return (
    <>

      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white rounded-md ">
        <div className="max-w-7xl mx-auto p-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">

            <div className="space-y-7">
              <h1 className="text-3xl font-bold leading-tight">
                Unlock Your Potential with{' '}
                <span className="block">Expert-Led Courses</span>
              </h1>
              
              <p className="text-sm text-purple-100 leading-relaxed max-w-2xl">
                Join over 50,000 students learning from industry experts. Advance your 
                career with EdCluster's premium courses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <button className="bg-white px-4 py-3 text-purple-600 hover:bg-gray-100  rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Explore Courses
                </button>
                <button className="border-2 px-4 py-3 border-white hover:bg-white hover:text-purple-600  rounded-lg font-semibold transition-all duration-300">
                  Find a Mentor
                </button>
              </div>
              
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-80 shadow-2xl border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <div className="flex-1 h-2 bg-white/20 rounded-full">
                      <div className="w-3/4 h-full bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-3 bg-white/30 rounded-full w-full"></div>
                    <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
                    <div className="h-3 bg-white/20 rounded-full w-3/5"></div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-pink-400 rounded-full opacity-70 animate-bounce"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
              </div>
            </div>

          </div>
        </div>
      </div>



      <div className="mx-auto mt-8">

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700 pb-4">Popular Courses</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              <div className={`${course.bgColor} p-8 relative`}>

                {course.badge && (
                  <div className={`absolute top-4 right-4 ${course.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {course.badge}
                  </div>
                )}
                
                <div className={`w-16 h-16 ${course.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{course.icon}</span>
                </div>
                
                <div className="mb-2">
                  <span className={`${course.categoryColor} px-3 py-1 rounded-full text-sm font-medium`}>
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({course.reviews.toLocaleString()})</span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md">
          Browse All Courses
        </button>

      </div>





      <div className="max-w-7xl mx-auto mt-10">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 pb-4">Top Mentors</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Profile Header */}
              <div className={`${mentor.bgColor} p-8 text-center relative`}>
                {/* Profile Icon */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className={`w-8 h-8 ${mentor.textColor}`} />
                </div>
              </div>

              {/* Mentor Info */}
              <div className="p-6">
                {/* Name */}
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {mentor.name}
                </h3>

                {/* Specialty */}
                <p className="text-blue-600 font-semibold mb-3">
                  {mentor.specialty}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {mentor.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        className={`w-4 h-4 ${
                          index < Math.floor(mentor.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{mentor.rating}</span>
                  <span className="text-gray-500 text-sm">({mentor.reviews} reviews)</span>
                </div>

                {/* Book Session Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Book a Session
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

     </>
  ); 
}
