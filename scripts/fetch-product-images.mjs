import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const productsPath = path.join(process.cwd(), "src/mocks/data/products.json");
const productsDir = path.join(process.cwd(), "public/images/products");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

async function fetchImage(seed, width, height) {
  const response = await fetch(
    `https://picsum.photos/seed/${seed}/${width}/${height}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image for seed "${seed}": ${response.status}`
    );
  }

  return Buffer.from(await response.arrayBuffer());
}

async function saveWebp(buffer, outputPath, quality) {
  await sharp(buffer).webp({ quality }).toFile(outputPath);
}

fs.mkdirSync(productsDir, { recursive: true });

for (const product of products) {
  const imageCount = Math.max(product.images.length, 1);
  const nextImages = [];

  for (let index = 0; index < imageCount; index += 1) {
    const seed = index === 0 ? product.slug : `${product.slug}-${index + 1}`;
    const fileName =
      index === 0
        ? `${product.slug}.webp`
        : `${product.slug}-${index + 1}.webp`;
    const outputPath = path.join(productsDir, fileName);

    const buffer = await fetchImage(seed, 400, 400);
    await saveWebp(buffer, outputPath, 65);
    nextImages.push(`/images/products/${fileName}`);
  }

  product.images = nextImages;
}

const heroPath = path.join(process.cwd(), "public/images/hero.webp");
const heroBuffer = await fetchImage("kora-market-hero", 800, 600);
await saveWebp(heroBuffer, heroPath, 75);

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);

console.log(
  `Saved ${products.length} product image sets to public/images/products/`
);
console.log("Saved hero image to public/images/hero.webp");
