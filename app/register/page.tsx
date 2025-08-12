// app/register/page.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { useRouter } from 'next/navigation';

// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/users");  // ユーザー一覧ページへ遷移
  };
  return (
    <div>
      <RegisterForm onSuccess={handleSuccess}/> {/* ここで RegisterForm をレンダリングしている */}
    </div>
    
  );
};
export default RegisterPage;
