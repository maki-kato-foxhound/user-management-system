// components/parts/CustomModal.stories.tsx

import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

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
//ホーム画面から遷移しない時間が続くと表示されるモーダル
export const IdleTimeoutModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [idleTime, setidleTime] = useState(0);

    // 1秒ごとに idleTime を加算
    useEffect(() => {
      const timer = setInterval(() => {
        setidleTime((prev) => prev + 1);
      }, 1000);
      //10秒経過でモーダル表示
      if (idleTime >= 5) {
        setOpen(true);
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }, [idleTime]);

    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
      alert("続行します");
      setOpen(false);
      setidleTime(0);
    };

    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          ユーザー管理システムへようこそ
        </Typography>
        <Typography variant="h6" color="text.secondary">
          このシステムでは、ユーザーの一覧表示、編集、削除が可能です。
        </Typography>

        {/*モーダル*/}
        <CustomModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="操作がありません"
          content={<span>一定時間操作がありません。続行しますか？</span>}
          confirmText="続行"
          cancelText="この通知を表示しない"
        />
      </Box>
    );
  },
};
//下までスクロールが完了したら表示されるモーダル
export const ShowOnScrollEnd: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false); // 一度だけ開く用
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (hasOpened) return;
      const el = e.currentTarget;
      const threshold = 8;
      const reachedBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

      if (reachedBottom) {
        setOpen(true);
        setHasOpened(true);
      }
    };
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
      alert("続行します");
      setOpen(false);
      // 必要なら再度スクロールで出したいときは下を有効化
      // setHasOpened(false);
    };
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          スクロールで最下部に到達するとモーダルを表示
        </Typography>
        {/* スクロール可能領域 */}
        <Box
          ref={containerRef}
          onScroll={onScroll}
          sx={{
            height: 320,
            overflow: "auto",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          {" "}
          <Typography>
            これはデモ用のスクロールコンテナです。最下部までスクロールしてください。
          </Typography>
          {[...Array(13)].map((_, i) => (
            <Typography key={i}>
              {i + 1}.
              ダミーテキスト
            </Typography>
          ))}
          <Typography sx={{ fontWeight: 600 }}>
            ここが最下部付近です。少しだけスクロールするとモーダルが開きます。
          </Typography>
        </Box>

        {/* モーダル */}
        <CustomModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="スクロール完了"
          content={<span>最下部までスクロールしました。続行しますか？</span>}
          confirmText="続行"
          cancelText="キャンセル"
        />
      </Box>
    );
  },
};
//モーダルウィンドウが少し上下に動くモーダル
export const BouncyOnOpen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    // openがtrueになるたびに一回実行される軽いバウンス
    const bounce = keyframes`
      0%   { transform: translate(-50%, -54%); }
      50%  { transform: translate(-50%, -46%); }
      100% { transform: translate(-50%, -50%); }
    `;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
      alert("続行します");
      setOpen(false);
    };

    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          表示時に軽く上下に揺れるモーダル
        </Typography>
        <CustomButton variantType="primary" onClick={handleOpen}>
          モーダルを開く
        </CustomButton>

        <CustomModal
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="ようこそ"
          content={<span>モーダル表示時に少しだけ上下に動きます。</span>}
          confirmText="続行"
          cancelText="キャンセル"
          contentSx={{
            // base transform は CustomModal 側の style にあり、
            // それを上書きする形でアニメーションを適用
            animation: `${bounce} 0.6s ease-out`,
            willChange: "transform",
          }}
        />
      </Box>
    );
  },
};