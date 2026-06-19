"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { ToastProvider, useToast } from "./Toast";

function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        onClick={() =>
          showToast({
            title: "Added to cart",
            description: "Ankara Print Dress × 1",
            variant: "primary",
          })
        }
      >
        Primary toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          showToast({
            title: "Promo applied",
            description: "10% off your first order.",
            variant: "secondary",
          })
        }
      >
        Secondary toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          showToast({
            title: "Saved for later",
            variant: "ghost",
          })
        }
      >
        Ghost toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          showToast({
            title: "Payment failed",
            description: "Please check your card details.",
            variant: "destructive",
          })
        }
      >
        Destructive toast
      </Button>
    </div>
  );
}

const meta = {
  title: "UI/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
