import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "New", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Sale", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Draft", variant: "ghost" },
};

export const Destructive: Story = {
  args: { children: "Out of stock", variant: "destructive" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">New</Badge>
      <Badge variant="secondary">Sale</Badge>
      <Badge variant="ghost">Draft</Badge>
      <Badge variant="destructive">Out of stock</Badge>
    </div>
  ),
};
