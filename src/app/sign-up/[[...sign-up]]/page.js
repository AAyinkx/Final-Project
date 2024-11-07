import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <h1> Sign-up for a welcome package. It&apos; NPM </h1>
      <SignUp />
    </>
  );
}
