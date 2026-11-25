import { FilterSkeleton, HeaderSkeleton, RowsSkeleton, SkeletonPage } from '@/components/skeleton';

export default function Loading() {
  return (
    <SkeletonPage label="the audit log">
      <HeaderSkeleton />
      <FilterSkeleton />
      <RowsSkeleton rows={8} />
    </SkeletonPage>
  );
}
