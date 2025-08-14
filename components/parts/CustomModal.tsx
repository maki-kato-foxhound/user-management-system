// components/parts/CustomModal.tsx

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

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
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
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
      <Box sx={style}>
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
          <Button onClick={handleClose}>キャンセル</Button>
          {onConfirm && (
            <Button variant="contained" color="primary" onClick={onConfirm}>
              確認
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
