// components/parts/CustomModal.tsx

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
/** モーダルウィンドウが少し上下に動くモーダル用に追加 */

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

// TODO: propの設定
interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  /** モーダルウィンドウが少し上下に動くモーダル用に追加 */
  contentSx?: SxProps<Theme>;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  confirmText,
  cancelText,
  contentSx,
  ...rest
}) => {
  const handleClose = () => onClose(); //ModalのonCloseイベントの引数型とpropsのonClose型を合わせる
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
      {...rest}
    >
      <Box sx={[style, contentSx] as SxProps<Theme>}>
        <Typography
          id="custom-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography id="custom-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClose}> {cancelText ?? "キャンセル"}</Button>

          {onConfirm && (
            <Button variant="contained" color="primary" onClick={onConfirm}>
              {confirmText ?? "削除する"}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
