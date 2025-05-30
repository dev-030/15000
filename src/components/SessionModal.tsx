import { CreateSession } from "@/lib/actions/actions";
import axios from "axios";
import { Clock, DollarSign, Plus, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';



export default function CreateSessionModal({ isOpen, onClose }: CreateSessionModalProps) {


  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [daySlots, setDaySlots] = useState<Record<Day, string[]>>({ Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] });
  const [activeDay, setActiveDay] = useState<Day>('Mon');
  const [currentTime, setCurrentTime] = useState(""); // HH:mm
  const [amPm, setAmPm] = useState("AM");

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    }
  );

  const weekdays: Day[] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  const toggleDay = (day: Day) => {
    setActiveDay(day);
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [day]);  // only one day selected
  };

  const handleTimeChange = (value: string) => {
    setCurrentTime(value);
    const hour = parseInt(value.split(":")[0], 10);
    setAmPm(hour >= 12 ? "PM" : "AM");
  };

  const handlePeriodChange = (period: string) => {
    if (!currentTime) return setAmPm(period);
    let [hour, minute] = currentTime.split(':').map(Number);
    if (period === 'PM' && hour < 12) hour += 12;
    if (period === 'AM' && hour >= 12) hour -= 12;
    setCurrentTime(hour.toString().padStart(2,'0') + ':' + minute.toString().padStart(2,'0'));
    setAmPm(period);
  };

  const addTimeSlot = () => {
    if (!currentTime || !activeDay) return;
    const [hrStr, minStr] = currentTime.split(':');
    let hr = parseInt(hrStr, 10);
    const displayHr = hr % 12 === 0 ? 12 : hr % 12;
    const formatted = `${displayHr}:${minStr} ${amPm}`;
    setDaySlots(prev => ({ ...prev, [activeDay]: [...prev[activeDay], formatted] }));
    setCurrentTime("");
  };

  const removeTimeSlot = (day: Day, idx: number) => {
    setDaySlots(prev => {
      const updated = [...prev[day]];
      updated.splice(idx, 1);
      return { ...prev, [day]: updated };
    });
  };




  const handleSubmit = async(e: any) => {

    e.preventDefault();

    const filteredDays = Object.entries(daySlots)
    .filter(([_, slots]) => slots.length > 0)
    .map(([day, slots]) => ({
        day_of_week: day,
        time_blocks: slots
    }));

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      duration: parseInt(e.target.duration.value, 10),
      price: parseFloat(e.target.price.value),
      days: filteredDays,
      uploaded_thumbnail: imageBase64,
    };
    
    const response = await CreateSession(data);

    if(response === 201) onClose();

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="bg-indigo-600 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-medium">Create New Session</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Core Info */}
            <div>

                 
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                <input type="text" name="title" placeholder="e.g. Web Development Mentoring" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={3} placeholder="Describe your session..." className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <select name="duration" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                  <option value="60">60 minutes</option>
                  <option value="40">40 minutes</option>
                  <option value="20">20 minutes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    ৳
                  </div>
                  <input type="number" name="price" placeholder="e.g. 100" className="w-full border border-gray-300 rounded px-8 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                </div>
              </div>


              <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                 <input 
                  type="file" 
                  accept="image/*" 
                  onChange={async (e) => {
                  const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const base64 = await toBase64(file);
                        setImageBase64(base64);
                      } catch (err) {
                        console.error("Image conversion failed", err);
                      }
                    }
                  }} 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                />
              </div>

              
            </div>
            {/* Right Column: Days & Slots */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {weekdays.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-3 py-1 rounded border cursor-pointer ${selectedDays.includes(day) ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>{day}</button>
                  ))}
                </div>
              </div>

              {selectedDays.includes(activeDay) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Time Slot for {activeDay}</label>

                  <div className="flex gap-2 mb-3">

                    <div className="relative flex-grow">
                      <input type="time" value={currentTime} onChange={e => handleTimeChange(e.target.value)} className="w-full border border-gray-300 rounded px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 pl-10 pr-4 py-2 cursor-pointer" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock size={16} className="text-gray-500" /></div>
                    </div>

                    <select value={amPm} onChange={e => handlePeriodChange(e.target.value)} className="border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-2 py-2 cursor-pointer">
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                    <button type="button" onClick={addTimeSlot} className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded flex items-center cursor-pointer"><Plus size={16} className="mr-1" />Add</button>
                    
                  </div>

                </div>
              )}

              <h3 className="text-sm font-medium text-gray-700 mb-2">Time Slots</h3>
              <div className="border border-gray-200 rounded p-4 max-h-[400px] overflow-auto">
                {Object.entries(daySlots).filter(([day, slots]) => slots.length > 0).map(([day, slots]) => (
                  <div key={day} className="mb-4">
                    <div className="flex justify-between items-center mb-1"><h4 className="text-sm font-semibold text-indigo-600">{day}</h4><button onClick={() => { setDaySlots(prev => ({ ...prev, [day]: [] })); }} className="text-red-500 hover:text-red-700 cursor-pointer"><Trash2 size={14} /></button></div>
                    <div className="flex flex-wrap gap-2">{slots.map((s,i)=><span key={i} className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{s}<button onClick={()=>removeTimeSlot(day as Day,i)} className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"><X size={12}/></button></span>)}</div>
                  </div>
                ))}
                {Object.values(daySlots).every(slots=>slots.length===0) && <div className="text-sm text-gray-500 italic">No time slots added.</div>}
              </div>
            </div>
          </div>
           <div className="flex justify-end mt-6 gap-2">
                <button type="button" onClick={onClose} className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition-all duration-300 cursor-pointer">Cancel</button>
                <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all duration-300 cursor-pointer">Create Session</button>
          </div>
        </form>
      </div>
    </div>
  );
}











// import axios from "axios";
// import { Clock, DollarSign, Plus, X, Trash2 } from "lucide-react";
// import { useState } from "react";

// interface CreateSessionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

// export default function CreateSessionModal({ isOpen, onClose }: CreateSessionModalProps) {
//   const [selectedDays, setSelectedDays] = useState<Day[]>([]);
//   const [daySlots, setDaySlots] = useState<Record<Day, string[]>>({ Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] });
//   const [activeDay, setActiveDay] = useState<Day>('Mon');
//   const [currentTime, setCurrentTime] = useState(""); // HH:mm
//   const [amPm, setAmPm] = useState("AM");

//   const weekdays: Day[] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

//   const toggleDay = (day: Day) => {
//     setActiveDay(day);
//     setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [day]);  // only one day selected
//   };


//   const [imageBase64, setImageBase64] = useState<string | null>(null);

//   const toBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//     }
//   );


//   const handleTimeChange = (value: string) => {
//     setCurrentTime(value);
//     const hour = parseInt(value.split(":")[0], 10);
//     setAmPm(hour >= 12 ? "PM" : "AM");
//   };

//   const handlePeriodChange = (period: string) => {
//     if (!currentTime) return setAmPm(period);
//     let [hour, minute] = currentTime.split(':').map(Number);
//     if (period === 'PM' && hour < 12) hour += 12;
//     if (period === 'AM' && hour >= 12) hour -= 12;
//     setCurrentTime(hour.toString().padStart(2,'0') + ':' + minute.toString().padStart(2,'0'));
//     setAmPm(period);
//   };

//   const addTimeSlot = () => {
//     if (!currentTime || !activeDay) return;
//     const [hrStr, minStr] = currentTime.split(':');
//     let hr = parseInt(hrStr, 10);
//     const displayHr = hr % 12 === 0 ? 12 : hr % 12;
//     const formatted = `${displayHr}:${minStr} ${amPm}`;
//     setDaySlots(prev => ({ ...prev, [activeDay]: [...prev[activeDay], formatted] }));
//     setCurrentTime("");
//   };

//   const removeTimeSlot = (day: Day, idx: number) => {
//     setDaySlots(prev => {
//       const updated = [...prev[day]];
//       updated.splice(idx, 1);
//       return { ...prev, [day]: updated };
//     });
//   };

//   const handleSubmit = async(e: any) => {
//     e.preventDefault();

//     const filteredDays = Object.entries(daySlots)
//       .filter(([_, slots]) => slots.length > 0)
//       .map(([day, slots]) => ({
//         day_of_week: day,
//         time_blocks: slots
//       }));

//     const data = {
//       title: e.target.title.value,
//       description: e.target.description.value,
//       duration: parseInt(e.target.duration.value, 10),
//       price: parseFloat(e.target.price.value),
//       days: filteredDays,
//       image: imageBase64,
//     };

//     console.log(data);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="bg-white rounded-lg w-full max-w-4xl">
//         <div className="bg-indigo-600 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
//           <h2 className="text-lg font-medium">Create New Session</h2>
//           <button onClick={onClose} className="text-white hover:text-gray-200 cursor-pointer">
//             <X size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column: Core Info */}
//             <div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
//                 <input type="text" name="title" placeholder="e.g. Web Development Mentoring" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea name="description" rows={3} placeholder="Describe your session..." className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
//                 <select name="duration" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
//                   <option value="60">60 minutes</option>
//                   <option value="40">40 minutes</option>
//                   <option value="20">20 minutes</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">৳</div>
//                   <input type="number" name="price" placeholder="e.g. 100" className="w-full border border-gray-300 rounded px-8 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={async (e) => {
//                   const file = e.target.files?.[0];
//                     if (file) {
//                       try {
//                         const base64 = await toBase64(file);
//                         setImageBase64(base64);
//                       } catch (err) {
//                         console.error("Image conversion failed", err);
//                       }
//                     }
//                   }} 
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
//                 />
//               </div>
//             </div>

//             {/* Right Column: Days & Slots */}
//             <div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {weekdays.map(day => (
//                     <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-3 py-1 rounded border cursor-pointer ${selectedDays.includes(day) ? 'bg-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}>{day}</button>
//                   ))}
//                 </div>
//               </div>

//               {selectedDays.includes(activeDay) && (
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Add Time Slot for {activeDay}</label>
//                   <div className="flex gap-2 mb-3">
//                     <div className="relative flex-grow">
//                       <input type="time" value={currentTime} onChange={e => handleTimeChange(e.target.value)} className="w-full border border-gray-300 rounded px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 pl-10 pr-4 py-2 cursor-pointer" />
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock size={16} className="text-gray-500" /></div>
//                     </div>
//                     <select value={amPm} onChange={e => handlePeriodChange(e.target.value)} className="border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-2 py-2 cursor-pointer">
//                       <option>AM</option>
//                       <option>PM</option>
//                     </select>
//                     <button type="button" onClick={addTimeSlot} className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded flex items-center cursor-pointer"><Plus size={16} className="mr-1" />Add</button>
//                   </div>
//                 </div>
//               )}

//               <h3 className="text-sm font-medium text-gray-700 mb-2">Time Slots</h3>
//               <div className="border border-gray-200 rounded p-4 max-h-[400px] overflow-auto">
//                 {Object.entries(daySlots).filter(([day, slots]) => slots.length > 0).map(([day, slots]) => (
//                   <div key={day} className="mb-4">
//                     <div className="flex justify-between items-center mb-1">
//                       <h4 className="text-sm font-semibold text-indigo-600">{day}</h4>
//                       <button onClick={() => { setDaySlots(prev => ({ ...prev, [day]: [] })); }} className="text-red-500 hover:text-red-700 cursor-pointer"><Trash2 size={14} /></button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {slots.map((s, i) => (
//                         <span key={i} className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                           {s}
//                           <button onClick={() => removeTimeSlot(day as Day, i)} className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"><X size={12} /></button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//                 {Object.values(daySlots).every(slots => slots.length === 0) && <div className="text-sm text-gray-500 italic">No time slots added.</div>}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6 gap-2">
//             <button type="button" onClick={onClose} className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition-all duration-300 cursor-pointer">Cancel</button>
//             <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all duration-300 cursor-pointer">Create Session</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
