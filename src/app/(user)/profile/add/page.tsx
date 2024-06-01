import AddFriendButton from "@/src/components/profile/add-friend-button";

interface pageProps {}

const addPage = () => {
  return (
    <div className="container mx-auto pb-20 mt-4 px-4 flex flex-col justify-center pt-20 gap-5 items-center">
      <h1 className="text-3xl font-extrabold tracking-tight">Add a friend</h1>
      <AddFriendButton />
    </div>
  );
};

export default addPage;
