import { getProductBySlug } from "@/lib/products";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new Response(null, { status: 404 });
  }

  return Response.json(product);
}
