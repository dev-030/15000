import InstructorDetailsTab from "@/components/InstructorDetailsTab";
import BookingModal from "@/components/modal";
import BookingCalendar from "@/components/scheduler";
import Image from "next/image";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";




export default async function MentorProfile({ params }: { params: Promise<{ slug: string }>}) {

  const { slug } = await params;

  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/gig-detail/?consultancy_id=${slug}`, {
    method: 'GET',
    cache: 'no-cache',
  }).then((res) => res.json());


return(
  <>
    <div className="max-w-7xl mx-auto p-10 space-y-6 border border-gray-200 rounded-lg mt-4">

      <div className="flex gap-12">

        <div className="max-w-80">
          <div className="w-80 h-80 relative">
            <Image src={data.thumbnail_url} alt="anything" fill className="object-cover rounded-lg"  />
          </div>
          <p className="py-9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas alias ducimus atque provident aliquid. Atque odit aliquid minima fuga provident.</p>
          <div className="text-base text-gray-800 font-semibold py-3 space-y-3">
            <p className="flex justify-between items-center">Response rate <span>2hrs</span> </p>
            <p className="flex justify-between items-center">Mentor since <span>2024</span> </p>
          </div>
          <div className="pt-4 space-y-2">
            <h1 className="text-lg font-medium text-gray-500">Field</h1>
            <p className="p-2 bg-slate-100 rounded-lg w-fit text-sm font-semibold text-gray-600">computer science</p>
          </div>
          <div className="pt-4 space-y-2">
            <h1 className="text-lg font-medium text-gray-500">Teaches</h1>
            <p className="p-2 bg-slate-100 rounded-lg w-fit text-sm font-semibold text-gray-600">computer science</p>
          </div>
        </div>

        <div className="flex-2/3">

          <div className="flex justify-between items-center pt-12 border-y-[1px] border-gray-300 pb-16">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-gray-700">Jamil Hossain</h1>
              <p className="text-gray-500">Full-stack developer</p>
              <p>⭐⭐⭐⭐⭐(14)</p>
            </div>
            <div>
              <h1 className="text-xl font-medium">$400/hour</h1>
              <BookingModal timeSlots={data.days} slug={slug}/>
            </div>
          </div>

          <div>

            <div className=" border-b-[1px] border-gray-200 pb-4 mt-10">
              <InstructorDetailsTab data={data}/>
            </div>

              

          </div>





        </div>

      </div>

      {/* <div className="flex gap-6">
        <img src={data.image} alt={data.name} className="w-40 h-40 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p>{data.title}</p>
          <p className="text-yellow-500 font-semibold">⭐ {data.rating}</p>
          <p className="text-xl font-bold">{data.rate}</p>
          <BookingModal/>
        </div>
      </div>  */}

      {/* <div>
        <h3 className="text-lg font-semibold">About</h3>
        <p>{data.about}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Education</h3>
        <p>{data.education.university}, {data.education.degree}</p>
        <p>{data.education.location} • {data.education.year}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Experience</h3>
        {data.experience.map((exp: any, i: number) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{exp.title}</p>
            <p>{exp.type}</p>
            <p>{exp.duration}</p>
            <p>{exp.location}</p>
          </div>
        ))}
      </div> */}
    </div>


    </>
  )
}