// components/UserDetails.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import UserDetails from "./UserDetails";
import type { User } from "../types/User";

// TODO: メタデータ
const meta: Meta<typeof UserDetails> = {
  title: "Components/UserDetails",
  component: UserDetails,
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof UserDetails>;

// TODO:例となるユーザーデータを設定
const mockUser: User = {
  id: 1,
  name: "山田 太郎",
  email: "taro@example.com",
  role: "管理者",
  deleted: false,
};

// デフォルトストーリー
export const Default: Story = {
  args: {
    user: mockUser,
  },
};
