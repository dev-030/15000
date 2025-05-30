import { NextResponse } from "next/server";



export async function GET(req: Request, { params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;

    const instructors = [
        {
            id: "1",
            name: "Jamil Hossain",
            title: "Full-stack developer",
            image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
            rate: "৳400/hour",
            rating: 4.9,
            responseTime: "2 hrs",
            mentorSince: "2024",
            field: ["Computer Science", "Software Engineer"],
            teaches: ["C++", "JavaScript", "React", "Next.js"],
            about: "I'm Jamil Hossain, a passionate and driven individual who loves turning ideas into impactful solutions...",
            education: {
            university: "Uttara University, Dhaka",
            degree: "B.Sc in Computer Science and Technology",
            location: "Dhaka, Bangladesh",
            year: 2019,
            },
            experience: [
            {
                title: "Senior Shopify Developer",
                type: "Full-time",
                duration: "Feb 2020 – Present • 4 yrs",
                location: "Dhaka, Bangladesh",
            },
            ],
        },
        {
            id: "2",
            name: "Sarah Lee",
            title: "Front-end Developer",
            image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
            rate: "$80/hour",
            rating: 4.7,
            responseTime: "1 hr",
            mentorSince: "2022",
            field: ["UI/UX", "Frontend"],
            teaches: ["HTML", "CSS", "JavaScript", "React"],
            about: "I specialize in building responsive user interfaces. I love helping others grow in web development.",
            education: {
            university: "Stanford University",
            degree: "B.Sc in Human Computer Interaction",
            location: "California, USA",
            year: 2018,
            },
            experience: [
            {
                title: "React Developer",
                type: "Full-time",
                duration: "Jan 2021 – Present",
                location: "Remote",
            },
            ],
        },
        {
            id: "3",
            name: "Ahmed Khan",
            title: "Data Scientist",
            image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
            rate: "$100/hour",
            rating: 4.8,
            responseTime: "3 hrs",
            mentorSince: "2021",
            field: ["AI", "Machine Learning"],
            teaches: ["Python", "TensorFlow", "Data Analysis"],
            about: "I help students understand complex data problems and guide them through ML projects.",
            education: {
            university: "University of Toronto",
            degree: "M.Sc in Data Science",
            location: "Toronto, Canada",
            year: 2020,
            },
            experience: [
            {
                title: "Machine Learning Engineer",
                type: "Full-time",
                duration: "Mar 2019 – Present",
                location: "Toronto, Canada",
            },
            ],
        },
        {
            id: "4",
            name: "Lina Gomez",
            title: "Mobile App Developer",
            image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
            rate: "$75/hour",
            rating: 4.6,
            responseTime: "30 mins",
            mentorSince: "2023",
            field: ["Mobile", "App Development"],
            teaches: ["Flutter", "Dart", "React Native"],
            about: "I build cross-platform apps and help others learn how to launch their own ideas into real apps.",
            education: {
            university: "University of Barcelona",
            degree: "B.Sc in Software Engineering",
            location: "Barcelona, Spain",
            year: 2017,
            },
            experience: [
            {
                title: "Flutter Developer",
                type: "Full-time",
                duration: "Aug 2020 – Present",
                location: "Barcelona, Spain",
            },
            ],
        },
        {
            id: "5",
            name: "David Kim",
            title: "DevOps Engineer",
            image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
            rate: "$90/hour",
            rating: 4.8,
            responseTime: "1 hr",
            mentorSince: "2020",
            field: ["Cloud", "DevOps"],
            teaches: ["Docker", "Kubernetes", "CI/CD", "AWS"],
            about: "I teach best practices for deploying, monitoring, and scaling modern apps.",
            education: {
            university: "Seoul National University",
            degree: "B.Sc in Computer Science",
            location: "Seoul, South Korea",
            year: 2016,
            },
            experience: [
            {
                title: "DevOps Engineer",
                type: "Full-time",
                duration: "Jan 2018 – Present",
                location: "Seoul, South Korea",
            },
            ],
        }
    ];
      

    const instructor = instructors.find(i => i.id === slug);
    if (!instructor) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.json(instructor);  
  }
  
  // For POST request
  export async function POST(request: Request) {
    const data = await request.json();
  
    // Do something with posted data
    return Response.json({ message: "Instructor created", data });
  }
  