// app/users/[id]/details/page.tsx
import React from "react";
import { fetchUserById } from "@/utils/api";
import UserDetails from "@/components/UserDetails";
import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function UserDetailsPage({ params }: PageProps) {
  const userId = Number(params.id);
  if (!Number.isFinite(userId)) {
    redirect("/users?error=invalid-id");
  }

  const user = await fetchUserById(userId);
  if (!user) {
    redirect("/users?error=not-found");
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー詳細
      </Typography>
      <UserDetails user={user} />
    </Box>
  );
}
