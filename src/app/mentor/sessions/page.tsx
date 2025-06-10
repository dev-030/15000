'use client'
import { SessionRequestsAccept } from "@/lib/actions/actions";
import axios from "axios";
import { Clock, DollarSign, X, CalendarDays, MessageCircle, ChevronDown, Calendar, CircleCheck, MessageSquare, Video, Check, CalendarCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";


// Session type definition
type Session = {
  id: string;
  studentName: string;
  studentTitle: string;
  studentAvatar: string;
  sessionType: string;
  sessionIcon: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  message: string;
  status: 'pending' | 'upcoming' | 'completed' | 'cancelled';
  requestedTime: string;
};

// Mock data for sessions
const mockSessions: Session[] = [
  {
    id: '1',
    studentName: 'Sarah Johnson',
    studentTitle: 'Web Development Student',
    studentAvatar: '/avatars/sarah.jpg',
    sessionType: 'Web Development Mentoring',
    sessionIcon: 'web',
    date: 'Oct 15, 2023',
    time: '10:00 AM',
    duration: 60,
    price: 1200,
    message: "Hi, I'm working on a React project and facing issues with state management. I'd like to discuss Redux implementation and best practices for my e-commerce application. Looking forward to your guidance!",
    status: 'pending',
    requestedTime: '2 hours ago'
  },
  {
    id: '2',
    studentName: 'Michael Chen',
    studentTitle: 'JavaScript Beginner',
    studentAvatar: '/avatars/michael.jpg',
    sessionType: 'JavaScript Debugging Help',
    sessionIcon: 'js',
    date: 'Oct 16, 2023',
    time: '3:00 PM',
    duration: 45,
    price: 900,
    message: "I'm struggling with async functions and promises. Need help understanding how to properly handle API calls.",
    status: 'pending',
    requestedTime: '5 hours ago'
  }
];

export default function SessionRequests() {


  const [activeTab, setActiveTab] = useState<'pending' | 'upcoming' | 'completed' | 'cancelled'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState<string | null>(null);

  // Count sessions by status
  const pendingCount = mockSessions.filter(s => s.status === 'pending').length;
  const upcomingCount = 5; // Hardcoded from image
  const completedCount = 12; // Hardcoded from image
  const cancelledCount = 2; // Hardcoded from image

  // Filter sessions based on active tab
  const filteredSessions = mockSessions.filter(session => session.status === activeTab);


  const { data, isLoading } = useSWR("/api/mentor/session-requests", (url: string) =>
    fetch(url).then((res) => res.json()), {
        // suspense: true,
        // fallbackData: [{}],
        // revalidateOnFocus: true,
        // keepPreviousData: true,
    }
  );

  console.log(data, isLoading)

  const router = useRouter();

  
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, [open]);



  const onAccept = async (sessionId:string) => {

    console.log(sessionId)

    const res = await SessionRequestsAccept(sessionId);

    console.log(res);

  }


  console.log(data);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      

       {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
            <Clock className="text-yellow-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Pending Requests</h3>
            <p className="text-lg text-gray-600 font-bold">3</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Calendar className="text-blue-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Upcoming Sessions</h3>
            <p className="text-lg text-gray-600 font-bold">1</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <div className="text-green-500 w-5 h-5"><CircleCheck className="w-5 h-5 text-green-500" /></div>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Completed Sessions</h3>
            <p className="text-lg text-gray-600 font-bold">2</p>
          </div>
        </div>
      </div>


        {/* Tabs */}
      <div className="flex bg-white rounded-lg my-5 shadow">
        
        <button 
          className={`px-5 py-4 text-sm flex items-center ${activeTab === 'pending' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests <span className="ml-2 bg-yellow-100 text-yellow-500 rounded-full px-2 text-xs">{pendingCount}</span>
        </button>
        
        <button 
          className={`px-5 py-4 text-sm flex items-center ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Sessions <span className="ml-2 bg-blue-100 text-blue-800 rounded-full px-2 text-xs">{upcomingCount}</span>
        </button>
        
        <button 
          className={`px-5 py-4 text-sm flex items-center ${activeTab === 'completed' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Sessions <span className="ml-2 bg-green-100 text-green-500 rounded-full px-2 text-xs">{completedCount}</span>
        </button>
        
        <button 
          className={`px-5 py-4 text-sm flex items-center ${activeTab === 'cancelled' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled Sessions <span className="ml-2 bg-red-100 text-red-500 rounded-full px-2 text-xs">{cancelledCount}</span>
        </button>
      </div>



        <div className="space-y-4">
        { data?.data.map((session:any) => (
          <div key={session.id} className="bg-white rounded-lg shadow">
            <div className="p-6 space-y-4">


              <h1>{session.id}</h1>

              {open &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="bg-white p-10 rounded-2xl relative">
                    <div className='absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-700 cursor-pointer rounded-full p-1'
                    onClick={() => {
                      setOpen(false)
                    }}
                    >
                      <X size={17} />
                    </div>
                    <div className="p-4 max-w-sm mx-auto bg-white space-y-4 mb-4">

                        <p className="text-gray-400 pb-1 text-xs">You're about to suggest a new time for your session with Alex Thompson. The student will be notified and can accept or decline your suggestion.</p>

                        <label htmlFor="datetime" className="block text-gray-600 ">
                          Choose Date & Time:
                        </label>

                        <input
                          type="datetime-local"
                          id="datetime"
                          onChange={(e) => setDateTime(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                        />

                        <div className="text-sm text-gray-500 flex flex-col justify-items-start gap-2">
                          <p>
                          Current Date & Time : {new Date(session.scheduled_at).toLocaleString('en-US',{
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                          </p>
                          <p>
                          New Date & Time : {dateTime ? new Date(dateTime).toLocaleString('en-US',{
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          }) : 'None'}
                          </p>
                        </div>

                        <button className={`text-white px-4 py-2 rounded-md flex items-center justify-center  ${!dateTime ? 'bg-blue-400':'bg-blue-600 cursor-pointer hover:bg-blue-700'}`}
                        disabled={!dateTime}
                        onClick={()=>{
                          console.log(dateTime, session.id)
                        }}
                        >
                          <Check className="w-5 h-5 mr-1" />
                          Request Reschedule
                        </button>
                      </div>
                  </div>
                </div>
              }
              

                {/* Student Info */}
                
                {/* <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                    {session.studentAvatar ? (
                        <Image 
                        src='https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740' 
                        alt={session.studentName}
                        width={48}
                        height={48}
                        className="rounded-full"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740`;
                        }}
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                            {session.studentName.charAt(0)}
                        </div>
                    )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{session.studentName}</h3>
                    </div>
                    <div className="flex items-center justify-between gap-1 ml-auto">
                        <span className="bg-yellow-100 text-yellow-500 text-xs px-3 py-1 rounded-full">Pending</span>
                        <p className="text-gray-500 text-xs mt-1">Requested {session.requestedTime}</p>
                    </div>
                </div> */}
              

                {/* Session Details */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">SESSION TITLE</p>
                        <div className="flex items-center gap-2 text-gray-800">
                            <Video className="w-4 h-4" />
                            <p className="text-sm">{session.sessionType}</p>
                        </div>
                        
                    </div>
                    
                    <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">DATE & TIME</p>
                    <div className="flex items-center gap-2 text-gray-800">
                        <Calendar className="w-4 h-4"/>
                        <p className="text-sm">{session.date} • {session.time}</p>
                    </div>
                    </div>
                    
                    <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">DURATION & PRICE</p>
                    <div className="flex items-center gap-2 text-gray-800">
                        <Clock className="w-4 h-4"/>
                        <p className="text-sm">{session.duration} minutes • ৳{(session.price / 100).toFixed(2)}</p>
                    </div>
                    </div>

                </div> */}
              
                {/* Student Message */}
                {/* <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase mb-1">STUDENT'S MESSAGE</p>
                    <p className="text-gray-800 text-sm">{session.message}</p>
                </div> */}
              
                {/* Action Buttons */}


                <div className="border border-slate-300 rounded-md py-4 flex justify-center items-center">

                { session?.status === "A" ? (
                  <div className="flex items-center justify-center">
                    <h1>Accepted session</h1>
                  </div>
                ):(
                  <div className="flex gap-4">
                    
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center flex-1 cursor-pointer">
                      <X className="w-5 h-5 mr-1"/>                     
                      Decline
                    </button>

                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center flex-1 cursor-pointer"
                    onClick={()=> setOpen(!open)}>
                      <CalendarCog className="w-5 h-5 mr-1"/>
                      Reschedule
                    </button>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center cursor-pointer" 
                    onClick={()=>{
                      onAccept(session.id)
                    }}
                    >
                      <Check className="w-5 h-5 mr-1" />
                      Accept Request
                    </button>
            
                  </div>
                )}
                
                </div>

            </div>
          </div>
        ))}

        </div>
        
      

      
    </div>
  );
}
