'use client';
import {
  Clock,
  AlertCircle,
  Lock,
  Check,
  CircleX,
  Ban,
  CircleCheck,
  ClockFading,
} from 'lucide-react';
import { useState, useEffect } from 'react';




export default function BookedSessionsCard({ data }: { data: any }) {
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


  console.log(data.results[0])

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Booked Sessions</h2>
        <p className="text-gray-600 text-sm">View and manage your upcoming sessions</p>
      </div>

      <div className="space-y-3">
        {data?.results?.map((data: any) => (
          <div
            key={data?.id}
            className="bg-white rounded-md border border-slate-200 overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="flex flex-col w-full lg:w-9/12">
              <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-50 gap-3 sm:gap-0">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="h-14 w-14 relative">
                    <img
                      src={data?.mentor_pic}
                      alt="mentor"
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 font-medium">{data?.consultancy_name}</h3>
                    <p className="text-gray-600 text-sm">with {data?.mentor_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 text-sm rounded-full border bg-blue-50 border-slate-300 text-blue-500">
                  {data.status === 'R' ? (
                    <>
                      <AlertCircle size={15} />
                      Pending
                    </>
                  ) : data.status === 'S' ? (
                    <>
                      <Clock size={15} />
                      Reschedule
                    </>
                  ) : data.status === 'A' ? (
                    <>
                      <Check size={15} />
                      Accepted
                    </>
                  ) : data.status === 'D' ? (
                    <>
                      <Ban size={15} />
                      Declined
                    </>
                  ) : data.status === 'H' ? (
                    <>Paid and Scheduled waiting</>
                  ) : data.status === 'X' ? (
                    <>
                      <CircleX size={15} />
                      Canceled
                    </>
                  ) : data.status === 'N' ? (
                    <>
                      <ClockFading size={15} />
                      Running
                    </>
                  ) : data.status === 'M' ? (
                    <>
                      <CircleCheck size={15} />
                      Completed
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between p-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">

                {data.status !== 'S' ? (
                  <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                    <p className="text-gray-500 text-sm">Date</p>
                    <h1 className="text-gray-700">
                      {new Date(data.scheduled_at).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </h1>
                    <p className="text-gray-500 text-sm">
                      {new Date(data.scheduled_at).toLocaleString('en-US', {
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
                      {new Date(data.scheduled_at).toLocaleString('en-US', {
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
                      {new Date(data.scheduled_at).toLocaleString('en-US', {
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
                  <h1 className="text-gray-700">{data?.duration_min} minutes</h1>
                </div>

                <div className="space-y-1 w-full py-2 sm:py-0 sm:px-4">
                  <p className="text-gray-500 text-sm">Fee</p>
                  <h1 className="text-gray-700">{data.price} taka</h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center lg:w-3/12 border-t lg:border-t-0 lg:border-l border-slate-200 p-4">
             
              {['R', 'D', 'X', 'M'].includes(data.status) && (
                <div className="flex justify-center items-center py-5">
                  {
                    ({
                      R: <Lock className="text-blue-500 w-10 h-10" />,
                      D: <Ban className="text-red-500 w-10 h-10" />,
                      X: <CircleX className="text-red-500 w-10 h-10" />,
                      M: <CircleCheck className="text-red-500 w-10 h-10" />,
                    } as const)[data.status as 'R' | 'D' | 'X' | 'M']
                  }
                </div>
              )}

              {data.status === 'S' && (
                <div className="text-center space-y-4">
                  <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    Reschedule Request
                  </p>
                  <p className="text-gray-700 text-base">
                    The mentor has requested to reschedule this session. Do you accept?
                  </p>
                  <div className='flex items-center justify-center gap-2 pt-2 text-sm md:text-base '>
                    <button className='text-gray-600 p-2 hover:bg-slate-100 bg-white border border-slate-400 rounded-md  flex-1/3 cursor-pointer'
                    onClick={()=> console.log("Cancel", data.id)}
                    >Cancel</button>
                    <button className='text-white p-2 bg-blue-500 hover:bg-blue-600 rounded-md  flex-2/3 cursor-pointer font-semibold'
                    onClick={()=> console.log("Accept", data.id)}
                    >Accept</button> 
                  </div>
                </div>
              )}

              {data.status === 'A' && (
                <div className="text-center w-full space-y-1">
                  <p className="text-gray-700 text-sm">Starts in</p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 text-lg tracking-wide">
                    {timeRemaining(data.scheduled_at).days > 0 && (
                      <div className="space-x-1.5">
                        <span>{timeRemaining(data.scheduled_at).days}</span>
                        <span>d</span>
                      </div>
                    )}
                    {timeRemaining(data.scheduled_at).hours > 0 && (
                      <div className="space-x-1.5">
                        <span>{timeRemaining(data.scheduled_at).hours}</span>
                        <span>hr</span>
                      </div>
                    )}
                    <div>
                      {timeRemaining(data.scheduled_at).minutes > 0 ? (
                        <div className='space-x-1.5'>
                          <span>
                            {timeRemaining(data.scheduled_at).minutes}
                          </span>
                          <span>min</span>
                        </div>
                      ) : (
                        <p>Session started</p>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={!data.meet_link}
                    onClick={() => window.open(data.meet_link, '_blank')}
                    className={`text-white p-2 text-sm md:text-base rounded-md mt-2 w-full font-semibold ${
                      data.meet_link
                        ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                        : 'bg-blue-400'
                    }`}
                  >
                    Join Session
                  </button>

                </div>
              )}

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
