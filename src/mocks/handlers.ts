import { http, HttpResponse } from "msw";

import products from "@/mocks/data/products.json";
import type { Product } from "@/types";

const catalog = products as Product[];

export const handlers = [
  http.get("/api/products", () => HttpResponse.json(catalog)),
  http.get("/api/products/:slug", ({ params }) => {
    const product = catalog.find((item) => item.slug === params.slug);
    return product
      ? HttpResponse.json(product)
      : new HttpResponse(null, { status: 404 });
  }),
];
