import { expect, test } from "@playwright/test";

test.describe("Checkout", () => {
  test("complete checkout from cart to success", async ({ page }) => {
    await page.goto("/products/ankara-print-dress");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByText("Added to cart")).toBeVisible();

    await page.goto("/cart");
    await page.getByRole("button", { name: "Proceed to checkout" }).click();
    await expect(page).toHaveURL("/checkout");
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

    await page.getByLabel("Full name").fill("Amina Okafor");
    await page.getByLabel("Email").fill("amina@example.com");
    await page.getByLabel("Phone").fill("+2348000000000");
    await page.getByLabel("Street address").fill("12 Marina Road");
    await page.getByLabel("City").fill("Lagos");
    await page.getByLabel("State / Region").fill("Lagos");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel("Name on card").fill("Amina Okafor");
    await page.getByLabel("Card number").fill("4242424242424242");
    await page.getByLabel("Expiry").fill("12/28");
    await page.getByLabel("CVV").fill("123");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByRole("heading", { name: "Items (1)" })
    ).toBeVisible();

    await Promise.all([
      page.waitForURL(/\/checkout\/success\?orderId=KM-/),
      page.getByRole("button", { name: "Place order" }).click(),
    ]);

    await expect(page).toHaveURL(/\/checkout\/success\?orderId=KM-/);
    await expect(
      page.getByRole("heading", { name: "Thank you for your order!" })
    ).toBeVisible();
    await expect(page.getByText(/Order ID: KM-/)).toBeVisible();
    await expect(page.getByText("Ankara Print Dress")).toBeVisible();
  });

  test("out-of-stock place-order stays on checkout with alert", async ({
    page,
  }) => {
    await page.goto("/products/ankara-print-dress");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await expect(page.getByText("Added to cart")).toBeVisible();

    await page.goto("/checkout?forceStockFail=1");
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

    await page.getByLabel("Full name").fill("Amina Okafor");
    await page.getByLabel("Email").fill("amina@example.com");
    await page.getByLabel("Phone").fill("+2348000000000");
    await page.getByLabel("Street address").fill("12 Marina Road");
    await page.getByLabel("City").fill("Lagos");
    await page.getByLabel("State / Region").fill("Lagos");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByLabel("Name on card").fill("Amina Okafor");
    await page.getByLabel("Card number").fill("4242424242424242");
    await page.getByLabel("Expiry").fill("12/28");
    await page.getByLabel("CVV").fill("123");
    await page.getByRole("button", { name: "Continue" }).click();

    await page.getByRole("button", { name: "Place order" }).click();

    await expect(page).toHaveURL(/\/checkout\?forceStockFail=1/);
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "Some items are no longer available" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Update cart" })).toBeVisible();
  });
});
