// components/UserDetails.tsx
import React from "react";
import { User } from "../types/User";
import { Paper, Typography, Box } from "@mui/material";

export interface UserDetailsProps {
  user: User;
}

const UserDetails:React.FC<UserDetailsProps> = ({user}) => {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー詳細
      </Typography>

      <Box sx={{ display: "grid", rowGap: 1.5 }}>
        <Typography variant="body1">ID: {user.id}</Typography>
        <Typography variant="body1">名前: {user.name}</Typography>
        <Typography variant="body1">メールアドレス: {user.email}</Typography>
        <Typography variant="body1">役割: {user.role}</Typography>
      </Box>
    </Paper>
  );
};

export default UserDetails;