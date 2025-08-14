// components/parts/CustomButton.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./CustomButton";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { CircularProgress } from "@mui/material";

const meta: Meta<typeof CustomButton> = {
  title: "Components/Parts/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

// TODO: メタデータのエクスポート
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomButton>;

export const Primary: Story = {
  args: {
    variantType: "primary",
    children: "Primary Button",
  },
};

// TODO: 上記サンプルを参考に[Secondary][Danger]を設定する
export const Secondary: Story = {
  args: {
    variantType: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    variantType: "danger",
    children: "Danger Button",
  },
};

// アイコン＋ラベル（先頭にアイコン）
export const WithStartIcon: Story = {
  args: {
    variantType: "primary",
    startIcon: <AddIcon />, // ← 先頭アイコン
    children: "追加",
  },
};

// アイコン＋ラベル（末尾にアイコン）
export const WithEndIcon: Story = {
  args: {
    variantType: "secondary",
    endIcon: <SendIcon />, // ← 末尾アイコン
    children: "送信",
  },
};

// --- グラデーション（インディゴ→ブルー）
export const GradientIndigoBlue: Story = {
  args: {
    variantType: "primary",
    children: "グラデーション",
    sx: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "#fff",
      border: 0,
      boxShadow: "none",
      "&:hover": {
        background: "linear-gradient(135deg, #5b0ed1 0%, #1e6df5 100%)",
      },
    },
  },
};

// 3秒だけローディングして戻るボタン
export const LoadingFor3Seconds: Story = {
  args: {
    variantType: "primary",
    children: "送信",
    sx: { minWidth: 120 }, // 文字が「処理中...」に変わっても横幅がブレないように
  },
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    const timerRef = React.useRef<number | null>(null);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      // 既存のonClickがあれば先に呼ぶ
      args.onClick?.(e);
      if (loading) return;

      setLoading(true);
      timerRef.current = window.setTimeout(() => {
        setLoading(false);
        timerRef.current = null;
      }, 3000);
    };

    React.useEffect(() => {
      return () => {
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
      };
    }, []);

    return (
      <CustomButton
        {...args}
        onClick={handleClick}
        disabled={loading || args.disabled}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : args.startIcon}
      >
        {loading ? "処理中..." : args.children}
      </CustomButton>
    );
  },
};