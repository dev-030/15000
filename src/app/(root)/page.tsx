import HomeBanner from "@/components/HomeBanner";
import PopularCourses from "@/components/popularCourses";
import TopMentors from "@/components/TopMentors";
import { apiService } from "@/lib/actions/api";
import { Suspense } from "react";





export default async function Home() {


  const data = await apiService.get<any>('/client/home/')
  .catch((error) => {
    console.error({"ERROR":error.message});
  })




  return (
    <main>
      
      <HomeBanner/>

      <PopularCourses data={data?.courses}/>

      <TopMentors/>
     
     </main>
  ); 
}
