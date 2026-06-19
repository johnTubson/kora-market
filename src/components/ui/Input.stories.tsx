import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHint: Story = {
  args: {
    label: "Phone",
    placeholder: "+234 800 000 0000",
    hint: "We'll only use this for delivery updates.",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    defaultValue: "invalid-email",
    error: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Order ID",
    defaultValue: "KM-12345",
    disabled: true,
  },
};
