// app/users/[id]/edit/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import EditUserForm from "../../../../components/EditUserForm";
import { useParams, useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";

// TODO: URLパラメータからユーザーIDを取得し、EditUserFormコンポーネントに渡す
const EditUserPage: React.FC = () => {
  const params = useParams();
  const userId = params.id ? Number(params.id) : undefined; // idがあるかどうか確認
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/users"); // ユーザー一覧ページへ遷移
  };
  
  if (!userId) {
    //userIdが取得できない場合
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          ユーザーIDが無効です。
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm userId={userId} onSuccess={handleSuccess} />
    </Box>
  );
};

export default EditUserPage;
