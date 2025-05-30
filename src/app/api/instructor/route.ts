// app/api/instructors/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const instructors = [
    {
      id: 1,
      name: "Jamil Hossain",
      title: "Back-end developer",
      rating: 4.5,
      experience: "4 years of experience",
      sessions: "3 sessions were held",
      skills: "Skilled in React, Typescript, UI/UX",
      availability: "Mon-Fri, 9AM-5PM",
      price: "$100/hour",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      id: 2,
      name: "Sophia Clarke",
      title: "Full-stack engineer",
      rating: 4.8,
      experience: "6 years of experience",
      sessions: "15 sessions were held",
      skills: "Skilled in Node.js, Next.js, GraphQL",
      availability: "Mon-Fri, 10AM-6PM",
      price: "$120/hour",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
      id: 3,
      name: "Carlos Rivera",
      title: "Frontend developer",
      rating: 4.6,
      experience: "5 years of experience",
      sessions: "12 sessions were held",
      skills: "Skilled in Vue, Tailwind CSS, Design Systems",
      availability: "Mon-Sat, 11AM-4PM",
      price: "$90/hour",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    {
      id: 4,
      name: "Emma Stone",
      title: "UX/UI Designer",
      rating: 4.9,
      experience: "7 years of experience",
      sessions: "20 sessions were held",
      skills: "Skilled in Figma, UX Research, Prototyping",
      availability: "Mon-Fri, 8AM-2PM",
      price: "$110/hour",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
    },
    {
      id: 5,
      name: "David Lin",
      title: "Mobile App Developer",
      rating: 4.7,
      experience: "3 years of experience",
      sessions: "10 sessions were held",
      skills: "Skilled in React Native, Flutter, Firebase",
      availability: "Mon-Fri, 2PM-9PM",
      price: "$95/hour",
      image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
    }
  ];
  

  return NextResponse.json(instructors);
}
