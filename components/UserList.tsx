"use client";

import { useState, useEffect } from "react";
import CustomCard from "./parts/CustomCard";
import CustomButton from "./parts/CustomButton";
import { User } from "../types/User";
import Link from "next/link";
import { softDeleteUser } from "@/utils/api";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [list, setList] = useState<User[]>(users);
  useEffect(() => setList(users), [users]); // 更新と同期

  const handleDeleted = async (deletedId: number) => {
    if (!confirm("本当にこのユーザーを削除しますか？")) return;
    try {
      await softDeleteUser(deletedId); // 論理削除
      setList((prev) => prev.filter((user) => user.id !== deletedId));
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
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
                  onClick={() => handleDeleted(user.id)}
                >
                  削除
                </CustomButton>
              </>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
