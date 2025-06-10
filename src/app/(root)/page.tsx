import HomeBanner from "@/components/HomeBanner";
import PopularCourses from "@/components/popularCourses";
import TopMentors from "@/components/TopMentors";
import { Suspense } from "react";



export default function Home() {


  return (
    <main>
      
      <Suspense fallback={<p>Loading...</p>}>
        <HomeBanner/>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <PopularCourses/>
      </Suspense>


      <Suspense fallback={<p>Loading...</p>}>
        <TopMentors/>
      </Suspense>

      
     </main>
  ); 
}
