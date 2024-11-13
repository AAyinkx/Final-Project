import { SignedOut, SignInButton, SignUpButton, SignedIn } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Animation from "@/components/Animation";
import Image from "next/image";
import logo from "@/../public/MindMatch2.png";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      {/* <h1 className={`text-8xl mb-12 `}>Mind Match</h1> */}
      <Animation />
      <div className="top-2 right-5">
        <SignedOut>
          <SignInButton
            className="w-[20vw] mt-12 mb-6 btn content-center bg-red-400 hover:bg-red-700 text-4xl p-8 border-none font-bold text-black"
            mode="modal"
          >
            Sign In
          </SignInButton>
          <br />
          <SignUpButton
            className="w-[20vw] btn content-center bg-orange-400 hover:bg-orange-700 text-4xl p-8  border-none font-bold text-black"
            mode="modal"
          >
            Sign Up
          </SignUpButton>
        </SignedOut>
        {/* <SignedIn>
          <NavBar />
        </SignedIn> */}
      </div>
    </div>
  );
}
