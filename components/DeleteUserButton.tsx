"use client";
import React from "react";
import { Button } from "@mui/material";
import { softDeleteUser } from "../utils/api";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {

  const handleClick = async () => {
    if (!confirm("本当にこのユーザーを削除しますか？")) return;
    try {
      await softDeleteUser(userId); //論理削除
      onDelete(userId);
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    } 
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="error"
    >
      削除
    </Button>
  );
};

export default DeleteUserButton;
