"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useTransition,
  useSyncExternalStore,
} from "react";
import {
  FormProvider,
  useForm,
  useWatch,
  type FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { createOrder } from "@/features/checkout/actions/create-order";
import { StepIndicator } from "@/features/checkout/components/StepIndicator";
import {
  selectCartSubtotal,
  useCartStore,
} from "@/features/cart/store/cart-store";
import { PriceDisplay } from "@/features/catalog/components/PriceDisplay";
import { useCurrency } from "@/providers/currency-provider";
import {
  ADDRESS_FIELDS,
  checkoutSchema,
  PAYMENT_FIELDS,
  type CheckoutFormValues,
} from "@/lib/validators";

const AddressStep = dynamic(
  () =>
    import("@/features/checkout/components/AddressStep").then((module) => ({
      default: module.AddressStep,
    })),
  { loading: () => <StepSkeleton /> }
);

const PaymentStep = dynamic(
  () =>
    import("@/features/checkout/components/PaymentStep").then((module) => ({
      default: module.PaymentStep,
    })),
  { loading: () => <StepSkeleton /> }
);

const ReviewStep = dynamic(
  () =>
    import("@/features/checkout/components/ReviewStep").then((module) => ({
      default: module.ReviewStep,
    })),
  { loading: () => <StepSkeleton /> }
);

function StepSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading checkout">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-11 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}

function subscribeToCartHydration(onStoreChange: () => void) {
  return useCartStore.persist.onFinishHydration(onStoreChange);
}

function getCartHydrated() {
  return useCartStore.persist.hasHydrated();
}

function getServerHydrated() {
  return false;
}

export function CheckoutWizard() {
  const router = useRouter();
  const hydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrated,
    getServerHydrated
  );
  const { currency } = useCurrency();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: {
        fullName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
      payment: {
        method: "card",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        variantName: item.variantName,
        quantity: item.quantity,
        priceNGN: item.priceNGN,
      })),
      currency,
    },
    mode: "onBlur",
  });

  const { trigger, handleSubmit, control } = methods;
  const paymentMethod = useWatch({ control, name: "payment.method" });

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, router]);

  useEffect(() => {
    methods.setValue(
      "items",
      items.map((item) => ({
        id: item.id,
        name: item.name,
        variantName: item.variantName,
        quantity: item.quantity,
        priceNGN: item.priceNGN,
      }))
    );
    methods.setValue("currency", currency);
  }, [items, currency, methods]);

  async function handleNext() {
    setSubmitError(null);

    if (step === 1) {
      const addressFields = ADDRESS_FIELDS.map(
        (field) => `address.${field}` as FieldPath<CheckoutFormValues>
      );
      const valid = await trigger(addressFields);
      if (valid) setStep(2);
      return;
    }

    if (step === 2) {
      const paymentFields: FieldPath<CheckoutFormValues>[] =
        paymentMethod === "card"
          ? PAYMENT_FIELDS.map(
              (field) => `payment.${field}` as FieldPath<CheckoutFormValues>
            )
          : ["payment.method"];
      const valid = await trigger(paymentFields);
      if (valid) setStep(3);
    }
  }

  function handleBack() {
    setSubmitError(null);
    setStep((current) => Math.max(1, current - 1));
  }

  function onSubmit(data: CheckoutFormValues) {
    setSubmitError(null);
    startTransition(async () => {
      const result = await createOrder(data);
      if (result?.error) {
        setSubmitError(result.error);
      }
    });
  }

  if (!hydrated || items.length === 0) {
    return <StepSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="grid gap-8 lg:grid-cols-[1fr_300px]"
      >
        <div className="space-y-6">
          <StepIndicator currentStep={step} />

          <div className="rounded-lg border border-border p-4 sm:p-6">
            {step === 1 ? <AddressStep /> : null}
            {step === 2 ? <PaymentStep /> : null}
            {step === 3 ? <ReviewStep /> : null}
          </div>

          {submitError ? (
            <p className="text-sm text-destructive" role="alert">
              {submitError}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(onSubmit)}
              >
                {isPending ? "Placing order…" : "Place order"}
              </Button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="text-lg font-semibold">Order total</h2>
          <p className="mt-2 text-2xl font-bold text-primary">
            <PriceDisplay amountNGN={subtotal} />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {items.reduce((count, item) => count + item.quantity, 0)} items
          </p>
        </aside>
      </form>
    </FormProvider>
  );
}
