import CreateProfileForm from "@/components/createProfileForm";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function createProfile() {
  const user = await currentUser();
  return (
    <>
      <h1> Create Profile </h1>
      <CreateProfileForm
        clerk_id={user.id}
        username={user.username}
        first_name={user.firstName}
        last_name={user.lastName}
      />
    </>
  );
}
