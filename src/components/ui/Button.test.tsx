import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Add to cart</Button>);
    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    render(<Button variant="destructive">Remove</Button>);
    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass(
      "bg-destructive",
    );
  });

  it("respects disabled state", () => {
    render(<Button disabled>Unavailable</Button>);
    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});
