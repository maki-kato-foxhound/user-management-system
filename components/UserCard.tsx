// components/UserCard.tsx
"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { User } from "../types/User";

import { useRouter } from "next/navigation";
import CustomButton from "./parts/CustomButton";
import { softDeleteUser } from "../utils/api";

interface UserCardProps {
  user: User;
  onDelete?: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const router = useRouter();
  const goDetails = () => router.push(`/users/${user.id}/details`);
  const handleDelete = async () => {
    if (!confirm("本当にこのユーザーを削除しますか？")) return;
    try {
      await softDeleteUser(user.id); // 論理削除
      onDelete?.(user.id); // 受け渡しは変えない
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    }
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={goDetails} variant="outlined">
          詳細
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={`/users/${user.id}/edit`}
        >
          編集
        </Button>
        <CustomButton variantType="danger" onClick={handleDelete}>
          削除
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
