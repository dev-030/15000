import { NextResponse } from "next/server";




export async function GET() {
    const courseData = [
        {
          id: 1,
          title: "Learn UI/UX Design in a Weekend",
          instructor: "Jesse Showalter",
          description: "Get ready to dive into the world of User Interface (UI) and User Experience (UX) Design",
          price: 24.99,
          rating: 4.1,
          reviews: 146,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Udemy UI/UX course
          bgColor: "bg-purple-600"
        },
        {
          id: 2,
          title: "JavaScript Fundamentals for Beginners",
          instructor: "Sarah Johnson",
          description: "Master the basics of JavaScript programming with practical exercises",
          price: 19.99,
          rating: 4.7,
          reviews: 312,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Codecademy JS course
          bgColor: "bg-blue-500"
        },
        {
          id: 3,
          title: "React.js: Build Modern Web Applications",
          instructor: "Michael Chen",
          description: "Learn to create interactive user interfaces with the popular React framework",
          price: 29.99,
          rating: 4.8,
          reviews: 248,
          image: "https://img-c.udemycdn.com/course/480x270/1906852_93c6.jpg", // Udemy React course
          bgColor: "bg-cyan-500"
        },
        {
          id: 4,
          title: "Graphic Design Masterclass",
          instructor: "Emma Rodriguez",
          description: "From beginner to professional - learn all aspects of graphic design",
          price: 34.99,
          rating: 4.5,
          reviews: 189,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Udemy Graphic Design Masterclass
          bgColor: "bg-pink-500"
        },
        {
          id: 5,
          title: "Python for Data Science",
          instructor: "Alex Taylor",
          description: "Learn Python programming for data analysis and visualization",
          price: 27.99,
          rating: 4.6,
          reviews: 273,
          image: "https://img-c.udemycdn.com/course/480x270/1203374_6d6f_2.jpg", // Udemy Python for Data Science
          bgColor: "bg-yellow-500"
        },
        {
          id: 6,
          title: "Digital Marketing Essentials",
          instructor: "Olivia Williams",
          description: "Master SEO, social media, and content marketing strategies",
          price: 22.99,
          rating: 4.3,
          reviews: 157,
          image: "https://img-c.udemycdn.com/course/480x270/914296_3670_8.jpg", // Udemy Digital Marketing
          bgColor: "bg-green-500"
        },
        {
          id: 7,
          title: "Responsive Web Design",
          instructor: "Daniel Brown",
          description: "Create websites that look great on any device",
          price: 18.99,
          rating: 4.4,
          reviews: 203,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Udemy Responsive Web Design
          bgColor: "bg-indigo-500"
        },
        {
          id: 8,
          title: "Adobe Photoshop from Zero to Hero",
          instructor: "Sophia Garcia",
          description: "Master photo editing and digital art with Adobe Photoshop",
          price: 31.99,
          rating: 4.2,
          reviews: 176,
          image: "https://img-c.udemycdn.com/course/480x270/1203374_6d6f_2.jpg", // Udemy Photoshop Zero to Hero
          bgColor: "bg-teal-500"
        },
        {
          id: 9,
          title: "Full Stack Web Development",
          instructor: "David Wilson",
          description: "Learn both frontend and backend development with modern technologies",
          price: 39.99,
          rating: 4.9,
          reviews: 328,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Udemy Full Stack Web Development
          bgColor: "bg-red-500"
        },
        {
          id: 10,
          title: "Mobile App Design with Figma",
          instructor: "Natalie Parker",
          description: "Design beautiful and functional mobile applications using Figma",
          price: 26.99,
          rating: 4.5,
          reviews: 192,
          image: "https://img-c.udemycdn.com/course/480x270/1561458_7f3b_2.jpg", // Udemy Figma Mobile App Design
          bgColor: "bg-violet-500"
        }
    ];
      

    return NextResponse.json(courseData);
}