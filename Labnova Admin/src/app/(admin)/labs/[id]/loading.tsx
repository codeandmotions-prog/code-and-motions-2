import { Bone, CardSkeleton, HeaderSkeleton, SkeletonPage } from '@/components/skeleton';

export default function Loading() {
  return (
    <SkeletonPage label="lab details">
      <HeaderSkeleton avatar />
      <Bone className="-mt-3 mb-6 h-6 w-72 max-w-full rounded-full sm:-mt-5" />
      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <CardSkeleton lines={4} />
          <CardSkeleton lines={5} />
        </div>
        <div className="min-w-0 space-y-6">
          <CardSkeleton lines={5} />
          <CardSkeleton lines={2} />
        </div>
      </div>
    </SkeletonPage>
  );
}
