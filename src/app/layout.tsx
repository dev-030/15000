import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/context/sessionProvider";
import { Geist } from "next/font/google";
import LockScreen from "@/components/lockScreen";


const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "edcluster",
  description: "Generated by create next app",
};

export default async function RootLayout({ children}: Readonly<{children: React.ReactNode}>) {

  const session = await auth();

  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <SessionProvider session={session}>
          <LockScreen>
            {children}
          </LockScreen>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
