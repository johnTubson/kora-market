import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StepIndicator } from "@/features/checkout/components/StepIndicator";

describe("StepIndicator", () => {
  it("marks the current step", () => {
    render(<StepIndicator currentStep={2} />);
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "step");
  });

  it("highlights the review step when on step 3", () => {
    render(<StepIndicator currentStep={3} />);
    const nav = screen.getByRole("navigation", { name: "Checkout progress" });
    expect(within(nav).getByText("3")).toHaveAttribute("aria-current", "step");
    expect(within(nav).getByText("Review")).toHaveClass("text-foreground");
  });
});
