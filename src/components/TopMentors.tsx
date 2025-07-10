import Link from "next/link";
import Image from "next/image";

export default function TopMentors() {
  const topMentors = [
    {
      id: 1,
      name: "Elena Rodriguez",
      title: "Full Stack Developer",
      description: "5+ years of experience in React, Node.js, and cloud technologies. Helped 200+ students land their dream jobs.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Senior Frontend Engineer",
      description: "Former Google engineer specializing in scalable web applications. Expert in modern JavaScript frameworks.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "Backend Specialist",
      description: "Senior developer with expertise in MERN stack. Passionate about teaching clean code and best practices.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "David Kumar",
      title: "CTO & Startup Mentor",
      description: "Startup CTO with 8+ years experience. Specializes in building high-performance applications from scratch.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "UI/UX Developer",
      description: "Design-focused developer with expertise in creating beautiful and functional user interfaces.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Alex Thompson",
      title: "DevOps Engineer",
      description: "Cloud infrastructure expert with experience in AWS, Docker, and Kubernetes. Loves automation.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Maya Patel",
      title: "Mobile Developer",
      description: "React Native specialist with 6+ years building cross-platform mobile applications.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9107d0c?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 8,
      name: "James Wilson",
      title: "Data Engineer",
      description: "Big data expert specializing in Python, SQL, and machine learning implementations.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    }
  ];

  return (
    <div className="py-8 px-5">

      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Top Mentors</h2>
        <p className="text-gray-500 text-sm mb-5">Learn directly from our experts and get personalized guidance.</p>
      </div>

        <div className="overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {topMentors.map((mentor) => ( 
              <div key={mentor.id} 
                className="w-[19rem] text-center bg-white rounded-2xl p-3 shadow-sm border border-gray-100"
              >

                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      sizes="(max-width: 640px) 64px, 80px"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                    {mentor.name}
                  </h3>
                  
                  <p className="text-blue-600 text-sm font-medium mb-2 sm:mb-3">
                    {mentor.title}
                  </p>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                    {mentor.description}
                  </p>

                  <Link 
                    href={`/profile/${mentor.id}`} 
                    className="inline-block w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors duration-200"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      
)}

