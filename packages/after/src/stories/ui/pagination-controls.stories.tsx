import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { PaginationControls } from "@/components/ui/pagination-controls"

const meta = {
  title: "Components/UI/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PaginationControls>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const totalPages = 12
    return (
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
      />
    )
  },
}

