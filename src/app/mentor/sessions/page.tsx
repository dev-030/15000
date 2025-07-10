'use client'
import { AcceptRescheduleTime, RescheduleSession, SessionRequestsAccept } from "@/lib/actions/actions";
import { X, CalendarCog, Check, ArrowRight, AlertCircle, Clock, Ban, CircleX, ClockFading, CircleCheck, Lock, Heading1 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";





export default function SessionRequests() {

  const { data, mutate, isLoading } = useSWR('/api/mentor/session-requests', async(url) =>
    await fetch(url).then((res) => res.json())
  );

  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState(null);

  const router = useRouter();

  const onAccept = async (sessionId:any) => {
    await SessionRequestsAccept(sessionId);
    mutate(); 
  };
  

  const onReschedule = async (sessionId:any) => {
    const val = await RescheduleSession({consultancy_id: sessionId, suggested_time: dateTime});
    
    if(val?.message === "Suggested time added."){
      mutate(); 
      setOpen(false);
    }
  };




  console.log(data);


  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

    const timeRemaining = (targetTime: string) => {
    const now = currentTime;
    const endTime = new Date(targetTime);
    const total = endTime.getTime() - now.getTime();

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


  if (isLoading) return <div className="text-center py-20">Loading...</div>;



  return (
    <div className="p-6 min-h-screen">
      <div className="space-y-4">

        {data?.data.map((session:any) => (
          <div key={session.id} className="bg-white rounded-md border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

            <div className="flex flex-col w-full lg:w-8/12">
              
              <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-50 gap-3 sm:gap-0">

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="h-12 w-12 relative">
                    <img
                      src={session?.consultancy?.thumbnail_url}
                      alt="mentor"
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 font-medium">{session.consultancy.title}</h3>
                  </div>
                </div>


                <div className="flex items-center gap-1 px-2 py-1 text-sm rounded-full border bg-blue-50 border-slate-300 text-blue-500">
                  {session.status === 'R' ? (
                    <>
                      <AlertCircle size={15} />
                      Pending
                    </>
                  ) : session.status === 'S' ? (
                    <>
                      <Clock size={15} />
                      Reschedule
                    </>
                  ) : session.status === 'A' ? (
                    <>
                      <Check size={15} />
                      Accepted
                    </>
                  ) : session.status === 'D' ? (
                    <>
                      <Ban size={15} />
                      Declined
                    </>
                  ) : session.status === 'H' ? (
                    <>
                      <CircleCheck size={15} />
                      Paid and Scheduled
                    </>
                  ) : session.status === 'X' ? (
                    <>
                      <CircleX size={15} />
                      Canceled
                    </>
                  ) : session.status === 'N' ? (
                    <>
                      <ClockFading size={15} />
                      Running
                    </>
                  ) : session.status === 'M' ? (
                    <>
                      <CircleCheck size={15} />
                      Completed
                    </>
                  ) : null}
                </div>


              </div>



              <div className="flex flex-col sm:flex-row items-center justify-between p-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">

                {session.status !== 'S' ? (
                  <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                    <p className="text-gray-500 text-sm">Date</p>
                    <h1 className="text-gray-700">
                      {new Date(session.scheduled_at).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </h1>
                    <p className="text-gray-500 text-sm">
                      {new Date(session.scheduled_at).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                ):(
                  <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                    <p className="text-gray-500 text-sm">From</p>
                    <h1 className="text-gray-700 line-through">
                      {new Date(session.scheduled_at).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </h1>
                    <p className="text-gray-500 text-sm">To</p>
                    <h1 className="text-gray-700">
                      {new Date(session.scheduled_at).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </h1>
                  </div>
                )}

                <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                  <p className="text-gray-500 text-sm">Duration</p>
                  <h1 className="text-gray-700">{session.consultancy.duration} minutes</h1>
                </div>

                <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                  <p className="text-gray-500 text-sm">Fee</p>
                  <h1 className="text-gray-700">{session.consultancy.price} taka</h1>
                </div>
              </div>


              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">

                {session.status === "A" && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-lg text-center">Waiting for the student's payment and confirmation.</h1>
                  </div>
                )}

                {session.status === "S" && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-lg text-center">Waiting for the student's response.</h1>
                  </div>
                )}

                {session.status === "H" && (
                  <div className="flex flex-col md:flex-row  items-center w-full gap-1 text-lg tracking-wide">

                    {timeRemaining(session.scheduled_at).minutes>0 && <h1 className="text-gray-700">Starts In : </h1> }

                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      {timeRemaining(session.scheduled_at).days > 0 && (
                        <div className="space-x-1.5">
                          <span>{timeRemaining(session.scheduled_at).days}</span>
                          <span>d</span>
                        </div>
                      )}
                      {timeRemaining(session.scheduled_at).hours > 0 && (
                        <div className="space-x-1.5">
                          <span>{timeRemaining(session.scheduled_at).hours}</span>
                          <span>hr</span>
                        </div>
                      )}
                      <div>
                        {timeRemaining(session.scheduled_at).minutes > 0 ? (
                          <div className='space-x-1.5'>
                            <span>
                              {timeRemaining(session.scheduled_at).minutes}
                            </span>
                            <span>min</span>
                          </div>
                        ) : (
                          <p>Session started</p>
                        )}
                      </div>
                    </div>

                    <div className="justify-end md:ml-auto">
                      <button onClick={() => window.open(session?.meet_link, '_blank')} disabled={session.meet_link=== null} className={`bg-blue-500  text-white px-4 py-2 rounded-md flex items-center gap-1 ${session.meet_link === null ? "":"cursor-pointer hover:bg-blue-600"} `}>
                        Start Session
                        <ArrowRight size={16}/>
                      </button>
                    </div>
                  </div>
                )}

                {session.status === "X" && (
                  <div className="w-full">
                    <h1 className="text-gray-700 text-lg text-center">Student has cancelled the session reschedule request.</h1>
                  </div>
                )}

                {session.status === "R" && (
                  <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 text-lg tracking-wide">
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center gap-1 justify-center cursor-pointer w-full">
                      <X size={18} />
                      Decline
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center gap-1 justify-center cursor-pointer w-full"
                      onClick={() => setOpen(!open)}>
                      <CalendarCog size={18} />
                      Reschedule
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-1 cursor-pointer w-full"
                      onClick={() => onAccept(session.id)}
                    >
                      <Check size={18} />
                      Accept
                    </button>
                  </div>
                )}


                
              </div>

            </div>


            <div className="flex flex-col justify-between lg:w-4/12 border-t lg:border-t-0 lg:border-l border-slate-200 p-2">
                
              <h1 className="text-lg text-center font-medium text-blue-600 mb-4 uppercase tracking-wide">Student information</h1>

              <div className="flex items-center gap-4">
                <img
                  src={session.student.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={session.student.full_name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-700 font-medium">{session.student.full_name}</div>
                  <div className="text-xs text-gray-500">@{session.student.username}</div>
                </div>
              </div>

              <div className="bg-slate-50 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 text-gray-700 mt-3 p-2 rounded-md mt-full">
               {session.note}
              </div>
              
            </div>


            {open &&
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4">
                <div className="bg-white p-4 pt-10 rounded-2xl relative mx-2 max-w-full">
                  <div className='absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-700 cursor-pointer rounded-full p-1 mx-2'
                  onClick={() => {
                    setOpen(false)
                  }}
                  >
                    <X size={17} />
                  </div>
                  <div className="p-2 max-w-sm flex flex-col mx-auto gap-4 bg-white space-y-4 mb-4">

                      <p className="text-gray-700 pb-1">You're about to suggest a new time for your session with <span className="text-gray-800 font-semibold">{session.student.full_name}</span>. The student will be notified and can accept or decline your suggestion.</p>


                      <div className="space-y-2">

                        <h1 className="text-gray-600">Choose Date & Time:</h1>

                        <input  
                          type="datetime-local"
                          id="time"
                          onChange={(e) => setDateTime(e.target.value)}
                          className="bg-slate-100 p-2 text-lg rounded-md outline-none border border-gray-300 w-full"
                        />

                      </div>

                      

                      <div className=" text-gray-700 flex flex-col justify-items-start gap-2">
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

                      <button className={`text-white px-4 py-2 rounded-md flex gap-2 w-full items-center justify-center mt-full ${!dateTime ? 'bg-blue-400':'bg-blue-600 cursor-pointer hover:bg-blue-700'}`}
                      disabled={!dateTime}
                      onClick={()=> onReschedule(session.id)}
                      >
                        <Check size={19}/>
                        Request Reschedule
                      </button>
                    </div>
                </div>
              </div>
            }

    
          </div>
        ))}
      </div>
    </div>
  );
}


