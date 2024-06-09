"use client";

import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { createContext, useState } from "react";
import SideBar from "./components/common/SideBar";
import { Outlet } from "react-router-dom";
import MainHooks from "./hooks/MainHooks";
import { Props, Transaction } from "@/types";

const drawerWidth = 240;

export const MyContext = createContext<Props | undefined>(undefined);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  //カスタムフックス
  const contents = MainHooks();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <MyContext.Provider value={contents}>
            <Box
              sx={{
                display: { md: "flex" },
                bgcolor: grey[100],
                minHeight: "100vh",
              }}
            >
              <CssBaseline />
              {/* ヘッダー */}
              <AppBar
                position="fixed"
                sx={{
                  width: { md: `calc(100% - ${drawerWidth}px)` },
                  ml: { md: `${drawerWidth}px` },
                }}
              >
                <Toolbar sx={{ bgcolor: "#8bc34a" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    家計簿アプリ
                  </Typography>
                </Toolbar>
              </AppBar>
              {/* サイドバー */}
              <SideBar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
              />
              {/* メインコンテンツ */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                <Toolbar />
                {/* <Outlet /> */}
                <div>{children}</div>
              </Box>
            </Box>
          </MyContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
