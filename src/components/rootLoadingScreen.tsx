'use client'
import { useClientSession } from '@/context/sessionProvider';


export default function RootLoadingScreen({ children }: { children: React.ReactNode }) {

  const session = useClientSession();

  if (!session || session.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">EdCluster</h1>

          <div className="relative w-full h-2 rounded-full bg-gray-200 bg-opacity-20 mx-auto">
            <div 
              className="absolute top-0 left-0 h-full rounded-full bg-blue-600 animate-moving"
              style={{ width: '0%' }}
            />
          </div>
        </div>
        
        <style jsx>{`
          @keyframes moving {
            50% {
              width: 100%;
            }
            100% {
              width: 0;
              right: 0;
              left: unset;
            }
          }
          
          .animate-moving {
            animation: moving 0.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}