'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

const bookingData = {
  instructor: {
    name: "Rick Astley",
    title: "Get Rickrolled",
    description:
      "Book me and I will never give you up. Cal.com will never let you down. Open Source will never run around and desert you.",
    duration: "10m",
    meetingType: "Link meeting",
    timezone: "Asia/Dhaka",
  },
  availableDates: [
    "2025-04-20", "2025-04-21", "2025-04-22", "2025-04-23", "2025-04-24",
    "2025-04-25", "2025-04-26", "2025-04-27", "2025-04-28", "2025-04-29"
  ],
  timeSlots: [
    "2:30pm", "2:40pm", "3:00pm", "3:20pm", "3:30pm", "3:40pm",
    "4:00pm", "4:10pm", "4:20pm"
  ],
};

export default function BookingCalendar() {

  return (
    <div className="flex flex-col md:flex-row p-6 bg-black text-white min-h-screen gap-6">
      {/* Left side */}
      <div className="md:w-1/3 space-y-4">
        <div>
          <h2 className="text-xl font-bold">{bookingData.instructor.name}</h2>
          <p className="text-gray-300">{bookingData.instructor.title}</p>
          <p className="mt-2">{bookingData.instructor.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span>⏱ {bookingData.instructor.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔗 {bookingData.instructor.meetingType}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🌐 {bookingData.instructor.timezone}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="md:w-2/3 flex flex-col gap-6">
        {/* Calendar grid */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {/* April {dayjs(selectedDate).format("YYYY")} */}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {bookingData.availableDates.map((date) => (
              <button
                key={date}
                // onClick={() => setSelectedDate(date)}
                // className={`p-3 rounded-md ${
                  // selectedDate === date ? "bg-white text-black" : "bg-gray-800"
                // }`}
              >
                {dayjs(date).format("D")}
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="overflow-y-auto max-h-72 space-y-2">
          <h4 className="text-lg font-semibold">
            {/* Sat {dayjs(selectedDate).format("D")} */}
            </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {bookingData.timeSlots.map((slot, index) => (
              <button
                key={index}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-md"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
