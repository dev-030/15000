'use client'
import { time } from 'console';
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


// interface Session {
//   id: number;
//   mentorName: string;
//   topic: string;
//   scheduledTime: string; // ISO string
//   duration: number; // in minutes
//   status: 'pending' | 'accepted' | 'cancelled' | 'completed';
//   imageUrl: string;
// }

// interface StatusBadgeProps {
//   status: Session['status'];
// }

// interface CountdownTimerProps {
//   targetDate: string;
//   onTimeReached?: () => void;
// }

// interface SessionCardProps {
//   session: Session;
// }

// interface FilterTabsProps {
//   activeFilter: string;
//   setActiveFilter: (filter: string) => void;
// }

// // Mock data - replace with API data in real app
// const MOCK_SESSIONS: Session[] = [
//   {
//     id: 1,
//     mentorName: 'Dr. Jane Smith',
//     topic: 'Career Guidance in Tech',
//     scheduledTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
//     duration: 60,
//     status: 'accepted',
//     imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
//   },
//   {
//     id: 2,
//     mentorName: 'Prof. Robert Chen',
//     topic: 'Machine Learning Fundamentals',
//     scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
//     duration: 45,
//     status: 'pending',
//     imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
//   },
//   {
//     id: 3,
//     mentorName: 'Lisa Johnson',
//     topic: 'UX Design Portfolio Review',
//     scheduledTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
//     duration: 30,
//     status: 'completed',
//     imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
//   },
//   {
//     id: 4,
//     mentorName: 'Michael Patel',
//     topic: 'Startup Funding Strategies',
//     scheduledTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
//     duration: 60,
//     status: 'cancelled',
//     imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
//   },
// ];

// // Status badge component
// const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
//   const statusConfig: Record<Session['status'], { color: string; icon: React.ReactNode }> = {
//     pending: { color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle size={16} className="mr-1" /> },
//     accepted: { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} className="mr-1" /> },
//     cancelled: { color: 'bg-red-100 text-red-800', icon: <XCircle size={16} className="mr-1" /> },
//     completed: { color: 'bg-blue-100 text-blue-800', icon: <CheckCircle size={16} className="mr-1" /> },
//   };
//   const { color, icon } = statusConfig[status] || statusConfig.pending;

//   return (
//     <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
//       {icon}
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// // Countdown timer component
// const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate, onTimeReached }) => {
//   const calculateTimeLeft = () => {
//     const diff = new Date(targetDate).getTime() - Date.now();
//     if (diff <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0, isReached: true };
//     }
//     return {
//       days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((diff / 1000 / 60) % 60),
//       seconds: Math.floor((diff / 1000) % 60),
//       isReached: false,
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const updated = calculateTimeLeft();
//       setTimeLeft(updated);
//       if (updated.isReached) {
//         clearInterval(timer);
//         onTimeReached?.();
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [targetDate, onTimeReached]);

//   if (timeLeft.days > 0) {
//     return (
//       <div className="text-sm font-medium">
//         {timeLeft.days}d {timeLeft.hours}h until session
//       </div>
//     );
//   }

//   const hh = String(timeLeft.hours).padStart(2, '0');
//   const mm = String(timeLeft.minutes).padStart(2, '0');
//   const ss = String(timeLeft.seconds).padStart(2, '0');

//   return (
//     <div className="text-sm font-medium">
//       {hh}:{mm}:{ss} until session
//     </div>
//   );
// };

// Session card component
export default function BookedSessionsCard ({data}:{data:any}) {
    







  const router = useRouter();






  // fix booked sessions card implement all the features in it. also from the mentor implement the rescheduling 
  // feature and also make it work from the client also. also make the data update automatically when mentor accepts
  // send an notification to the user when mentor accepts it
  // make the mentor dashboard functions fully functional also the details page needs more data so add options to add them from the mentors dashboard. 
  // add input field when booking a new session
















    console.log(data.results)

    const timeRemaining = (targetTime: string) => {
      const now = new Date(); // Local time
      const endTime = new Date(targetTime); // Parsed from input (ISO 8601 with timezone)

      const total = endTime.getTime() - now.getTime(); // milliseconds difference

      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };

    };

    const formatDate = (dateStr: string, timeZone?: string): string =>
      new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...(timeZone ? { timeZone } : {}),
    });


  return (
    <div>


      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Booked Sessions</h2>
        <p className="text-gray-600 text-sm">View and manage your upcoming sessions</p>
      </div>



      {data?.results?.map((data:any)=>(
        <div key={data?.id} className="bg-white rounded-lg shadow p-6 mb-3">

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
                <div className='h-20 w-20 relative'>
                    <Image
                        src={data?.mentor_pic}
                        alt={'image'}
                        fill
                        className="rounded-full mr-4 object-cover"
                    />
                </div>
              
              <div>
                <h3 className="text-lg font-semibold">{data?.consultancy_name}</h3>
                <p className="text-gray-600">with {data?.mentor_name}</p>
              </div>
            </div>
            <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium text-yellow-800 bg-yellow-100`}>
                <AlertCircle size={16} className="mr-1"/>
                Pending
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span>{formatDate(data.scheduled_at)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} />
              <span>{data?.duration_min} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>৳</span>
              <span>{data?.duration_min} taka</span>
            </div>             

          </div>

          <div className="mt-4 border px-10 border-slate-300 rounded-md py-4 flex justify-between items-center">
            {data.status === 'A' ? (
              <>

                <h1>Accepted session</h1>

                <button onClick={()=>router.push(data?.meet_link)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center cursor-pointer'>
                  <ArrowRight size={16} className="ml-2" />
                  Join Session
                </button>
                
              </>
            ) : data.status === 'R' ? (
              <div className="text-yellow-600 italic w-full text-center">Waiting for mentor approval</div>
            ) : data.status === 'cancelled' ? (
              <div className="text-red-600 italic w-full text-center">This session was cancelled</div>
            ) : data.status === 'completed' ? (
              <div className="w-full flex justify-between">
                <span className="italic text-gray-600">Session completed</span>
                <button className="text-blue-500 hover:text-blue-700">Leave Feedback</button>
              </div>
            ) : null}
          </div>

        </div>
      ))}

      


      {/* <div className="mt-4 border-t pt-4 flex justify-between items-center">
        {session.status === 'accepted' && !isPast ? (
          <>
            <CountdownTimer
              targetDate={session.scheduledTime}
              onTimeReached={() => setJoinEnabled(true)}
            />
            <button
              onClick={handleJoin}
              disabled={!joinEnabled}
              className={`${joinEnabled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} flex items-center px-4 py-2 rounded`}
            >
              Join Session <ArrowRight size={16} className="ml-2" />
            </button>
          </>
        ) : session.status === 'pending' ? (
          <div className="text-yellow-600 italic w-full text-center">Waiting for mentor approval</div>
        ) : session.status === 'cancelled' ? (
          <div className="text-red-600 italic w-full text-center">This session was cancelled</div>
        ) : session.status === 'completed' ? (
          <div className="w-full flex justify-between">
            <span className="italic text-gray-600">Session completed</span>
            <button className="text-blue-500 hover:text-blue-700">Leave Feedback</button>
          </div>
        ) : null}
      </div> */}

    </div>
  );
};



// // Filter tabs component
// const FilterTabs: FC<FilterTabsProps> = ({ activeFilter, setActiveFilter }) => {
//   const filters = [
//     { key: 'all', label: 'All Sessions' },
//     { key: 'upcoming', label: 'Upcoming' },
//     { key: 'pending', label: 'Pending' },
//     { key: 'completed', label: 'Completed' },
//     { key: 'cancelled', label: 'Cancelled' },
//   ];

//   return (
//     <div className="flex mb-6 border-b">
//       {filters.map((filter) => (
//         <button
//           key={filter.key}
//           className={`py-2 px-4 mr-2 ${
//             activeFilter === filter.key
//               ? 'border-blue-500 text-blue-500 border-b-2 font-medium'
//               : 'text-gray-500 hover:text-gray-700'
//           }`}
//           onClick={() => setActiveFilter(filter.key)}
//         >
//           {filter.label}
//         </button>
//       ))}
//     </div>
//   );
// };



{/* <div className="">
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => <SessionCard key={s.id} session={s} />)
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No sessions found</h3>
            <p className="text-gray-500">
              {activeFilter === 'all'
                ? "You haven't booked any sessions yet."
                : `You don't have any ${activeFilter} sessions.`}
            </p>
          </div>
        )}
      </div> */}