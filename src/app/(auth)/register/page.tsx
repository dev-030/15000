import googleIcon from "@/../public/google_btn.svg";
import Image from "next/image";

export default function Login() {


  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-50">

        <div className="bg-white py-20 border border-slate-200 rounded-xl w-full max-w-xl flex items-center justify-center">
          <a href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/`} className="cursor-pointer">

            <Image src={googleIcon} alt="google-icon" className="w-54" />

          </a>
        </div>
        
      </div>
    </>
  );
}