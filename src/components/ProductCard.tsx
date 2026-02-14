import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/hooks/useProducts";
import { Package } from "lucide-react";

function formatStep(step: string) {
  return step.replace(/^Step_\d+_/, "").replace(/([A-Z])/g, " $1").trim();
}

function formatConcern(concern: string) {
  return concern.replace("Concern_", "");
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {product.image_url && !product.image_url.includes("example.com") ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Package className="h-16 w-16 text-muted-foreground/40" />
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            {product.brand && (
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </p>
            )}
            <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
              {product.title}
            </h3>
          </div>
          {product.price && (
            <span className="text-sm font-bold text-foreground whitespace-nowrap">
              ${Number(product.price).toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-[10px] font-medium">
            {formatStep(product.regimen_step)}
          </Badge>
          <Badge variant="outline" className="text-[10px] font-medium">
            {formatConcern(product.primary_concern)}
          </Badge>
          {product.is_hero && (
            <Badge className="text-[10px] bg-primary text-primary-foreground">
              Hero
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {product.inventory_total} in stock
        </p>
      </CardContent>
    </Card>
  );
}
