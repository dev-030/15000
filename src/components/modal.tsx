'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { BookSchedule } from '@/lib/actions/actions';
import { useClientSession } from '@/context/sessionProvider';
import Link from 'next/link';

export function getNextWeekdayStrings(
  dayStrings: string | string[],
  countPerDay: number = 5
): string[] {
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




export default function BookingModal({ timeSlots, slug }: { timeSlots: { day_of_week: string, slug: string, time_blocks: { start_time: string }[] }[] , slug:string}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const user = useClientSession();
  const [dates, setDates] = useState<string[]>([]);



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
    setDates(getNextWeekdayStrings(dayNames, 3)); // generate 3 dates per weekday
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            {user ? (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left side */}
                <div className="md:w-1/3 space-y-4">
                  <h2 className="text-2xl font-bold">Rick Astley</h2>
                  <p className="text-gray-600">Get Rickrolled</p>
                  <p>Book me and I will never give you up. Cal.com will never let you down. Open Source will never run around and desert you.</p>
                  <p>⏱ 10m</p>
                  <p>🔗 Link meeting</p>
                  <p>🌐 Asia/Dhaka</p>
                </div>

                {/* Right side */}
                <div className="md:w-2/3 space-y-6">
                  {/* Calendar */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {selectedDate ? dayjs(selectedDate).format('MMMM YYYY') : 'Pick a date'}
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.map(date => (
                        <button
                          key={date}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime("");
                          }}
                          className={`p-2 rounded-md text-sm cursor-pointer ${selectedDate === date ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                          {dayjs(date).format('D')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">
                      {selectedDate ? dayjs(selectedDate).format('dddd, MMM D') : 'Select a date'}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedDate &&
                        getTimeBlocksForDate(selectedDate).map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2 rounded-md border cursor-pointer ${selectedTime === slot ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                          >
                            {formatTime12Hour(slot)}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Confirm/Cancel */}
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 border rounded cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        BookSchedule({ selectedDate, selectedTime, slug});
                        setOpen(false);
                      }}
                      disabled={!selectedTime}
                      className={`px-4 py-2 rounded text-white ${selectedTime ? 'bg-black hover:bg-gray-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center'>
                It seems you aren't logged in. Please login to book a session.
                <Link href="/login" className="bg-black text-xl font-semibold text-white px-3 py-2 rounded mt-10">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
