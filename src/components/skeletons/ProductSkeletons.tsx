import { Skeleton } from "@/components/ui/skeleton";

/**
 * Soft-Ivory skeleton grid mimicking product card layout.
 * Used during Shopify/Supabase data fetches.
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image area */}
          <Skeleton className="aspect-square w-full bg-muted" />
          {/* Card body */}
          <div className="p-4 space-y-3">
            {/* Brand */}
            <Skeleton className="h-3 w-20 bg-muted" />
            {/* Title */}
            <Skeleton className="h-4 w-3/4 bg-muted" />
            {/* Pharmacist note */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full bg-muted" />
              <Skeleton className="h-3 w-2/3 bg-muted" />
            </div>
            {/* Highlights */}
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full bg-muted" />
              <Skeleton className="h-5 w-20 rounded-full bg-muted" />
            </div>
            {/* Price + button */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16 bg-muted" />
              <Skeleton className="h-5 w-12 bg-muted" />
            </div>
            <Skeleton className="h-9 w-full rounded-md bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Hero section skeleton for initial page load.
 */
export function HeroSkeleton() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton className="h-5 w-48 rounded-full bg-muted" />
            <Skeleton className="h-12 w-full bg-muted" />
            <Skeleton className="h-12 w-3/4 bg-muted" />
            <Skeleton className="h-20 w-full bg-muted" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-40 rounded-md bg-muted" />
              <Skeleton className="h-12 w-40 rounded-md bg-muted" />
            </div>
          </div>
          <Skeleton className="aspect-[4/5] w-full rounded-lg bg-muted" />
        </div>
      </div>
    </section>
  );
}