import Link from "next/link";






export default function Login() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center p-4">

        <div className="w-full max-w-md bg-white rounded-2xl border-[0.5px] border-gray-200 shadow-xs p-5 md:p-10">

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM12 8.5C13.25 8.5 14.45 9.05 15.35 9.95L16.77 8.53C15.46 7.22 13.78 6.5 12 6.5S8.54 7.22 7.23 8.53L8.65 9.95C9.55 9.05 10.75 8.5 12 8.5ZM12 11.5C12.83 11.5 13.58 11.9 14.12 12.44L15.54 11.02C14.63 10.11 13.38 9.5 12 9.5S9.37 10.11 8.46 11.02L9.88 12.44C10.42 11.9 11.17 11.5 12 11.5Z"/>
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-700 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Sign in to continue to edcluster
            </p>
          </div>

          <a href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/`} className="w-full flex items-center justify-center gap-3 px-3 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </a>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                Sign up for free
              </Link>
            </p>
          </div>

        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="text-center text-xs text-gray-500 space-y-2">
            <p className="">© {new Date().getFullYear()} EdCluster. All rights reserved.</p>
            <div className="flex items-center justify-center gap-2">
              <Link href="#" className="hover:text-gray-700 transition-colors duration-200">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-gray-700 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

      </div>
      
    </>
  );
}