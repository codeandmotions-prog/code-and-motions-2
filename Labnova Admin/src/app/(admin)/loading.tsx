import { Bone, CardSkeleton, HeaderSkeleton, SkeletonPage } from '@/components/skeleton';

/** Dashboard placeholder — also the fallback for any section without its own. */
export default function Loading() {
  return (
    <SkeletonPage label="the dashboard">
      <HeaderSkeleton />
      <div className="space-y-6">
        <div className="card overflow-hidden">
          <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`bg-white px-5 py-5 sm:px-6 ${i === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <Bone className="h-4 w-24" />
                <Bone className="mt-3 h-8 w-14" />
                <Bone className="mt-2 h-3.5 w-28" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <CardSkeleton lines={3} className="lg:col-span-3" />
          <CardSkeleton lines={3} className="lg:col-span-2" />
        </div>
        <CardSkeleton lines={4} />
      </div>
    </SkeletonPage>
  );
}
