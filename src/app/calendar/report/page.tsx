"use client";

import React, { useContext } from "react";
import { MyContext } from "../layout";
import { Grid, Paper } from "@mui/material";
import MonthSelector from "../../components/monthParts/MonthSelector";
import CategoryChart from "../../components/monthParts/CategoryChart";
import BarChart from "../../components/monthParts/BarChart";
import { TransactionTable } from "../../components/monthParts/TransactionTable";
import CategoryChartYear from "../../components/monthParts/CategoryChartYear";

const ReportPage = () => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };
  const cardStyle = {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* 日付 */}
        <MonthSelector />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          {/* カテゴリグラフ */}
          <CategoryChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/* テーブル */}
        <TransactionTable />
      </Grid>
      {/* カード */}
      <Grid item xs={12}>
        <Paper sx={cardStyle}>
          <CategoryChartYear />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportPage;
