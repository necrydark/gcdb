import { Skeleton } from "@/src/components/ui/skeleton";

function Loading() {
  return (
    <div className="container mx-auto px-5 lg:px-10 mt-10">
      <h1 className="text-3xl font-extrabold text-center tracking-tight mt-6">
        Your Favourites
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}

export default Loading;
