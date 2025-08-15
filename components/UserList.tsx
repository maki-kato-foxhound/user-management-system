"use client";

import { useState, useEffect, useMemo } from "react";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { User } from "../types/User";
import Link from "next/link";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [list, setList] = useState<User[]>(users);

  const [selectedId, setSelectedId] = useState<"all" | number>("all");
  const [selectedRole, setSelectedRole] = useState<"all" | string>("all");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setList(users), [users]); // 更新と同期

  // プルダウンの選択肢
  const idOptions = useMemo(() => {
    const ids = Array.from(new Set(list.map((userItem) => userItem.id)))
    return ids;
  }, [list]);

  const roleOptions = useMemo(() => {
    const roles = Array.from(
      new Set(list.map((userItem) => userItem.role))
    )
    return roles;
  }, [list]);

  const filtered = useMemo(() => {
    return list.filter((currentUser) => {
      const matchId = selectedId === "all" ? true : currentUser.id === selectedId;
      const matchRole = selectedRole === "all" ? true : currentUser.role === selectedRole;
      return matchId && matchRole;
    });
  }, [list, selectedId, selectedRole]);

  // 「削除」ボタンを押すと→モーダルを開く
  const openDeleteModal = (user: User) => {
    setTargetUser(user);
    setConfirmOpen(true);
  };
  // モーダルを閉じる（キャンセル/背景クリック時）
  const closeDeleteModal = () => {
    if (deleting) return; // 実行中は閉じない
    setConfirmOpen(false);
    setTargetUser(null);
  };

  // モーダルの「削除する」→ API 実行
  const confirmDelete = async () => {
    if (!targetUser) return;
    try {
      setDeleting(true);
      await softDeleteUser(targetUser.id); // ← 論理削除 API
      setList((prev) => prev.filter((user) => user.id !== targetUser.id)); // 行を消す
      setConfirmOpen(false);
      setTargetUser(null);
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    } finally {
      setDeleting(false);
    }
  };

  if (users.length === 0) {
    return <p>ユーザーがいません。</p>;
  }

  return (
    <div>
      {/* フィルタUI */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: 2,
          mb: 2,
        }}
      >
        {/* IDプルダウン */}
        <FormControl size="small">
          <InputLabel id="filter-id-label">ID</InputLabel>
          <Select
            labelId="filter-id-label"
            label="ID"
            value={selectedId === "all" ? "all" : String(selectedId)}
            onChange={(e) => {
              const selectedIdValue = e.target.value;
              setSelectedId(
                selectedIdValue === "all" ? "all" : Number(selectedIdValue)
              );
            }}
          >
            <MenuItem value="all">全て</MenuItem>
            {idOptions.map((id) => (
              <MenuItem key={id} value={String(id)}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 役職プルダウン */}
        <FormControl size="small">
          <InputLabel id="filter-role-label">役職</InputLabel>
          <Select
            labelId="filter-role-label"
            label="役職"
            value={selectedRole === "all" ? "all" : String(selectedRole)}
            onChange={(e) => {
              const selectedRoleValue = e.target.value;
              setSelectedRole(
                selectedRoleValue === "all" ? "all" : selectedRoleValue
              );
            }}
          >
            <MenuItem value="all">全て</MenuItem>
            {roleOptions.map((role) => (
              <MenuItem key={role} value={String(role)}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filtered.map((user) => (
        <div key={user.id} style={{ marginBottom: 12 }}>
          <CustomCard
            title={user.name}
            description={
              <>
                <div>メール：{user.email}</div>
                <div>役割：{user.role}</div>
                <div>ID：{user.id}</div>
              </>
            }
            actions={
              <>
                <CustomButton
                  variantType="primary"
                  component={Link}
                  href={`/users/${user.id}/details`}
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  詳細
                </CustomButton>
                <CustomButton
                  variantType="secondary"
                  component={Link}
                  href={`/users/${user.id}/edit`}
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  編集
                </CustomButton>
                <CustomButton
                  variantType="danger"
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={() => openDeleteModal(user)}
                >
                  削除
                </CustomButton>
              </>
            }
          />
        </div>
      ))}

      {/* 削除確認用モーダル */}
      <CustomModal
        open={confirmOpen}
        onClose={closeDeleteModal} // 背景クリック/キャンセルで閉じる
        onConfirm={confirmDelete} // 「削除する」でAPI実行
        title="ユーザーを削除しますか？"
        content={
          <div>
            {targetUser ? (
              <>
                <div>対象ユーザー</div>
                <div>{targetUser.name}</div>
              </>
            ) : null}
          </div>
        }
      />
    </div>
  );
};

export default UserList;
