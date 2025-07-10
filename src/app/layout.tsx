import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/context/sessionProvider";
import { Geist } from "next/font/google";
import LockScreen from "@/components/lockScreen";
import RootLoadingScreen from "@/components/rootLoadingScreen";
import { auth } from "@/lib/auth";


const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "EdCluster",
  description: "Join expert-led courses and mentorships with EdCluster.",
};


export default async function RootLayout({ children}: Readonly<{children: React.ReactNode}>) {


  return (
    <html lang="en"> 
      <body className={`${geistSans.className} antialiased`}>
        <SessionProvider>
          {/* <RootLoadingScreen> */}
            {/* <LockScreen> */}
              {children}
            {/* </LockScreen> */}
          {/* </RootLoadingScreen> */}
        </SessionProvider>
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
