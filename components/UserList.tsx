"use client";

import { useState, useEffect } from "react";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { User } from "../types/User";
import Link from "next/link";
import { softDeleteUser } from "@/utils/api";
import CustomModal from "./parts/CustomModal";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [list, setList] = useState<User[]>(users);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setList(users), [users]); // 更新と同期

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
      {list.map((user) => (
        <div key={user.id} style={{ marginBottom: 12 }}>
          <CustomCard
            title={user.name}
            description={
              <>
                <div>メール：{user.email}</div>
                <div>役割：{user.role}</div>
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
