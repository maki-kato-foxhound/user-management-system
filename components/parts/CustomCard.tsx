// components/parts/CustomCard.tsx

import React from "react";
import { Card, CardContent, Typography, CardActions, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

// TODO: インターフェースを修正
interface CustomCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  sx,
  children,
}) => {
  // ベースとなる余白・レイアウト
  const baseCardSx: SxProps<Theme> = {
    minWidth: 275,
    mb: 2,
  };

  return (
    // 背景色をつけるために変更
    <Card sx={[baseCardSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      <CardContent>
        {/* タイトル */}
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>

        {/* 本文（任意） */}
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: children ? 1.5 : 0 }}
          >
            {description}
          </Typography>
        )}

        {/* 子要素（任意）：フォーム・表・追加テキストなど */}
        {children && <Box>{children}</Box>}
      </CardContent>

      {/* アクション（任意） */}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
