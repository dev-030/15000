'use client'
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookmarkCheck } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BecomeMentor } from '@/lib/actions/actions';
import { set } from 'zod';
import { useClientSession } from '@/context/sessionProvider';



export default function MentorRegistrationForm() {

  

  const role = useClientSession()?.user?.role;

  if(role === 'mentor') return redirect('/');


  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    facebookProfile: ''
  });

  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender:string) => {
    setFormData(prev => ({ ...prev, gender }));
  };


  const handleSubmit = async(e:any) => {

    setIsLoading(true);
    
    e.preventDefault();

    const data = {
      "full_name": formData.fullName,
      "gender": formData.gender,
      "phone_number": formData.phoneNumber,
      "facebook_account": formData.facebookProfile
    }

    try {

      await BecomeMentor(data)
      
      const response = await BecomeMentor(data);

      if(response === 200){
        router.push('/mentor/dashboard');
      }

    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }


  };
  

  return (
    <div className="min-h-screen">

      <div className="grid place-content-center min-h-screen">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">

          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Become a Mentor</h1>
            <p className="text-gray-500 text-sm mt-1">Please provide the following details to get started.</p>
          </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex gap-3">
                    <div 
                      className={`flex items-center border ${formData.gender === 'm' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-md p-2 flex-1 cursor-pointer`}
                      onClick={() => handleGenderSelect('m')}
                    >
                      <input 
                        type="radio" 
                        id="male" 
                        name="gender" 
                        checked={formData.gender === 'm'} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      <label htmlFor="male" className="text-sm cursor-pointer">Male</label>
                    </div>
                    <div 
                      className={`flex items-center border ${formData.gender === 'f' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-md p-2 flex-1 cursor-pointer`}
                      onClick={() => handleGenderSelect('f')}
                    >
                      <input 
                        type="radio" 
                        id="female" 
                        name="gender" 
                        checked={formData.gender === 'f'} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      <label htmlFor="female" className="text-sm cursor-pointer">Female</label>
                    </div>
                    <div 
                      className={`flex items-center border ${formData.gender === 'o' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-md p-2 flex-1 cursor-pointer`}
                      onClick={() => handleGenderSelect('o')}
                    >
                      <input 
                        type="radio" 
                        id="other" 
                        name="gender" 
                        checked={formData.gender === 'o'} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      <label htmlFor="other" className="text-sm cursor-pointer">Other</label>
                    </div>
                  </div>
                </div>


                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <span className="text-gray-500 text-sm">+880</span>
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>


                <div>
                  <label htmlFor="facebookProfile" className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook Profile Link
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                    <div className="pl-3 pr-2 py-2 bg-gray-50 border-r border-gray-300">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <input
                      type="url"
                      id="facebookProfile"
                      name="facebookProfile"
                      value={formData.facebookProfile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-r-md border-0 focus:ring-0 focus:outline-none"
                      placeholder="Example: https://www.facebook.com/username"
                    />
                  </div>
                </div>

                <p className='text-xs text-amber-400'>* Please note that : You will be required to give your google meet access in order to become an mentor.</p>
              </div>


              <div className="flex items-center justify-between mt-8">
                <button type="button" className="flex items-center text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <Link href={"/"}>Back</Link>
                </button>
                <button type="submit" disabled={isLoading} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
                  {isLoading ? (<div className="flex items-center gap-2">
                    <span>Processing</span>
                    <div className="w-3.5 h-3.5 border-2 border-white border-l-transparent rounded-full animate-spin" />
                  </div>): (<>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                  )}
                </button>
              </div>
            </form>
          </div>
      </div>


      

    </div>
  );
}