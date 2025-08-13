// components/DeleteUserButton.stories.tsx

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DeleteUserButton from "./DeleteUserButton";

// TODO: メタデータ
const meta: Meta<typeof DeleteUserButton> = {
  title: "Components/DeleteUserButton",
  component: DeleteUserButton,
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof DeleteUserButton>;

export const Default: Story = {
  args: {
    userId: 1, // 例となるユーザーID
    onDelete: (id) => {
      alert(`onDeleteが呼ばれました。削除対象ID: ${id}`);
    },
  },
};
