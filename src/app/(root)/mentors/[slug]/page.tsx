// 'use client'
// import InstructorDetailsTab from "@/components/InstructorDetailsTab";
// import BookingCalendar from "@/components/scheduler";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";




// export default function MentorSessionDetails({ params }: { params: Promise<{ slug: string }>}) {

//   // const { slug } = await params;

//   // const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/gig-detail/?consultancy_id=${slug}`, {
//   //   method: 'GET',
//   //   cache: 'no-cache',
//   // }).then((res) => res.json());

//   // console.log(data);

//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
      
//       // Make sticky after scrolling 200px
//       if (scrollPosition > 200) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }

//       // Stop being sticky when near bottom (300px from bottom)
//       if (scrollPosition + windowHeight >= documentHeight - 300) {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   console.log(isSticky);

// return(
//   <>

//     <div className="flex justify-between items-center">
      
//       <div className="w-2/3">
//         <h1 className="text-3xl font-bold text-gray-700">Advanced Web Development Mentoring Session: Master React & Node.js</h1>
//         <div className="flex items-center gap-3 py-5">
//           <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-16 w-16 rounded-full" alt="Mentor Image" />
//           <div className="">
//             <h1 className="text-xl font-bold text-gray-700">Dr. Jane Smith</h1>
//             <p className="text-slate-500 font-medium text-sm">Senior Developer Advocate</p>
//           </div>
//         </div>

//         <div>
//           <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-[30rem] w-1/2" alt="Mentor Image" />
//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">About This Session</h1>
//             <p>Get personalized mentoring from a former Google engineer with 15+ years of experience in full-stack development. This one-on-one session is tailored to help you master advanced web development concepts and accelerate your career growth.</p>
//           </div>
//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">What You'll Learn</h1>
//             <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//             </ul>
//           </div>

//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">Session Format</h1>
//             <p>Each session is conducted via Zoom and includes:</p>
//           </div>
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-gray-700">Session Details</h1>
//         </div>




//         <h1 className="text-3xl font-bold text-gray-700">Advanced Web Development Mentoring Session: Master React & Node.js</h1>
//         <div className="flex items-center gap-3 py-5">
//           <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-16 w-16 rounded-full" alt="Mentor Image" />
//           <div className="">
//             <h1 className="text-xl font-bold text-gray-700">Dr. Jane Smith</h1>
//             <p className="text-slate-500 font-medium text-sm">Senior Developer Advocate</p>
//           </div>
//         </div>

//         <div>
//           <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="h-[30rem] w-1/2" alt="Mentor Image" />
//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">About This Session</h1>
//             <p>Get personalized mentoring from a former Google engineer with 15+ years of experience in full-stack development. This one-on-one session is tailored to help you master advanced web development concepts and accelerate your career growth.</p>
//           </div>
//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">What You'll Learn</h1>
//             <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//               <li>Advanced React concepts including hooks, context API, and Redux</li>
//             </ul>
//           </div>

//           <div className="space-y-2 pt-5">
//             <h1 className="text-2xl font-bold text-gray-700">Session Format</h1>
//             <p>Each session is conducted via Zoom and includes:</p>
//           </div>
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-gray-700">Session Details</h1>
//         </div>



//       </div>

//       <div className="w-1/3 bg-amber-100 sticky">
//           <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque iste ducimus quae modi quas reprehenderit labore nisi rerum voluptatibus esse consequatur neque minima mollitia soluta voluptas nihil praesentium ipsa non temporibus, maiores veritatis nulla vel totam? Ex provident expedita quo, libero commodi placeat magnam doloremque, consequuntur culpa, cum quas!</h1>
//       </div>
      
//     </div>

//   </>
//   )
// }






import React from 'react';
import BookingModal from "@/components/modal";
import { Book } from 'lucide-react';
import { apiService } from '@/lib/actions/api';



export default async function MentorSessionDetails({ params }: { params: Promise<{ slug: string }>}) {

  const { slug } = await params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/gig-detail/?consultancy_id=${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());

  // const response = await apiService.get(`/client/gig-detail/?consultancy_id=${slug}`)


  console.log(data , 'from response 🟢')

  

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-6xl flex flex-col gap-8"> 

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow lg:w-2/3 bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">React Course: Mastering the Basics</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the ultimate React course! In this comprehensive
              program, you'll learn everything from the fundamentals of React
              to advanced concepts like hooks, context API, and routing.
              Whether you're a complete beginner or looking to deepen your
              React knowledge, this course is designed for you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We'll start with setting up your development environment and
              understanding JSX. Then, we'll dive into component-based
              architecture, props, state, and event handling. You'll build
              several mini-projects along the way to solidify your learning.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By the end of this course, you'll be confident in building
              dynamic and responsive single-page applications using React.
              You'll also gain practical experience with popular libraries
              and tools within the React ecosystem.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This course emphasizes hands-on learning, with coding challenges
              and real-world examples that make complex topics easy to
              understand. Get ready to transform your web development skills!
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 1: Introduction to React and JSX. Dive deep into the
              core concepts of React and understand how JSX simplifies UI
              creation. Learn about virtual DOM and reconciliation process.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 2: Component Life Cycle and Hooks. Explore the different
              phases of a component's life and how to manage side effects
              using useEffect. Understand useState, useContext, and useRef.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 3: State Management with Context API. Learn how to manage
              global state efficiently across your application without prop drilling.
              Build a robust context provider and consumer.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 4: React Router for Navigation. Implement client-side routing
              to create multi-page experiences within your single-page application.
              Learn about nested routes and route parameters.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 5: Forms and User Input. Handle user input effectively with
              controlled and uncontrolled components. Implement form validation
              and submission logic.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 6: Working with APIs. Fetch data from external APIs and
              display it in your React application. Learn about asynchronous operations
              and error handling.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 7: Performance Optimization. Discover techniques to optimize
              your React application's performance, including memoization and lazy loading.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 8: Testing React Components. Write unit tests for your React
              components using Jest and React Testing Library to ensure code quality.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Section 9: Deployment. Learn how to deploy your React application
              to production servers like Netlify or Vercel.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This course is continually updated with the latest React features
              and best practices. Join our community for support and collaboration!
            </p>

            
          </div>

          

          <div className="lg:w-1/3 relative"> 
            <div className="bg-white rounded-lg shadow-lg p-6 text-center sticky top-[4.4rem]"> 

              <h3 className="text-3xl font-bold text-gray-800 mb-7">Book Your Session</h3>

              <BookingModal timeSlots={data.days} slug={data.id}/>

            </div>
          </div>

        </div>

        <div className="flex-grow lg:w-full"> 
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About the Instructor</h2>
            <div className="flex items-center gap-6 mt-6">
              <img src="https://via.placeholder.com/100" alt="Instructor" className="rounded-full border-2 border-blue-500" />
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Jane Doe</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Jane is a senior software engineer with over 10 years of experience
                  in web development. She specializes in front-end technologies
                  and has a passion for teaching.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Her expertise includes React, Node.js, and cloud computing.
                  She has trained hundreds of developers and helped them launch
                  successful careers in tech.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Jane is also an active contributor to open-source projects
                  and frequently speaks at tech conferences.
                </p>
              </div>
            </div>
          </div>

          
        </div>

      </div>
    </div>
  );
}

