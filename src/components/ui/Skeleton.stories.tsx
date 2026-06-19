import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton, SkeletonCard, SkeletonText } from "./Skeleton";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
  args: { className: "h-12 w-48" },
};

export const TextLines: Story = {
  render: () => <SkeletonText lines={4} className="w-64" />,
};

export const ProductCard: Story = {
  render: () => <SkeletonCard className="w-64" />,
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
};
