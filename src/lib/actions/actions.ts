'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { bookingSchema } from "../schema";
import { apiService } from "./api";
import { auth } from "../auth";



export async function BecomeMentor(data:any){

  const cookie = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/become-mentor/`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  })

  const res = await response.json();

  (await cookies()).set("refresh_token", res.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(process.env.NODE_ENV === 'production' && {
      domain: '.edcluster.com',
    }),
    expires: new Date(Date.now() + 1000 * 60 * res.refresh_token_expires_at)
  });


  (await cookies()).set("access_token", res.access_token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(process.env.NODE_ENV === 'production' && {
      domain: '.edcluster.com',
    }),
    expires: new Date(Date.now() + 1000 * 60 * res.access_token_expires_at) 
  });

  return response.status;

}




export async function BookSchedule({selectedDate, selectedTime, slug, note}:{selectedDate:any, selectedTime:any, slug:string, note:string}){

  const cookie = (await cookies()).get("access_token")?.value;

  const result = bookingSchema.safeParse({ 
    date: selectedDate,
    time: selectedTime,
    slug: slug,
    note: note
  });
 
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/book-consultancy/`,{
    method: 'POST',
    body: JSON.stringify({
      "consultancy_id": slug,
      "selectedDate": selectedDate,
      "selectedTime": selectedTime,
      "note": note
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  }).then((res) => res.json());

}




export async function GetCourses(){

  const courses = [
    {
      "id": 101,
      "title": "React for Beginners",
      "thumbnail_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      "instructor_name": "John Doe"
    },
    {
      "id": 202,
      "title": "Python Crash Course",
      "thumbnail_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      "instructor_name": "Jane Smith"
    },
    {
      "id": 303,
      "title": "Intro to Web Development",
      "thumbnail_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      "instructor_name": "Alex Lee"
    }
  ]
  
  return courses;
}




export async function GetCourseData(courseId:string){


  console.log("from video sidebar call 🔴")

    const course = {
                    "id": "1",
                    "title": "Money Management",
                    "subtitle": "Learn how to save money, create a budget, and invest wisely with industry-expert guidance.",
                    "course_content": {
                      "total_sections": 4,
                      "total_lectures": 32,
                      "total_length": "1h 26m",
                      "sections": [
                        {
                          "title": "Best Habits",
                          "lectures": 5,
                          "length": "8",
                          "videos": [
                            { "id": 1, "title": "Welcome to the course", "length": "1m" },
                            { "id": 2, "title": "What is a habit?", "length": "2m" },
                            { "id": 3, "title": "How to create a habit?", "length": "2m" },
                            { "id": 4, "title": "Habits and their benefits", "length": "2m" }
                          ]
                        },
                        {
                          "title": "Best Practices and Planning",
                          "lectures": 10,
                          "length": "20",
                          "videos": [
                            { "id": 5, "title": "Welcome to the course", "length": "1m" },
                            { "id": 6, "title": "What is a habit?", "length": "2m" },
                            { "id": 7, "title": "How to create a habit?", "length": "2m" },
                            { "id": 8, "title": "Habits and their benefits", "length": "2m" }
                          ]
                        },
                        {
                          "title": "Advanced Budget Strategies",
                          "lectures": 8,
                          "length": "30",
                          "videos": [
                            { "id": 9, "title": "Welcome to the course", "length": "1m" },
                            { "id": 10, "title": "What is a habit?", "length": "2m" },
                            { "id": 11, "title": "How to create a habit?", "length": "2m" },
                            { "id": 12, "title": "Habits and their benefits", "length": "2m" }
                          ]
                        },
                        {
                          "title": "Investment Fundamentals",
                          "lectures": 9,
                          "length": "28",
                          "videos": [
                            { "id": 13, "title": "Welcome to the course", "length": "1m" },
                            { "id": 14, "title": "What is a habit?", "length": "2m" },
                            { "id": 15, "title": "How to create a habit?", "length": "2m" },
                            { "id": 16, "title": "Habits and their benefits", "length": "2m" }
                          ]
                        }
                      ]              
                    },
                    "instructor": {
                      "name": "Jamil Hossain",
                      "title":"Full-stack developer",
                      "avatar_url": "https://example.com/avatars/jamil.jpg",
                      "instructor_rating": 4.5,
                      "total_students": 483920,
                      "total_courses": 16,
                      "bio": "Hi, I'm Jamil Hossain. I’ve trained over half a million students in personal finance and budgeting strategies.",
                    }   
                  }

    return course;

 }




export async function GetVideo(courseId:string, videoId:string){

  console.log("from video call 🟢")



  return {courseId, videoId};
}


export async function CreateCourseData(formData:any){

  const cookie = (await cookies()).get("access_token")?.value;

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/create/`, formData, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  })
  .then((res) => res.data)
  .catch(error => {
    console.error("Upload error:", error.response);
    if(error.response.data.error){
      return error.response.data;
    }
  })

  return res;

}




export async function SessionManagementData(){

  const cookie = (await cookies()).get("access_token")?.value;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/gig-list/`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`
    }
  }).then((res) => res.data)
  
  return res;
}


export async function CreateSession(data:any){

  const cookie = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/create-gig/`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  })

  return res.status;

}


export async function CreateCourseSection(data:any){

  const res = await apiService.post('/course/section/', {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })

  return res;

}


export async function UploadCourseVideo(data:any){

  const res = await apiService.post('/course/add-section-video/' , {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })

  return res;

}



export async function RescheduleSession(data:any){

  const res = await apiService.post('/mentor/new-time/' , {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })

  return res;

}


export async function AcceptRescheduleTime(data:any){
  const res = await apiService.post('/client/accept-suggested-time/', {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })  
  return res;
}


export async function CancelRescheduleRequest(data:any){
  const res = await apiService.post('/client/cancel-scheduled-consultancy/', {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })  
  return res;
}

export async function PayNow(data:any){
  const res = await apiService.post('/client/pay-consultancy/', {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })  
  return res;
}


// export async function SessionRequestsData(){

//   const cookie = (await cookies()).get("access_token")?.value;

//   try {

//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/request-list/`,{
//       method: 'GET',
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": ` Bearer ${cookie}`,
//       },
//     }).then((res) => res.json())

//     return res;

//   } catch (error) {
//     console.log(error)
//   }

// }



export async function SessionRequestsAccept(id:string){

  const cookie = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentor/request-approve/`,{
    method: 'POST',
    body: JSON.stringify({
      "consultancy_id": id
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  }).then((res) => res.json())

  if(res.error){
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/m/api/google/auth/initiate/`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie}`,
      },
    }).then((res) => res.json())

    redirect(res2.auth_url)

  }


  return res;

}



export async function BuyCourse(data:any){

  const res = await apiService.post('/payment/course-pay/', {
    requiresAuth: true,
    body: JSON.stringify(data)
  }).catch((error)=> {
    console.log(error)
  })

  if(res?.msg==="payment successfull"){
    redirect(`/my-courses/${data.course_id}`)
  }

}


export async function IsProfileComplete(){

  const res = await apiService.get('/mentor/is-profile-complete/', {
    requiresAuth: true,
  }).catch((error)=> {
    console.log(error)
  })

  console.log(res)

  return res;

}



export async function UpdateProfile(data:any){


  const cookie = (await cookies()).get("access_token")?.value;
  const session = await auth()
  const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/user-profile/${session?.user.username}/`, {'about':data.bio} , {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${cookie}`,
    },
  })
  .then((res) => res.data)
  .catch(error => {
    console.error("Upload error:", error.response);
    if(error.response.data.error){
      return error.response.data;
    }
  })

  return res;

}



export async function DeleteCourseSection(sectionId: string) {
  const res = await apiService.delete(`/course/section/${sectionId}/`,{
    requiresAuth: true,
  })
  .catch(error => {
    console.error("Delete error:", error);
  })

  return res;
}


export async function UpdateCourseSection(sectionId: string, data:any) {

  const res = await apiService.patch(`/course/section/${sectionId}/`, data, {
    requiresAuth: true,
  })
  .catch(error => {
    console.error("Delete error:", error);
  })

  return res;
}






export async function UpdateSession(data:any){
  
  const res = await apiService.patch(`/mentor/update-gig/`, data, {
    requiresAuth: true,
  }).catch(error => {
    console.error("Upload error:", error);
  })


  return res;
}