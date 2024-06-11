"use client";

import * as React from "react";
import { createContext, useState } from "react";
import { Props, Transaction } from "@/types";

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
