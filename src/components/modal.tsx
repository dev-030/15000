'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { BookSchedule } from '@/lib/actions/actions';
import { useClientSession } from '@/context/sessionProvider';
import Link from 'next/link';
import { Calendar, CalendarDays, ClockFading, Globe, User, Video, X } from 'lucide-react';



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
  
  // Get the first and last dates to determine the range
  const firstDate = dayjs(availableDates[0]);
  const lastDate = dayjs(availableDates[availableDates.length - 1]);
  
  // Find the start of the week for the first date
  const startOfWeek = firstDate.startOf('week'); // This will be Sunday
  
  // Find the end of the week for the last date
  const endOfWeek = lastDate.endOf('week'); // This will be Saturday
  
  const grid: Array<{ date: string | null, isAvailable: boolean }> = [];
  const availableDateSet = new Set(availableDates);
  
  // Generate all days from start of first week to end of last week
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



export default function BookingModal({ timeSlots, slug }: { timeSlots: { day_of_week: string, slug: string, time_blocks: { start_time: string }[] }[] , slug:string}) {


  // Important : take this from the server side response
  const numberOfDaysAhead = 3;
  // ---------------------------------------------------

  const [open, setOpen] = useState(!false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const user = useClientSession();
  const [dates, setDates] = useState<string[]>([]);
  const [step, setStep] = useState("select");
  const [note, setNote] = useState("");




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


  useEffect(() => {
    const dayNames = timeSlots.map(slot => slot.day_of_week);
    setDates(getNextWeekdayStrings(dayNames, numberOfDaysAhead)); 
  }, [timeSlots]);


  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, [open]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);


  function getTimeBlocksForDate(date: string): string[] {
    const dayName = getDayOfWeek(date);
    const match = timeSlots.find(slot => slot.day_of_week === dayName);
    return match?.time_blocks.map(tb => tb.start_time) || [];
  }



  


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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4" onClick={() => setOpen(false)}>

            <div className="rounded-xl flex shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-300 ease-out" onClick={e => e.stopPropagation()}>
      
              {/* Left side*/}
              <div className="w-2/5 bg-gradient-to-br from-slate-50 to-slate-50 p-5 border-r border-gray-100">

                <div className="mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" 
                    alt="React Course" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                </div>

                <h2 className="text-base font-semibold text-gray-700 pb-1.5 leading-tight text-left line-clamp-2">
                React Course: Mastering the Basics
                </h2>

                <div className='space-y-4 pt-4.5'>

                  <div className='flex items-center gap-3'>
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="React Course" className="w-9 h-9 rounded-full" />
                    <div className='flex flex-col items-start gap-0.5'>
                      <p className='text-xs text-gray-600'>Mentor</p>
                      <h1 className='text-xs font-medium text-gray-800'>Dr. Jane Smith</h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <ClockFading size={18} className="text-blue-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600">Duration</div>
                      <div className="text-xs font-medium text-gray-800">60 minutes</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <Video size={18} className="text-green-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600">Meet Type</div>
                      <div className="text-xs font-medium text-gray-800">Google Meet</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-[9px] bg-blue-100 rounded-full">
                      <Globe size={18} className="text-purple-600" />
                    </div>
                    <div className='flex flex-col items-start gap-0.5'>
                      <div className="text-xs text-gray-600">Timezone</div>
                      <div className="text-xs font-medium text-gray-800">Asia/Dhaka</div>
                    </div>
                  </div>
              
                </div>

              </div>


              {/* Right side */}
              <div className="w-3/5 p-5 bg-white flex flex-col">
                {step === "select" ? (
                  <>
                    {/* <div className="mb-7">
                      <h3 className="text-xl font-bold text-gray-700 mb-1">Schedule Your Session</h3>
                      <p className="text-gray-600 text-sm">Select your preferred date and time</p>
                    </div> */}

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
                          px-4 py-2 rounded-md font-md transition-all duration-200 flex-1 border-none
                          ${selectedTime 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform cursor-pointer' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
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
                        onClick={() => {
                          BookSchedule({ selectedDate, selectedTime, slug, note });
                          setOpen(false);
                        }}
                        disabled={!note.trim()}
                        className={`
                          px-4 py-2 rounded-md font-md transition-all duration-200 flex-1
                          ${note.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform cursor-pointer' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div> 
        ) : (
          <div>User is not logged in content</div>
        )
      )}

    </>
  );
}



 