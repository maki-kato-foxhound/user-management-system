// components/parts/CustomCard.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

// TODO: メタデータ
const meta: Meta<typeof CustomCard> = {
  title: "Components/Parts/CustomCard",
  component: CustomCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};
export default meta;

// TODO: ストーリーの定義
type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {
  args: {
    title: "カードタイトル",
    description: "これはカスタムカードの説明です。",
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "アクションなしのカード",
    description: "アクションが含まれていないカードの説明。",
  },
};

// 背景色のあるカード
export const WithBgColor: Story = {
  args: {
    title: "背景色つきカード",
    description: "sx でカード全体の背景色を指定しています（primary.light）。",
    sx: { bgcolor: "primary.light" },
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};

// 右側に画像が表示されるカード
export const WithRightImage: Story = {
  args: {
    title: "右側に画像のカード",
    description: "テキストは左、サムネイルは右に表示します。",
    children: (
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        {/*左側(テキスト)*/}
        <Box flex={1} minWidth={220}>
          <Typography variant="body1">
            こちらは本文の例です。複数行のテキストでも自動で折り返されます。
          </Typography>
          <Typography variant="body2">
            追加の補足テキストやメタ情報をここに置けます。
          </Typography>
        </Box>
        {/*右側(画像)*/}
        <Box
          component="img"
          src="https://picsum.photos/seed/picsum/320/200"
          alt="サムネイル"
          sx={{
            width: 160,
            height: 100,
            opjectFit: "covor",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      </Box>
    ),
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
  },
};
//カーソルを置くと左右に揺れるカード
const wobble = keyframes`
 0%{transform: translateX(0) rotate(0deg);}
 25%{transform: translateX(-3px) rotate(-0.4deg);}
 50%{transform: translateX(0) rotate(0deg);}
 75%{transform: translateX(3px) rotate(0.4deg);}
 100%{transform: translateX(0) rotate(0deg);}
`;
export const WobbleOnHover: Story = {
  args: {
    title: "ホバーで左右に揺れるカード",
    description: "カーソルを置くとカードが小刻みに左右へ揺れます。",
    sx: {
      transition: "transform 150m ease",
      willChange: "transform",
      "&:hover": {
        animation: `${wobble} 1000ms ease-in-out infinite`,
        boxShadou: 6,
      },
      "@media(prefers-reduced-motion:reduce)": {
        "&hover": { animation: "none" },
      },
    },
    actions: (
      <>
        <CustomButton variantType="secondary">アクション1</CustomButton>
        <CustomButton variantType="danger">アクション2</CustomButton>
      </>
    ),
    children: null,
  },
};
