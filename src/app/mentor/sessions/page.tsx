'use client'
import { RescheduleSession, SessionRequestsAccept } from "@/lib/actions/actions";
import { X, CalendarCog, Check } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

// Replace this with your API endpoint
const fetcher = (url) => fetch(url).then(res => res.json());

export default function SessionRequests() {

  const { data, mutate, isLoading } = useSWR('/api/mentor/session-requests', fetcher);

  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState(null);



  const onAccept = async (sessionId:any) => {
    await SessionRequestsAccept(sessionId);
    mutate(); 
  };
  

  const onReschedule = async (sessionId:any) => {
    const val = await RescheduleSession({consultancy_id: sessionId, suggested_time: dateTime});
    if(val?.message === "Suggested time added."){
      mutate(); 
    }
  };

  console.log(data)

  if (isLoading) return <div className="text-center py-20">Loading...</div>;



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        {data?.data.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow">

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
                      onClick={()=> onReschedule(session.id)}
                      >
                        <Check className="w-5 h-5 mr-1" />
                        Request Reschedule
                      </button>
                    </div>
                </div>
              </div>
            }
              

            <div className="p-6 space-y-4">
              
              <div className="">
                <div className="font-medium text-lg flex items-center gap-2">
                  <img src={session.consultancy.thumbnail_url} alt={session.consultancy.title} className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <h1>{session.consultancy.title}</h1>
                    <p className="text-sm text-gray-500">{session.consultancy.description}</p>
                  </div>
                </div>

                <div className="flex gap-6 text-sm text-gray-600 mt-2">
                  <span>৳{session.consultancy.price}</span>
                  <span>{session.consultancy.duration} min</span>
                  <span>
                    {new Date(session.scheduled_at).toLocaleString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit', hour12: true
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={session.student.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={session.student.full_name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{session.student.full_name}</div>
                  <div className="text-xs text-gray-500">@{session.student.username}</div>
                </div>
              </div>
              <div className="border border-slate-300 rounded-md py-4 flex justify-center items-center">
                {session.status === "A" ? (
                  <div className="flex items-center justify-center">
                    <h1 className="text-green-600 font-bold">Accepted session</h1>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center flex-1 cursor-pointer">
                      <X className="w-5 h-5 mr-1" />
                      Decline
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center flex-1 cursor-pointer"
                      onClick={() => setOpen(!open)}>
                      <CalendarCog className="w-5 h-5 mr-1" />
                      Reschedule
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center cursor-pointer"
                      onClick={() => onAccept(session.id)}
                    >
                      <Check className="w-5 h-5 mr-1" />
                      Accept Request
                    </button>
                  </div>
                )}
              </div>
              {/* Optional: Reschedule modal logic here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
