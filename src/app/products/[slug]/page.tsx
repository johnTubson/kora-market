import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { ProductDetailClient } from "@/features/catalog/components/ProductDetailClient";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${siteConfig.url}/products/${product.slug}`,
      images: product.images[0]
        ? [{ url: product.images[0], alt: product.name }]
        : undefined,
    },
  };
}

function ProductJsonLd({
  product,
}: {
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.priceNGN,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <Container className="py-10">
        <ProductDetailClient product={product} />
      </Container>
    </>
  );
}
