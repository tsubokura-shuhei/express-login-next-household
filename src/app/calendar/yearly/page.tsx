"use client";
import { Props } from "@/types";
import { financeCalculations } from "@/utils/financeCalculations";
import React, { useContext } from "react";
import { MyContext } from "@/app/calendar/layout";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { formatCurrency } from "@/utils/formatting";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import YearSelector from "../../components/yearParts/YearSelector";
import BarChartYearIncome from "../../components/yearParts/BarChartYearIncome";
import BarChartYearExpence from "../../components/yearParts/BarChartYearExpence";
import CategoryChartYear from "../../components/monthParts/CategoryChartYear";
import CategoryCardYear from "../../components/yearParts/CategoryCardYear";

const YearPage = () => {
  const contents = useContext<Props | undefined>(MyContext);

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

  //年間の合計データ
  const { income, expense, balance } = financeCalculations(
    contents?.yearTransactions!
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mb={2}>
        {/* 日付 */}
        <YearSelector />
      </Grid>
      {/* 年間合計 */}
      <Grid item xs={12}>
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
          {/* 収入 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.incomeColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">収入</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  }}
                >
                  {formatCurrency(income)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 支出 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.expenseColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">支出</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  }}
                >
                  {formatCurrency(expense)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 残高 */}
          <Grid item xs={4} display={"flex"} flexDirection={"column"}>
            <Card
              sx={{
                bgcolor: (theme) => theme.palette.balanceColor.main,
                color: "white",
                borderRadius: "10px",
                flexGrow: 1,
              }}
            >
              <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                <Stack direction={"row"}>
                  <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                  <Typography fontWeight="bold">残高</Typography>
                </Stack>
                <Typography
                  textAlign={"right"}
                  variant="h5"
                  fontWeight={"fontWeightBold"}
                  sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  }}
                >
                  {formatCurrency(balance)}円
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChartYearIncome />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChartYearExpence />
        </Paper>
      </Grid>

      {/* カード */}
      <Grid item xs={12}>
        <Paper sx={cardStyle}>
          <CategoryCardYear />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        {/* テーブル */}
        {/* <TransactionTable
          yearTransactions={yearTransactions}
          onDeleteTransaction={onDeleteTransaction}
        /> */}
      </Grid>
    </Grid>
  );
};

export default YearPage;
