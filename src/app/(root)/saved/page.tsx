



export default async function Saved() {


    return (
        <div className="flex justify-center min-h-screen">        
            <div className="w-full max-w-6xl flex flex-col gap-8"> 
                <div className="flex flex-col lg:flex-row gap-8">                
                    <div className="flex-grow lg:w-2/3 bg-white rounded-lg shadow-md p-8">                
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Courses</h1>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Browse courses you've saved for later
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You can save courses for later viewing or sharing
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Saved courses will be available for viewing and sharing
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            This feature is currently in beta and subject to change
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}