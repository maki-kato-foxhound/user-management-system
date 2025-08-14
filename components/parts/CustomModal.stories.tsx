// components/parts/CustomModal.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box } from "@mui/material";

// TODO: メタデータ
const meta: Meta<typeof CustomModal> = {
  title: "Components/Parts/CustomModal",
  component: CustomModal,
  tags: ["autodocs"],
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomModal>;

// TODO: デフォルトストーリーの作成
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
      alert("OKをクリックしました");
      setOpen(false);
    };

    return (
      <Box>
        {/* クリックでモーダル開閉させる */}
        <CustomButton variantType="primary" onClick={handleOpen}>
          モーダルを開く
        </CustomButton>
        <CustomModal
          // TODO: Propを渡す
          open={open}
          // onCloceはsetOpenにfalseを渡す
          onClose={handleClose}
          // onConfirmはalert()を使ってクリックしたことを知らせて
          // setOpenにfalseを渡す
          onConfirm={handleConfirm}
          title="確認"
          content={
            <span>
              この操作を実行しますか？
              <br />
              OKで実行、キャンセルで閉じます。
            </span>
          }
          confirmText="OK"
          cancelText="キャンセル"
        />
      </Box>
    );
  },
};
