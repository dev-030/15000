import { Star } from 'lucide-react';
import Link from 'next/link';

export default function MentorGrid({ mentors }) {
  return (
    <div>
      <h1 className="text-xl text-gray-700 font-bold mb-4 mt-10">Book Mentors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
      
      {mentors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No mentors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function MentorCard({ mentor }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="rounded-lg overflow-hidden shadow">
      <div className={`${mentor.bgColor || 'bg-gradient-to-r from-blue-500 to-purple-600'} p-4 relative h-32 flex items-center justify-center`}>
        <div className="w-16 h-16 rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
          <div className="bg-gray-200 w-14 h-14 rounded-full overflow-hidden">
            <img 
              src={mentor.thumbnail_url || '/default-avatar.png'} 
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-gray-900 font-medium text-sm">{mentor.name}</h3>
          <div className="flex items-center">
            {renderStars(mentor.rating || 4.5)}
            <span className="text-xs text-gray-500 ml-1">({mentor.rating || 4.5})</span>
          </div>
        </div>
        
        <div className="flex text-xs text-gray-500 mb-2">
          <span className="mr-2">{mentor.title}</span>
          <span className="ml-2">{mentor.specialty}</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-4 line-clamp-2">
          {mentor.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            ${mentor.price || 30} <span className="text-xs text-gray-500 font-normal">/ hour</span>
          </div>
          <Link 
            href={`/mentors/${mentor.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-4 rounded transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// Server Component - components/TopMentors.js
export function TopMentors() {
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
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Top Mentors</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {topMentors.map((mentor) => (
          <div key={mentor.id} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
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

            <p className="text-gray-500 text-xs leading-relaxed">
              {mentor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}