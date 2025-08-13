// components/UserList.stories.tsx

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import UserList from "./UserList";
import type { User } from "../types/User";

// TODO: メタデータ
const meta: Meta<typeof UserList> = {
  title: "Components/UserList",
  component: UserList,
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof UserList>;

// TODO:例となるユーザーデータを設定
const mockUsers: User[] = [
  {
    id: 1,
    name: "山田 太郎",
    email: "taro@example.com",
    role: "管理者",
    deleted: false,
  },
  {
    id: 2,
    name: "佐藤 花子",
    email: "hanako@example.com",
    role: "一般",
    deleted: false,
  },
];

// TODO: デフォルトストーリーの設定
export const Default: Story = {
  args: { users: mockUsers },
};
