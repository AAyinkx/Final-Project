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
            className={` hover:text-purple-700 text-3xl px-1 py-2 `}
            mode="modal"
          >
            Sign In
          </SignInButton>
          <br />
          <SignUpButton
            mode="modal"
            className={`hover:text-purple-700 text-3xl px-1  py-2`}
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
