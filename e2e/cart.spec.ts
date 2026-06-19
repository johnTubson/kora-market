import { expect, test } from "@playwright/test";

test.describe("Cart", () => {
  test("add item and update quantity", async ({ page }) => {
    await page.goto("/products/ankara-print-dress");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByText("Added to cart")).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByText("Ankara Print Dress")).toBeVisible();
    await expect(
      page.getByLabel("Quantity for Ankara Print Dress")
    ).toBeVisible();

    await page.getByLabel("Increase quantity").click();
    await expect(
      page.getByRole("group", { name: "Quantity for Ankara Print Dress" })
    ).toContainText("2");
  });
});
