import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";

const meta = {
  title: "Layout/Shell",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderAndFooter: Story = {
  render: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <h1 className="text-3xl font-bold">Page content</h1>
          <p className="mt-2 text-muted-foreground">
            Layout shell with sticky header, mobile nav, and footer.
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  ),
};

export const ContainerWidths: Story = {
  render: () => (
    <Container>
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Max width 7xl · responsive horizontal padding
      </div>
    </Container>
  ),
};
