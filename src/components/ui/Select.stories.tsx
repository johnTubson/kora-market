import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Living" },
  { value: "food", label: "Food & Groceries" },
];

export const Default: Story = {
  args: {
    label: "Category",
    options: categoryOptions,
    placeholder: "Select a category",
  },
};

export const WithHint: Story = {
  args: {
    label: "Sort by",
    options: [
      { value: "newest", label: "Newest" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
    ],
    hint: "Filter products on the listing page.",
  },
};

export const WithError: Story = {
  args: {
    label: "Category",
    options: categoryOptions,
    error: "Please select a category.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Region",
    options: [{ value: "ng", label: "Nigeria" }],
    disabled: true,
    defaultValue: "ng",
  },
};
