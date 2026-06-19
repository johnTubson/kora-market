import type { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "./Button";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ankara Print Dress</CardTitle>
        <CardDescription>Handmade in Lagos</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">₦24,500</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-full max-w-sm p-4">
      <CardTitle>Order summary</CardTitle>
      <CardDescription className="mt-1">2 items · ₦48,000</CardDescription>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-full max-w-sm p-4">
      <p className="text-sm text-muted-foreground">
        Free delivery on orders over ₦50,000
      </p>
    </Card>
  ),
};
