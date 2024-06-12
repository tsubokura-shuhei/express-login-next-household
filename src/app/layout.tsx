"use client";

import * as React from "react";
import { createContext, useState } from "react";
import { Props, Transaction } from "@/types";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="ja">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
