"use client";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CSSProperties } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

interface SideBarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

interface menuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: SideBarProps) => {
  const pathnem = usePathname();

  const MenuItems: menuItem[] = [
    { text: "カレンダー", path: "/", icon: CalendarMonthIcon },
    { text: "月々の合計", path: "/report", icon: EqualizerIcon },
    { text: "年間の合計", path: "/yearly", icon: ImportContactsIcon },
    { text: "マイページ", path: "/mypage", icon: LocalFloristIcon },
    { text: "入力検索", path: "/search", icon: SearchIcon },
    { text: "エクスポート", path: "/export", icon: FileUploadIcon },
  ];
  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  };

  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)",
  };

  //ウィンドウ幅が1200px以下になったときに適応させる
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleMenuMobile = () => {
    if (isMobile) {
      handleDrawerClose();
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItems.map((item, index) => (
          <Link
            key={item.text}
            href={item.path}
            style={{
              ...baseLinkStyle,
              ...(item.path === pathnem ? activeLinkStyle : {}),
            }}
            onClick={handleMenuMobile}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* サイドバー */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* スマホのdrawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* PCのdrawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
