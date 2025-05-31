




export default function HomeBanner(){



    return(
        <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white rounded-md ">
        <div className="max-w-7xl mx-auto p-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">

            <div className="space-y-7">
              <h1 className="text-3xl font-bold leading-tight">
                Unlock Your Potential with{' '}
                <span className="block">Expert-Led Courses</span>
              </h1>
              
              <p className="text-sm text-purple-100 leading-relaxed max-w-2xl">
                Join over 50,000 students learning from industry experts. Advance your 
                career with EdCluster's premium courses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <button className="bg-white px-4 py-3 text-purple-600 hover:bg-gray-100  rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Explore Courses
                </button>
                <button className="border-2 px-4 py-3 border-white hover:bg-white hover:text-purple-600  rounded-lg font-semibold transition-all duration-300">
                  Find a Mentor
                </button>
              </div>
              
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-80 shadow-2xl border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <div className="flex-1 h-2 bg-white/20 rounded-full">
                      <div className="w-3/4 h-full bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-3 bg-white/30 rounded-full w-full"></div>
                    <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
                    <div className="h-3 bg-white/20 rounded-full w-3/5"></div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-pink-400 rounded-full opacity-70 animate-bounce"></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
}    