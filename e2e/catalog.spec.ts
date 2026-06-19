import { expect, test } from "@playwright/test";

test.describe("Catalog", () => {
  test("browse home, listing, and product detail", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Shop local. Ship fast. Pay your way.",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Featured products" })
    ).toBeVisible();
    await expect(page.getByText("Ankara Print Dress")).toBeVisible();

    await page.getByRole("link", { name: "Products", exact: true }).click();
    await expect(page).toHaveURL("/products");
    await expect(
      page.getByRole("heading", { name: "All products" })
    ).toBeVisible();

    await page.getByLabel("Search products").fill("ankara");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page).toHaveURL(/q=ankara/);
    await expect(page.getByText("Ankara Print Dress")).toBeVisible();
    await expect(page.getByText("1 product")).toBeVisible();
    await expect(
      page.getByRole("button", { name: 'Remove filter: Search: "ankara"' })
    ).toBeVisible();

    await page
      .getByRole("link", { name: "Ankara Print Dress" })
      .first()
      .click();
    await expect(page).toHaveURL("/products/ankara-print-dress");
    await expect(
      page.getByRole("heading", { name: "Ankara Print Dress" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add to cart" })
    ).toBeVisible();
  });

  test("switch currency on product listing", async ({ page }) => {
    await page.goto("/products");
    await page.getByLabel("Search products").fill("ankara");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page).toHaveURL(/q=ankara/);

    await page.getByRole("button", { name: "$ USD" }).click();
    await expect(page.getByText("$16.33")).toBeVisible();
  });

  test("mobile viewport filters by category chip", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/products");

    const fashionChip = page
      .locator('[aria-label="Product categories"]')
      .getByRole("link", { name: "Fashion" });
    await fashionChip.scrollIntoViewIfNeeded();
    await fashionChip.click();
    await expect(page).toHaveURL(/category=fashion/);
    await expect(
      page.getByRole("button", { name: "Remove filter: Category: Fashion" }),
    ).toBeVisible();
  });
});
