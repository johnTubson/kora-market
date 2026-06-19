import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductDetailClient } from "@/features/catalog/components/ProductDetailClient";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";

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
    return { title: "Product not found | Kora Market" };
  }

  return {
    title: `${product.name} | Kora Market`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="py-10">
          <ProductDetailClient product={product} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
