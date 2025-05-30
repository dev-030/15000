import { useState } from 'react';
import { Plus, Video, Upload, X } from 'lucide-react';

const VideoSectionsUI = () => {
  const [sections, setSections] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [activeVideoSection, setActiveVideoSection] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSectionCreate = () => {
    if (sectionName.trim()) {
      setSections([...sections, { id: Date.now(), title: sectionName, videos: [] }]);
      setSectionName('');
      setShowInput(false);
    }
  };

  const handleUploadVideo = (sectionId) => {
    if (videoTitle.trim() && videoFile) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            videos: [...section.videos, { id: Date.now(), title: videoTitle, file: videoFile }]
          };
        }
        return section;
      });
      setSections(updatedSections);
      setVideoTitle('');
      setVideoFile(null);
      setActiveVideoSection(null);
    }
  };

  return (
    <div className="max-w-4xl p-6 ">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">Video Course Manager</h1>
      
      <div className="space-y-6">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">{section.title}</h2>
            </div>
            
            <div className="p-6">
              {section.videos.length > 0 ? (
                <div className="space-y-4">
                  {section.videos.map((video, index) => (
                    <div key={video.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                      <Video className="text-blue-500" size={20} />
                      <h3 className="font-medium text-slate-700">{video.title}</h3>
                      <span className="text-sm text-slate-500 ml-auto">
                        {video.file ? video.file.name : "File uploaded"}
                      </span>
                    </div>
                  ))}
                  
                  {activeVideoSection === section.id ? (
                    <div className="mt-6 p-4 bg-slate-50 rounded-md border border-slate-200">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Video Title</label>
                        <input
                          type="text"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          placeholder="Enter video title"
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Upload Video File</label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 cursor-pointer text-center px-4 py-2 border border-dashed border-slate-300 rounded-md hover:border-blue-500 transition">
                            <div className="flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600">
                              <Upload size={18} />
                              <span>{videoFile ? videoFile.name : "Choose file..."}</span>
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => setVideoFile(e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setActiveVideoSection(null);
                            setVideoTitle('');
                            setVideoFile(null);
                          }}
                          className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUploadVideo(section.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition flex items-center gap-2"
                          disabled={!videoTitle.trim() || !videoFile}
                        >
                          <Upload size={16} />
                          Upload Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setActiveVideoSection(section.id)} 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
                    >
                      <Plus size={16} />
                      Add Another Video
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  {activeVideoSection === section.id ? (
                    <div className="max-w-lg mx-auto">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Video Title</label>
                        <input
                          type="text"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          placeholder="Enter video title"
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Upload Video File</label>
                        <div className="flex items-center gap-2">
                          <label className="flex-1 cursor-pointer text-center px-4 py-2 border border-dashed border-slate-300 rounded-md hover:border-blue-500 transition">
                            <div className="flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600">
                              <Upload size={18} />
                              <span>{videoFile ? videoFile.name : "Choose file..."}</span>
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => setVideoFile(e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setActiveVideoSection(null);
                            setVideoTitle('');
                            setVideoFile(null);
                          }}
                          className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUploadVideo(section.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition flex items-center gap-2"
                          disabled={!videoTitle.trim() || !videoFile}
                        >
                          <Upload size={16} />
                          Upload Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Video className="mx-auto h-12 w-12 text-slate-400" />
                      <h3 className="mt-2 text-sm font-medium text-slate-900">No videos yet</h3>
                      <p className="mt-1 text-sm text-slate-500">Upload your first video to this section</p>
                      <div className="mt-6">
                        <button
                          onClick={() => setActiveVideoSection(section.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        >
                          <Plus className="-ml-1 mr-2 h-5 w-5" />
                          Add Video
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Section UI */}
      {showInput ? (
        <div className="mt-6 bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-slate-800">Create New Section</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="Enter section name"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button 
              onClick={handleSectionCreate}
              disabled={!sectionName.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Section
            </button>
            <button 
              onClick={() => {
                setShowInput(false);
                setSectionName('');
              }}
              className="p-2 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="mt-6 flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 rounded-lg shadow-sm transition"
        >
          <Plus size={18} />
          <span className="font-medium">Add Section</span>
        </button>
      )}
    </div>
  );
};

export default VideoSectionsUI;