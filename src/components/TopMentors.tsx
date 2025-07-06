import Link from "next/link";



export default function TopMentors() {



  
  
  const topMentors = [
    {
      id: 1,
      name: "Elena",
      title: "Full stack developer",
      description: "5+ years of experience in React, Node.js, and cloud technologies. Helped 200+ students land their dream jobs.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Elena",
      title: "Full stack developer",
      description: "Former Google engineer specializing in scalable web applications. Expert in modern JavaScript frameworks.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Elena",
      title: "Full stack developer",
      description: "Senior developer with expertise in MERN stack. Passionate about teaching clean code and best practices.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Elena",
      title: "Full stack developer",
      description: "Startup CTO with 8+ years experience. Specializes in building high-performance applications from scratch.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    }
  ];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Mentors</h2>

      <div className="grid grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 min-[1500px]:grid-cols-5 gap-3">
        {topMentors.map((mentor) => (
          <Link href={`/profile/${mentor.id}`} key={mentor.id} className="text-center bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
            <div className="relative mb-3">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden p-1">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">
              {mentor.name}
            </h3>            

            <p className="text-gray-600 text-sm mb-2">
              {mentor.title}
            </p>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
              {mentor.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}