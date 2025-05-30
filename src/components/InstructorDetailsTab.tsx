'use client'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";



export default function InstructorDetailsTab(data:any) {


    console.log()
    return(
        <div>
            <Tabs className="pb-4 mt-10">
                <TabList className="flex justify-between gap-4 border-b-[1px] border-gray-400 pb-3">
                  <Tab className="cursor-pointer">About</Tab>
                  <Tab className="cursor-pointer">Reviews</Tab>
                  <Tab className="cursor-pointer">Pricing</Tab>
                </TabList>
        
                <TabPanel>
                  <h1 className="text-xl font-bold py-5">About</h1>
                  <p>{data.data.about}</p>
                </TabPanel>
                <TabPanel>
                  <h1 className="text-xl font-bold py-5">Reviews</h1>
                  <p>reviews tab</p>
                </TabPanel>
                <TabPanel>
                  <h1 className="text-xl font-bold py-5">Pricing</h1>
                  <p>about tab</p>
                </TabPanel>
              </Tabs>
        </div>
    )
}