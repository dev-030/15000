'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { BookSchedule } from '@/lib/actions/actions';
import { useClientSession } from '@/context/sessionProvider';
import { ArrowRight, CalendarDays, Check, ClockFading, Globe, Video, X } from 'lucide-react';
import { date, z } from 'zod';
import { useRouter } from 'next/navigation';
import { bookingSchema } from '@/lib/schema';


export function getNextWeekdayStrings( dayStrings: string | string[], countPerDay: number = 5): string[] {

  const dayToNumber: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const targets = Array.isArray(dayStrings)
    ? dayStrings.map(d => dayToNumber[d])
    : [dayToNumber[dayStrings]];
  const today = new Date();
  const results: string[] = [];
  const counts: Record<number, number> = {};

  for (const t of targets) {
    counts[t] = 0;
  }

  for (let i = 0; Object.values(counts).some(c => c < countPerDay); i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayNum = d.getDay();

    if (targets.includes(dayNum) && counts[dayNum] < countPerDay) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      results.push(`${yyyy}-${mm}-${dd}`);
      counts[dayNum]++;
    }
  }

  return results;
}



function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
}



function generateCalendarGrid(availableDates: string[]): Array<{ date: string | null, isAvailable: boolean }> {
  if (availableDates.length === 0) return [];
  
  const firstDate = dayjs(availableDates[0]);
  const lastDate = dayjs(availableDates[availableDates.length - 1]);
  
  const startOfWeek = firstDate.startOf('week'); 
  
  const endOfWeek = lastDate.endOf('week'); 
  
  const grid: Array<{ date: string | null, isAvailable: boolean }> = [];
  const availableDateSet = new Set(availableDates);
  
  let currentDate = startOfWeek;
  while (currentDate.isBefore(endOfWeek) || currentDate.isSame(endOfWeek, 'day')) {
    const dateString = currentDate.format('YYYY-MM-DD');
    const isAvailable = availableDateSet.has(dateString);
    
    grid.push({
      date: dateString,
      isAvailable
    });
    
    currentDate = currentDate.add(1, 'day');
  }
  
  return grid;
}




export default function BookingModal({ timeSlots, data }: { timeSlots: { day_of_week: string, slug: string, time_blocks: { start_time: string }[] }[] , data:any}) {


  // Important : take this from the server side response
  const numberOfDaysAhead = 3;
  // ---------------------------------------------------

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const user = useClientSession();
  const [dates, setDates] = useState<string[]>([]);
  const [step, setStep] = useState("select" as "select" | "input" | "confirmed");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  function formatTime12Hour(time: string): string {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  const formattedTime = () => {
    const date = new Date(selectedDate + " " + selectedTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }


  useEffect(() => {
    if (timeSlots && timeSlots.length > 0) {
      const dayNames = timeSlots.map(slot => slot.day_of_week);
      setDates(getNextWeekdayStrings(dayNames, numberOfDaysAhead));
    }
  }, [timeSlots]);






  function getTimeBlocksForDate(date: string): string[] {
    const dayName = getDayOfWeek(date);
    const match = timeSlots.find(slot => slot.day_of_week === dayName);
    return match?.time_blocks.map(tb => tb.start_time) || [];
  }




  const handleSubmit = async() => {

    setLoading(true);

    const result = bookingSchema.safeParse({
      date: selectedDate,
      time: selectedTime,
      slug: data.id,
      note: note
    })

    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message).join("\n");
      alert(errorMessages); 
      return;
    }

    BookSchedule({ selectedDate, selectedTime, slug: data.id, note }).then((res) => {
      console.log(res);
      setStep("confirmed");
    }).catch((error) => {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }).finally(() => {
      setLoading(false);
    });

  }



  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, [open]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      };
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);


  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded cursor-pointer"
        >
          Schedule Meeting
        </button>
      )}

      {open && (
        user ? (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">

            <div className="rounded-xl flex flex-col md:flex-row shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-300 ease-out" onClick={e => e.stopPropagation()}>

              <div className='absolute top-3.5 right-3.5 border border-gray-400 text-gray-800 hover:text-white hover:bg-blue-600 hover:border-blue-600 cursor-pointer rounded-full p-1'
              onClick={() => {
                setOpen(false)
                setStep("select");
                setSelectedDate(null);
                setSelectedTime("");
                setNote("");
              }} 
              >
                <X size={16} />
              </div>
              
      
              {/* Left side*/}
              <div className="hidden md:block w-0 md:w-2/5 bg-gradient-to-br from-slate-50 to-slate-50 p-5 border-r border-gray-100">

                <div className="mb-3">
                  <img 
                    src={data.thumbnail_url} 
                    alt={data.title}
                    className="w-full h-48 object-cover rounded-md" 
                  />
                </div>

                <h2 className="text-base font-semibold text-gray-700 pb-1.5 leading-tight text-left line-clamp-2">
                  {data.title}
                </h2>

                <div className='space-y-4 pt-4.5'>

                  <div className='flex items-center gap-3'>
                    <img src={data?.mentor?.profile_pic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="React Course" className="w-9 h-9 rounded-full" />
                    <div className='flex flex-col items-start gap-0.5'>
                      <p className='text-xs text-gray-600 font-medium'>Mentor</p>
                      <h1 className='text-xs font-medium text-gray-800'>{data.mentor.full_name}</h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <ClockFading size={18} className="text-blue-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600 font-medium">Duration</div>
                      <div className="text-xs font-medium text-gray-800">{data.duration} minutes</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <Video size={18} className="text-green-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600 font-medium">Meet Type</div>
                      <div className="text-xs font-medium text-gray-800">Google Meet</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <Globe size={18} className="text-purple-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600 font-medium">Timezone</div>
                      <div className="text-xs font-medium text-gray-800">Asia/Dhaka</div>
                    </div>
                  </div>
              
                </div>

              </div>


              {/* Right side */}
              <div className="w-full md:w-3/5 p-5 bg-white flex flex-col">
                {step === "select" && (
                  <>
                    {/* Calendar UI */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarDays size={17} className="text-gray-700" />
                        <h4 className="text-sm font-semibold text-gray-700">
                          {selectedDate ? dayjs(selectedDate).format('MMMM YYYY') : 'Pick a date'}
                        </h4>
                      </div>
  
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                      </div>
  
                      <div className="grid grid-cols-7 gap-2">
                        {generateCalendarGrid(dates).map((day, index) => {

                          if (!day.date) {
                            return <div key={index} className="p-2"></div>; 
                          }
                          
                          const isSelected = selectedDate === day.date;
                          const isToday = dayjs(day.date).isSame(dayjs(), 'day');
                          const isAvailable = day.isAvailable;
                          
                          return (
                            <button
                              key={day.date}
                              onClick={() => {
                                if (isAvailable) {
                                  setSelectedDate(day.date);
                                  setSelectedTime("");
                                }
                              }}
                              disabled={!isAvailable}
                              className={`
                                relative p-2 rounded-md text-sm font-medium transition-all duration-200 border 
                                ${!isAvailable 
                                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-none' 
                                  : isSelected 
                                    ? 'text-blue-600 bg-blue-100 border-blue-400 transform scale-105 cursor-pointer' 
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:scale-105 cursor-pointer'
                                }
                                ${isToday && !isSelected && isAvailable ? '' : ''}
                              `}
                            >
                              {dayjs(day.date).format('D')}
                              {isToday && isAvailable && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Selection */}
                    {selectedDate && (
                      <div className="mb-2">

                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Available times for {dayjs(selectedDate).format('dddd, MMM D')}
                        </h4>

                        <div className="max-h-50 overflow-y-auto p-0.5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {getTimeBlocksForDate(selectedDate).map(slot => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  className={`
                                      text-sm p-2 rounded-md font-medium transition-all duration-200 hover:scale-105 cursor-pointer border         
                                      ${isSelected 
                                      ? 'text-blue-600 bg-blue-100 border-blue-400 transform scale-105' 
                                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }
                                  `}
                                >
                                  {formatTime12Hour(slot)}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">

                      <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:text-red-500 hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-pointer"
                      onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>

                      <button
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep("input")}
                        className={`
                          px-4 py-2 rounded-md font-md transition-all duration-200 flex-1 border flex items-center justify-center gap-2 relative 
                          ${selectedTime 
                            ? 'text-white bg-blue-600 hover:bg-blue-700 transform group cursor-pointer' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed border-none'
                          }
                        `}
                      >
                        <span className='relative z-10'>Next</span>
                        <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />

                      </button>
                    </div>
                  </>
                )} 

                {step === "input" && (
                  <>
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Tell us more</h3>
                    <p className="text-sm text-gray-600 mb-2">Add any notes or details for this session:</p>

                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={8}
                      placeholder="Type your message here..."
                      className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 outline-none mb-4 focus:border-gray-400"
                    />

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button onClick={() => setStep("select")}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        onClick={handleSubmit}
                        disabled={!note.trim()}
                        className={`
                          px-4 py-2 rounded-md font-md transition-all duration-200 flex-1 flex items-center justify-center gap-2
                          ${note.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform cursor-pointer' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        
                        <span>Confirm Booking</span>
                        {loading && <div className="w-3.5 h-3.5 border-2 border-white border-l-transparent rounded-full animate-spin" />}    

                      </button>
                    </div>
                  </>
                )}

                {step === "confirmed" && (
                  <div className='flex flex-col items-center justify-center gap-2 h-full'>

                     <div className="p-[13px] text-green-600 bg-green-100 rounded-full">
                      <Check />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-600 text-sm">Your session has been scheduled for:</p>
                    <p className='text-sm text-gray-700 font-bold'>{formattedTime()}</p>

                    <p className='text-xs text-gray-400 pt-4'>A confirmation email has been sent to your inbox.</p>

                    <button className='mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer'
                    onClick={()=>{
                      setOpen(false);
                      setStep("select");
                      setSelectedDate(null);
                      setSelectedTime("");
                      setNote("");
                      router.push('/sessions');
                    }}>
                      Done
                    </button>

                  </div>
                )}

              </div>
            </div>
          </div> 
        ) : (
          <div>
            <h1 className='text-lg font-semibold mb-2'>Please Sign In to book a session</h1>
            <button onClick={()=> router.push('/login')} className="group px-4 py-2 flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-3xl font-medium overflow-hidden relative border border-blue-600">
              <span className="relative z-10">Sign In</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        )
      )}

    </>
  );
}