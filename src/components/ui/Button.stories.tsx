import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Add to cart", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "View details", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Cancel", variant: "ghost" },
};

export const Destructive: Story = {
  args: { children: "Remove item", variant: "destructive" },
};

export const Disabled: Story = {
  args: { children: "Unavailable", variant: "primary", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
