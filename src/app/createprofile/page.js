import CreateProfileForm from "@/components/createProfileForm";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function createProfile() {
  const user = await currentUser();
  return (
    <>
      <div className="mx-11"></div>
      <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg mb-6">
        {" "}
        Create Profile{" "}
      </h1>
      <CreateProfileForm
        clerk_id={user.id}
        username={user.username}
        first_name={user.firstName}
        last_name={user.lastName}
      />
    </>
  );
}
