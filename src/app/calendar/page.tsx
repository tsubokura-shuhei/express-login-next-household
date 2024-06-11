"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";
import MonthlySummary from "../components/homeParts/MonthlySummary";
import Calendar from "../components/homeParts/Calendar";
import TransactionMenu from "../components/homeParts/TransactionMenu";
import TransactionForm from "../components/homeParts/TransactionForm";
import { MyContext } from "./layout";
import { Props } from "@/types";
import { useContext } from "react";

export default function Home(href: any) {
  const contents = useContext<Props | undefined>(MyContext);
  // console.log(contents?.transaction);

  // console.log(`${href}aa`, "Home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* 左側のコンテンツ */}
        <Box sx={{ flexGrow: 1 }}>
          <MonthlySummary />
          <Calendar />
        </Box>
        {/* 右側のコンテンツ */}
        <Box>
          <TransactionMenu />
          <TransactionForm />
        </Box>
      </Box>
    </>
  );
}
