import { SignedOut, SignInButton, SignUpButton, SignedIn } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <h1 className={`text-8xl mb-12 `}>Mind Match</h1>
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
    </>
  );
}
