import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { MyContext } from "@/app/calendar/layout";
import { Props, Transaction } from "@/types";
import { financeCalculations } from "@/utils/financeCalculations";
import { formatCurrency } from "@/utils/formatting";

const MonthlySummary = () => {
  const contents = useContext<Props | undefined>(MyContext);
  const monthlyTransactions = contents?.monthlyTransactions;

  const { income, expense, balance } = financeCalculations(
    monthlyTransactions!
  );

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* 収入 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"} mb={2}>
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
              <Typography
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
                fontWeight="bold"
              >
                収入
              </Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.4rem",
                },
              }}
            >
              {formatCurrency(income)}円{/* 300,000円 */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 支出 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"} mb={2}>
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
              <Typography
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
                fontWeight="bold"
              >
                支出
              </Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.4rem",
                },
              }}
            >
              {formatCurrency(expense)}円
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 残高 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"} mb={2}>
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
              <Typography
                sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
                fontWeight="bold"
              >
                残高
              </Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.4rem",
                },
              }}
            >
              {formatCurrency(balance)}円
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
