import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { ConcernFilter } from "@/components/ConcernFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

const Index = () => {
  const [concern, setConcern] = useState<string | null>(null);
  const { data: products, isLoading, error } = useProducts(concern);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Product Catalog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our curated skincare collection
          </p>
          <div className="mt-6">
            <ConcernFilter selected={concern} onSelect={setConcern} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load products. Please try again.
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && products && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Package className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try selecting a different concern</p>
          </div>
        )}

        {!isLoading && products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
