'use client'
import { useState } from 'react';
import { Plus, Video, Upload, X, Delete, Trash, Trash2, PencilLine, Check } from 'lucide-react';
import { CreateCourseSection, DeleteCourseSection, UpdateCourseSection, UploadCourseVideo } from '@/lib/actions/actions';
import * as tus from 'tus-js-client';

interface UploadState {
  id: string;
  sectionId: string;
  title: string;
  file: File;
  progress: number;
  isUploading: boolean;
  tusUpload: any;
}

interface VideoFormState {
  sectionId: string;
  title: string;
  file: File | null;
}

const VideoSectionsUI = ({courseId, data}:{courseId:string, data:any}) => {
  const [sections, setSections] = useState(data?.sections || []);
  const [showInput, setShowInput] = useState(false);
  const [sectionName, setSectionName] = useState('');
  const [activeVideoForms, setActiveVideoForms] = useState<string[]>([]);
  const [videoForms, setVideoForms] = useState<Record<string, VideoFormState>>({});
  const [uploads, setUploads] = useState<Record<string, UploadState>>({});
  const [loading, setLoading] = useState(false);

  const handleSectionCreate = async() => {
    if (sectionName.trim()) {
      const response = await CreateCourseSection({
        course: courseId,
        section_name: sectionName
      });

      if(response){
        setSections([...sections, { id: response.id, section_name: response.section_name, videos: [] }]);
        setSectionName('');
        setShowInput(false);
      }
    }
  };

  const openVideoForm = (sectionId: string) => {
    setActiveVideoForms(prev => [...prev, sectionId]);
    setVideoForms(prev => ({
      ...prev,
      [sectionId]: { sectionId, title: '', file: null }
    }));
  };

  const closeVideoForm = (sectionId: string) => {
    setActiveVideoForms(prev => prev.filter(id => id !== sectionId));
    setVideoForms(prev => {
      const newForms = { ...prev };
      delete newForms[sectionId];
      return newForms;
    });
  };

  const updateVideoForm = (sectionId: string, field: 'title' | 'file', value: string | File) => {
    setVideoForms(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }));
  };

  const generateUploadId = () => {
    return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${Math.floor(Math.random() * 10000)}`;
  };

  const handleUploadVideo = async(sectionId: string) => {
    const form = videoForms[sectionId];
    if (!form?.title.trim() || !form?.file) return;

    const uploadId = generateUploadId();
    
    // Create upload state
    setUploads(prev => ({
      ...prev,
      [uploadId]: {
        id: uploadId,
        sectionId: sectionId,
        title: form.title,
        file: form.file,
        progress: 0,
        isUploading: true,
        tusUpload: null
      }
    }));

    // Clear the form
    closeVideoForm(sectionId);

    setLoading(true);

    try {
      const res = await UploadCourseVideo({
        video_title: form.title,
        section_id: sectionId,
      });

      if (res) {
        // Update upload state with API response
        setUploads(prev => ({
          ...prev,
          [uploadId]: {
            ...prev[uploadId],
            progress: 0,
            isUploading: true
          }
        }));

        // Start TUS upload
        const upload = new tus.Upload(form.file, {
          endpoint: 'https://video.bunnycdn.com/tusupload',
          retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
          removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
          headers: {
            AuthorizationSignature: res.uploadSignature,
            AuthorizationExpire: res.uploadExpire,
            LibraryId: res?.libraryId,
            VideoId: res?.videoId,
          },
          metadata: {
            filetype: form.file.type,
            title: `${form.title}_${uploadId}`, // Make title unique to avoid conflicts
            collection: res?.collectionId,
            uploadId: uploadId, // Add unique identifier
          },
          onError: function(error) {
            console.log('Upload error:', error);
            setUploads(prev => {
              const newUploads = { ...prev };
              delete newUploads[uploadId];
              return newUploads;
            });
          },
          onProgress: function(bytesUploaded, bytesTotal) {
            const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
            setUploads(prev => ({
              ...prev,
              [uploadId]: {
                ...prev[uploadId],
                progress: percentage
              }
            }));
            console.log(`Uploading ${form.title}.....${percentage}%`);
          },
          onSuccess: () => {
            console.log('Upload completed:', form.title);

            // Add video to section
            setSections(prevSections => 
              prevSections.map(section => {
                if (section.id === sectionId) {
                  return {
                    ...section,
                    videos: [
                      ...section.videos, 
                      { 
                        id: res?.videoId || Date.now(), 
                        video_title: form.title, 
                        file: form.file 
                      }
                    ]
                  };
                }
                return section;
              })
            );

            // Remove upload state
            setUploads(prev => {
              const newUploads = { ...prev };
              delete newUploads[uploadId];
              return newUploads;
            });
          },
        });

        // Store upload instance for potential cancellation
        setUploads(prev => ({
          ...prev,
          [uploadId]: {
            ...prev[uploadId],
            tusUpload: upload
          }
        }));

        // Start upload immediately without checking for previous uploads
        upload.start();

      } else {
        // Remove upload state if API call failed
        setUploads(prev => {
          const newUploads = { ...prev };
          delete newUploads[uploadId];
          return newUploads;
        });
      }
    } catch (err) {
      console.error('Error starting upload:', err);
      setUploads(prev => {
        const newUploads = { ...prev };
        delete newUploads[uploadId];
        return newUploads;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpload = (uploadId: string) => {
    const upload = uploads[uploadId];
    if (upload?.tusUpload) {
      upload.tusUpload.abort().then(() => {
        console.log("Upload aborted:", upload.title);
      }).catch((error) => {
        console.log("Error aborting upload:", error);
      });
    }

    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[uploadId];
      return newUploads;
    });
  };

  // Get uploads for a specific section
  const getSectionUploads = (sectionId: string) => {
    return Object.values(uploads).filter(upload => upload.sectionId === sectionId);
  };

  const isFormValid = (sectionId: string) => {
    const form = videoForms[sectionId];
    return form?.title.trim() && form?.file;
  };


  const updateSection = async({section_id, section_name}:{section_id:string, section_name:string}) => {


    console.log(' got updated')

    document.getElementById(`spinner2-${section_id}`)?.removeAttribute("hidden");
    document.getElementById(`check-${section_id}`)?.setAttribute("hidden", "true");
    document.getElementById(`cancel-${section_id}`)?.setAttribute("hidden", "true");

    try {
      const res = await UpdateCourseSection(section_id, {section_name: section_name});
      if(res.id){
        setSections(prev => prev.map(section => {
          if(section.id === section_id){
            return {
              ...section,
              section_name: section_name
            }
          }
          return section;
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(`name-${section_id}`)?.removeAttribute("hidden");
      document.getElementById(`pencil-${section_id}`)?.removeAttribute("hidden");
      document.getElementById(`inputBox-${section_id}`)?.setAttribute("hidden", "true");
      document.getElementById(`spinner2-${section_id}`)?.setAttribute("hidden", "true");
      document.getElementById(`check-${section_id}`)?.removeAttribute("hidden");
      document.getElementById(`cancel-${section_id}`)?.removeAttribute("hidden");
    }
  };

  const courseSectionDelete = async(sectionId: string) => {
    document.getElementById(`trash-${sectionId}`)?.setAttribute("hidden", "true");
    document.getElementById(`spinner-${sectionId}`)?.removeAttribute("hidden");
    try {
      const res = await DeleteCourseSection(sectionId);
      if(res.status===204){
        setSections(prev => prev.filter(section => section.id !== sectionId));
      }
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(`trash-${sectionId}`)?.removeAttribute("hidden");
      document.getElementById(`spinner-${sectionId}`)?.setAttribute("hidden", "true");
    }
  };





  return (
    <div className="max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">Video Course Manager</h1>

      <div className="space-y-6">
        {sections.map((section: any) => (
          <div key={section.id} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">

            <div className="flex justify-between items-center bg-slate-50 px-6 py-4 border-b border-slate-200">

              <h2 id={`name-${section.id}`} className="text-lg font-semibold text-slate-800">{section.section_name}</h2>

              <form onSubmit={(e)=>{
                e.preventDefault();
                updateSection({section_id:section.id, section_name: e.currentTarget.querySelector('input')?.value})
              }} id={`inputBox-${section.id}`} hidden className="flex items-center gap-3">

                <input id='section-name' type="text" defaultValue={section.section_name} className='outline-none border focus:border-slate-400 border-slate-300 rounded-md px-2 py-0.5'/>

                <button id={`check-${section.id}`} type="submit" className='bg-green-50 border border-green-300 text-green-500 p-1 rounded-md cursor-pointer'>
                  <Check size={20}/>
                </button>
                
                <button type="button" id={`cancel-${section.id}`} onClick={()=>{
                    document.getElementById(`name-${section.id}`)?.removeAttribute("hidden");
                    document.getElementById(`pencil-${section.id}`)?.removeAttribute("hidden");
                    document.getElementById(`inputBox-${section.id}`)?.setAttribute("hidden", "true");
                }}
                className='bg-red-50 border border-red-300 text-red-500 p-1 rounded-md cursor-pointer'>
                  <X size={20}/>
                </button>
              </form>

              <div hidden id={`spinner2-${section.id}`} className="ml-3 w-5.5 h-5.5 border-2 border-blue border-l-transparent rounded-full duration-75 animate-spin" />


              <div className='flex items-center gap-3 ml-auto'>
                <span id={`pencil-${section.id}`} className='bg-blue-50 border border-blue-300 p-1 rounded-md  cursor-pointer'
                onClick={()=> {
                  document.getElementById(`name-${section.id}`)?.setAttribute("hidden", "true");
                  document.getElementById(`pencil-${section.id}`)?.setAttribute("hidden", "true");
                  document.getElementById(`inputBox-${section.id}`)?.removeAttribute("hidden");
                }}
                >
                  <PencilLine size={20} className="text-blue-500" />
                </span>
                <span id={`trash-${section.id}`} className='bg-red-50 border border-red-300 p-1 rounded-md' onClick={()=> courseSectionDelete(section.id)}>
                  <Trash2 size={20} className="text-red-500 cursor-pointer" />
                </span>
                <div hidden id={`spinner-${section.id}`} className="w-5.5 h-5.5 border-2 border-blue border-l-transparent rounded-full duration-75 animate-spin" />
              </div>
              
            </div>

            <div className="p-3">
              {/* Existing videos */}
              {section.videos.length > 0 && (
                <div className="space-y-2 mb-4">
                  {section.videos.map((video, index) => (
                    <div key={video.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                      <Video className="text-blue-500" size={20} />
                      <h3 className="font-medium text-slate-700">{video.video_title}</h3>
                      <span className='ml-auto'>
                        <Trash2 size={20} className="text-red-500 cursor-pointer" />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Active uploads for this section */}
              {getSectionUploads(section.id).map((upload) => (
                <div key={upload.id} className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-slate-700">Uploading: {upload.title}</h3>
                      <span className="text-sm text-slate-600">{upload.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${upload.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>File: {upload.file.name}</span>
                      <button
                        onClick={() => handleCancelUpload(upload.id)}
                        className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Video upload form */}
              {activeVideoForms.includes(section.id) && (
                <div className="mb-4 p-4 bg-slate-50 rounded-md border border-slate-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Video Title</label>
                      <input
                        type="text"
                        value={videoForms[section.id]?.title || ''}
                        onChange={(e) => updateVideoForm(section.id, 'title', e.target.value)}
                        placeholder="Enter video title"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Upload Video File</label>
                      <label className="w-full cursor-pointer text-center px-4 py-2 border border-dashed border-slate-300 rounded-md hover:border-blue-500 transition block">
                        <div className="flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600">
                          <Upload size={18} />
                          <span>{videoForms[section.id]?.file ? videoForms[section.id].file.name : "Choose file..."}</span>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => e.target.files?.[0] && updateVideoForm(section.id, 'file', e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => closeVideoForm(section.id)}
                        className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-md transition"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleUploadVideo(section.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition flex items-center gap-2 cursor-pointer"
                        disabled={!isFormValid(section.id) || loading}
                      >
                        {loading ? (
                          <>
                            Processing
                            <div className="w-3.5 h-3.5 border-2 border-white border-l-transparent rounded-full animate-spin" />
                          </>
                        ) : (
                          <>
                            <Upload size={16} />
                            Upload Video
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add video button */}
              {section.videos.length > 0 || getSectionUploads(section.id).length > 0 ? (
                !activeVideoForms.includes(section.id) && (
                  <button 
                    onClick={() => openVideoForm(section.id)} 
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Another Video
                  </button>
                )
              ) : (
                !activeVideoForms.includes(section.id) && (
                  <div className="text-center py-6">
                    <Video className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-sm font-medium text-slate-900">No videos yet</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {data?.is_paid ? "Upload your first video to this section" : "Add your video links to this section"}
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => openVideoForm(section.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition cursor-pointer"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Add Video
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Section UI */}
      {showInput ? (
        <div className="mt-6 bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-slate-800">Create New Section</h3>
          <form className="flex gap-3">
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="Enter section name"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button 
              type='submit'
              onClick={(e: any) => {
                e.preventDefault();
                handleSectionCreate();              
              }}
              disabled={!sectionName.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Create Section
            </button>
            <button 
              type='button'
              onClick={() => {
                setShowInput(false);
                setSectionName('');
              }}
              className="p-2 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="mt-6 flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 rounded-lg shadow-sm transition cursor-pointer"
        >
          <Plus size={18} />
          <span className="font-medium">Add Section</span>
        </button>
      )}
    </div>
  );
};

export default VideoSectionsUI;