import HomeBanner from "@/components/HomeBanner";
import PopularCourses from "@/components/popularCourses";
import TopMentors from "@/components/TopMentors";



export default function Home() {

  

   const mentors = [
    {
      id: 1,
      name: "Dr. Tanvir Ahmed",
      specialty: "Web Development Expert",
      description: "Former Google engineer with 15+ years of experience in full-stack development.",
      rating: 4.9,
      reviews: 224,
      bgColor: "bg-gradient-to-br from-blue-400 to-purple-600",
      textColor: "text-white"
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      specialty: "UI/UX Design Specialist",
      description: "Award-winning designer with experience at Apple and Adobe. Specializes in user-centered design.",
      rating: 4.8,
      reviews: 187,
      bgColor: "bg-gradient-to-br from-pink-400 to-purple-500",
      textColor: "text-white"
    },
    {
      id: 3,
      name: "Dr. Rafiqul Islam",
      specialty: "Data Science & AI Expert",
      description: "PhD in Computer Science with expertise in machine learning and AI applications.",
      rating: 5.0,
      reviews: 156,
      bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
      textColor: "text-white"
    }
  ];

  return (
    <>

      
      <HomeBanner/>



      <PopularCourses/>
      


      <TopMentors/>


      

     </>
  ); 
}
