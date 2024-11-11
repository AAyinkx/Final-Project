import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
// import Header from "@/components/Header";
import { neobrutalism } from "@clerk/themes";
import NavBar from "@/components/NavBar";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MindMatch",
  description: "More Than a Quiz - It's a Mind Match",
};

export default function RootLayout({ children }) {
  //going to wrap all elements with ClerkProvider
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <div className="min-h-screen">
            <Script
              src="https://kit.fontawesome.com/5d4d1c054f.js"
              crossOrigin="anonymous"
            ></Script>
            <SignedIn>
              <div className="z-10 fixed top-5 right-5">
                <UserButton />
              </div>
            </SignedIn>
            <SignedIn>
              <NavBar />
            </SignedIn>
            {/* <Header /> */}
            {children}
          </div>
          <footer className="w-full bg-gray-200 py-4 text-gray-600 text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} Mind Match. All rights reserved.
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
