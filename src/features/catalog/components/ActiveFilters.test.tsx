import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ActiveFilters } from "@/features/catalog/components/ActiveFilters";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => new URLSearchParams("category=fashion&q=ankara"),
}));

describe("ActiveFilters", () => {
  it("renders active search and category pills", () => {
    render(<ActiveFilters />);

    expect(screen.getByText('Search: "ankara"')).toBeInTheDocument();
    expect(screen.getByText("Category: Fashion")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear all" })
    ).toBeInTheDocument();
  });

  it("clears search filter when dismissed", () => {
    replaceMock.mockClear();

    render(<ActiveFilters />);
    fireEvent.click(
      screen.getByRole("button", { name: 'Remove filter: Search: "ankara"' })
    );

    expect(replaceMock).toHaveBeenCalledWith("/products?category=fashion");
  });

  it("clears all filters", () => {
    replaceMock.mockClear();

    render(<ActiveFilters />);
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));

    expect(replaceMock).toHaveBeenCalledWith("/products");
  });
});
