import { FilterSkeleton, HeaderSkeleton, RowsSkeleton, SkeletonPage } from '@/components/skeleton';

export default function Loading() {
  return (
    <SkeletonPage label="labs">
      <HeaderSkeleton />
      <FilterSkeleton />
      <RowsSkeleton rows={7} />
    </SkeletonPage>
  );
}
