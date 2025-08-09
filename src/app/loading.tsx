import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24 bg-neutral-200" />
                <Skeleton className="h-8 w-24 bg-neutral-200" />
                <Skeleton className="h-8 w-24 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3 p-4 border border-neutral-200 rounded-lg bg-white">
                        <Skeleton className="h-6 w-3/4 bg-neutral-200" />
                        <Skeleton className="h-4 w-1/2 bg-neutral-200" />
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-5 w-12 bg-neutral-200" />
                            <Skeleton className="h-8 w-24 bg-neutral-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-6">
            <Skeleton className="h-32 w-full bg-neutral-200 rounded-lg" />
            <Skeleton className="h-24 w-full bg-neutral-200 rounded-lg" />
            <Skeleton className="h-24 w-full bg-neutral-200 rounded-lg" />
        </div>
    </div>
    </div>
  )
}
