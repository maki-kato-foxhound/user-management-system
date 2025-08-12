// components/RegisterForm.tsx
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUser } from "../utils/api";

interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}
// 成功後のリダイレクトなどを行う場合
interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}
// TODO: 新規登録フォームコンポーネントを実装する
const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  disabled = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser({ name: data.name, email: data.email, role: data.role });
      setSuccess(true);
      setError(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("ユーザーの登録に失敗しました。" + err);
      setSuccess(false);
      if (onError) onError(err);
    }
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">登録が完了しました。</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 名前フィールド */}
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register("name", { required: "名前は必須です。" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        {/* メールフィールド */}
        <TextField
          label="メール"
          type="email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "メールは必須です。",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "有効なメールアドレスを入力してください。",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        {/* ロールフィールド */}
        <TextField
          label="役職"
          fullWidth
          margin="normal"
          {...register("role", { required: "ロール設定は必須です。" })}
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        {/* 送信ボタン */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};
export default RegisterForm;
