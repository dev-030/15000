'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Camera, Facebook } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useClientSession } from '@/context/sessionProvider';
import { UpdateProfile } from '@/lib/actions/actions';
import useSWR from 'swr';



export default function EditProfile() {

  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const session = useClientSession();
  const param = useParams();
  const isOwnProfile = param.slug === session?.user?.username;


  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    skills: ['Steal', 'Create water', 'Ice', 'Stealth'],
    facebook: '',
    profileImageFile: null as File | null,
  });


  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/user-profile/${param.slug}/`, 
    (url: string) =>
    fetch(url).then((res) => res.json())
  );


  if(!isOwnProfile) router.push('/');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePic: reader.result as string,
        profileImageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async() => {
    // console.log('Submitting:', {
    //   ...formData,
    //   profileImageFile: formData.profileImageFile?.name,
    // });

    const res = await UpdateProfile(formData)

    console.log(res);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">

      <ArrowLeft className='text-gray-500 text-xl bg-slate-100 rounded-md p-1 cursor-pointer mb-6' onClick={()=>router.back()}/>

      <h1 className="text-3xl font-bold text-gray-700 mb-8">Edit Profile</h1>

      {/* Profile Image with upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 relative">
        <img
          src={data?.profile_pic}
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover border-4 border-purple-100"
        />
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <Camera
          className="absolute top-24 left-24 bg-slate-200 p-1 rounded-full cursor-pointer"
          size={24}
          onClick={() => fileInputRef.current?.click()}
        />
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={data?.full_name}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full mt-1 text-base border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
        />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
        <textarea
          value={data?.mentor_profile.about}
          onChange={(e) => handleChange('bio', e.target.value)}
          className="w-full mt-1 text-base border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
          rows={4}
        /> 
      </div>

      {/* Facebook */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1 items-center gap-2">
          <Facebook size={16} className="text-blue-600" />
          Facebook Link
        </label>
        <input
          type="text"
          value={formData.facebook}
          onChange={(e) => handleChange('facebook', e.target.value)}
          className="w-full mt-1 text-base border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
          placeholder="https://facebook.com/username"
        />
      </div>

      {/* Skills */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {formData.skills.map((skill) => (
            <div
              key={skill}
              className="bg-blue-100 text-sm text-blue-800 px-4 py-2 rounded-full flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full mt-1 text-base border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-gray-500"
            placeholder="Add a skill"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-600 text-nowrap hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 cursor-pointer border-none"
          >
            Add Skill
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition duration-150 transform hover:scale-105 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
