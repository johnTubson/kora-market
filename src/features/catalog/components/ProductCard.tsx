import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { getCategoryLabel } from "@/features/catalog/constants";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import type { Product } from "@/types";

export type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
            priority={priority}
          />
          {!product.inStock ? (
            <Badge variant="destructive" className="absolute left-2 top-2">
              Out of stock
            </Badge>
          ) : null}
        </div>
        <CardHeader className="pb-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {getCategoryLabel(product.category)}
          </p>
          <CardTitle className="line-clamp-2 text-base">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-lg font-bold text-primary">
            <PriceDisplay amountNGN={product.priceNGN} />
          </p>
        </CardContent>
      </Link>
      <CardFooter className="pt-0">
        <Link
          href={`/products/${product.slug}`}
          className="focus-ring text-sm font-medium text-primary hover:underline"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
