import BookingModal from "@/components/modal";
import { apiService } from '@/lib/actions/api';



export default async function MentorSessionDetails({ params }: { params: Promise<{ slug: string }>}) {

  const { slug } = await params;

  const data = await apiService.get(`/client/gig-detail/`,{
    cache: 'no-cache',
    params: {consultancy_id: slug}
  }).catch(error => {
    console.error({"ERROR":error.message});
  });

  return (
    <div className="min-h-screen">

      <div> 
        
        <div className="flex gap-6">

          <div className="flex-grow lg:w-2/3 bg-white rounded-lg shadow-md p-8">

            <h1 className="text-3xl font-bold text-gray-800 mb-6">React Course: Mastering the Basics</h1>

            <div className='flex items-center gap-3'>
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-[3rem] w-[3rem] rounded-full" alt="Mentor Image" />
              <h1 className='text-2xl text-gray-700 font-semibold'>Dr. Jane Smith</h1>
            </div>

            <img src={data?.thumbnail_url} alt={data.title} className='w-full h-[30rem] object-cover rounded-lg my-3' />


            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the ultimate React course! In this comprehensive
              program, you'll learn everything from the fundamentals of React
              to advanced concepts like hooks, context API, and routing.
              Whether you're a complete beginner or looking to deepen your
              React knowledge, this course is designed for you.
            </p>

            <div className=""> 
              <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About the Instructor</h2>
                <div className="flex items-center gap-6 mt-6">
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-[16rem] w-[16rem] rounded-full" alt="Mentor Image" />                  
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Jane Doe</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Jane is a senior software engineer with over 10 years of experience
                      in web development. She specializes in front-end technologies
                      and has a passion for teaching.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Her expertise includes React, Node.js, and cloud computing.
                      She has trained hundreds of developers and helped them launch
                      successful careers in tech.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Jane is also an active contributor to open-source projects
                      and frequently speaks at tech conferences.
                    </p>
                  </div>
                </div>
              </div>          
            </div>
            
          </div>

          

          <div className="relative"> 
            <div className="bg-white p-6 text-center sticky top-[4.4rem] z-10"> 
              <h3 className="text-3xl font-bold text-gray-800 mb-7">Book Your Session</h3>
              <BookingModal timeSlots={data.days} slug={data.id}/>
            </div>
          </div>

        </div>


        <div className='p-10 bg-white rounded-lg shadow-md mb-8'>
          Similar sessions
        </div>


      </div>
    </div>
  );
}

