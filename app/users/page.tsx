"use client";

import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import { fetchUsers } from "../../utils/api";
import UserList from "../../components/UserList";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("ユーザーの取得に失敗しました。" + err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ユーザー一覧
      </Typography>
      <UserList users={users} />
    </Box>
  );
};

export default UsersPage;
