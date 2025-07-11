import BookingModal from "@/components/modal";
import { apiService } from '@/lib/actions/api';
import { MessageSquareMore, Star } from "lucide-react";
import parse from 'html-react-parser';
import Link from "next/link";


export default async function MentorSessionDetails({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;

  const data = await apiService.get(`/client/gig-detail/`, {
    cache: 'no-cache',
    params: { consultancy_id: slug }
  }).catch(error => {
    console.error({ "ERROR": error.message });
  });


  if (!data) return <div className="text-center py-20">Loading session details...</div>;

  const mentor = data.mentor;
  const totalSlots = data.days.reduce((acc: number, day: any) => acc + day.time_blocks.length, 0);
  
  
  return (
    <div className="min-h-screen py-10 sm:px-6 lg:px-8">
      <div className="w-full mx-auto flex flex-col-reverse lg:flex-row gap-4">


        <div className="flex-grow lg:w-2/3 bg-white p-0 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 hidden md:block">{data.title}</h1>
          <p className="mb-5 text-gray-700 hidden md:block">{data?.description}</p>

          {/* Mentor Info */}
          <div className='hidden md:flex items-center gap-3 mb-6'>
            <img
              src={mentor?.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
              alt="Mentor"
            />
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-700">{mentor?.full_name}</h2>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                <Star size={14} className="text-yellow-400" />
                {mentor.rating || '0.00'} Instructor Rating
              </p>
            </div>
          </div>

          <img
            src={data?.thumbnail_url}
            alt={data.title}
            className='w-full h-48 sm:h-[30rem] object-cover rounded-lg hidden md:block'
          />


          <div className="md:border border-gray-200 rounded-md md:p-5 my-3">
            <h1 className="text-xl text-gray-800 font-semibold pb-3">Session Description</h1>
            <div className="prose">
              {parse(data?.rich_description)}
            </div>
          </div>


          <div className="bg-gray-50 rounded-lg border border-slate-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">About the Instructor</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <img
                src={mentor?.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                className="h-24 w-24 rounded-full object-cover border border-gray-300"
                alt="Mentor"
              />
              <div className="text-center sm:text-left">
                <Link href={`/profile/${mentor?.username}`} className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 hover:cursor-pointer">{mentor?.full_name}</Link>
                <p className="text-gray-600 text-sm sm:text-base">{mentor?.about || "This mentor hasn't added a bio yet."}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Avg. Response Time: {mentor.response_time || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 sm:p-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Student reviews</h2>
                <p className="text-gray-600">See what our students are saying about this session.</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-2">
                  <Star size={14} className="text-yellow-500" />
                  {mentor.rating || '0.00'} (0 reviews)
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-7 pt-20">
              <MessageSquareMore size={80} className="text-gray-400" />
              <div className="text-center space-y-2">
                <p className="text-gray-700 text-sm">No reviews yet for this session.</p>
                <p className="text-gray-700 text-sm">Be the first to leave feedback after attending!</p>
              </div>
            </div>
          </div>

        </div>


        <div className="mt:3 md:mt-10 md:flex-3/12 z-10">

          <div className="bg-white md:p-6 rounded-lg border border-gray-200 sticky top-20 sm:top-24">

            <h3 className="text-xl hidden md:block sm:text-xl text-center font-semibold text-gray-800 mb-4">Book This Session</h3>

            <img
              src={data?.thumbnail_url}
              alt={data.title}
              className='w-full h-5/6 object-cover rounded-lg md:hidden'
            />

            <div className="p-4">

              <h1 className="text-xl font-bold text-gray-800 mb-2 md:hidden mt-2">{data.title}</h1>
              <p className="mb-3 text-gray-700 md:hidden">{data?.description}</p>

              <div className="text-left text-sm sm:text-base mb-6 text-gray-700 divide-y-2 divide-gray-400 md:pt-7">
                <div className="flex items-center justify-between py-3">
                  <p>Price</p>
                  <p>{data.price} tk</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Duration</p>
                  <p>{data.duration} min</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>Session Type</p>
                  <p>1-on-1</p>
                </div>
              </div>

              <div className="w-full">
                <BookingModal timeSlots={data.days} data={data} />
              </div>

            </div>
            


          </div>

        </div>



        
      </div>

    </div>
  );
}
