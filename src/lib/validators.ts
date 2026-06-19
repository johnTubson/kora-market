import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\d+\s()-]+$/, "Enter a valid phone number"),
  street: z.string().min(5, "Enter your street address"),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Enter your state or region"),
  postalCode: z.string().optional(),
});

export const paymentSchema = z
  .object({
    method: z.enum(["card", "bank_transfer", "mobile_money"], {
      message: "Select a payment method",
    }),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.method !== "card") return;

    if (!data.cardName || data.cardName.length < 2) {
      ctx.addIssue({
        code: "custom",
        message: "Enter the name on card",
        path: ["cardName"],
      });
    }

    if (
      !data.cardNumber ||
      !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ""))
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid 16-digit card number",
        path: ["cardNumber"],
      });
    }

    if (!data.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) {
      ctx.addIssue({
        code: "custom",
        message: "Use MM/YY format",
        path: ["expiry"],
      });
    }

    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid CVV",
        path: ["cvv"],
      });
    }
  });

export const checkoutItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  variantName: z.string(),
  quantity: z.number().int().positive(),
  priceNGN: z.number().positive(),
});

export const checkoutSchema = z.object({
  address: addressSchema,
  payment: paymentSchema,
  items: z.array(checkoutItemSchema).min(1, "Cart cannot be empty"),
  currency: z.enum(["NGN", "USD"]),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type CheckoutFormInput = Pick<CheckoutFormValues, "address" | "payment">;

export const ADDRESS_FIELDS = [
  "fullName",
  "email",
  "phone",
  "street",
  "city",
  "state",
  "postalCode",
] as const satisfies readonly (keyof AddressFormValues)[];

export const PAYMENT_FIELDS = [
  "method",
  "cardName",
  "cardNumber",
  "expiry",
  "cvv",
] as const satisfies readonly (keyof PaymentFormValues)[];
