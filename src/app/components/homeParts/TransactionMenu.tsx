import { MyContext } from "@/app/calendar/layout";
import { Props } from "@/types";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconComponents from "../common/IconComponents";
import { formatCurrency } from "../../../utils/formatting";
import DailySummary from "./DailySummary";

const TransactionMenu = () => {
  const contents = useContext<Props | undefined>(MyContext);

  const menuDrawerWidth = 320;

  return (
    <Drawer
      sx={{
        width: contents?.isMobile ? "auto" : menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: contents?.isMobile ? "auto" : menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,

          ...(contents?.isMobile && {
            height: "80vh",
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }),
          ...(!contents?.isMobile && {
            top: 64,
            height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
          }),
        },
      }}
      variant={contents?.isMobile ? "temporary" : "permanent"}
      anchor={contents?.isMobile ? "bottom" : "right"}
      open={contents?.isMobileDrawerOpen}
      onClose={contents?.handleCloseMobileDrawer}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            fontWeight={"fontWeightBold"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            日付： {contents?.currentDay}
          </Typography>
          {/* 閉じるボタン */}
          {contents?.isMobile ? (
            <>
              <IconButton
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
                onClick={contents?.handleCloseMobileDrawer}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </Box>

        <DailySummary
          dailyTransactions={contents?.dailyTransactions}
          columns={contents?.isMobile ? 3 : 2}
        />
        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={contents?.handleAddTransactionForm}
          >
            内訳を追加
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {contents?.dailyTransactions.map((transactionDate) => (
                <ListItem key={transactionDate.id} disablePadding>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor:
                        transactionDate.type === "income"
                          ? (theme) => theme.palette.incomeColor.light
                          : (theme) => theme.palette.expenseColor.light,
                    }}
                    onClick={() =>
                      contents?.handleSelectTransaction(transactionDate)
                    }
                  >
                    <CardActionArea>
                      <CardContent>
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          wrap="wrap"
                        >
                          <Grid item xs={1}>
                            {/* icon */}

                            {IconComponents[transactionDate.category]}
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography
                              variant="caption"
                              display="block"
                              // gutterBottom
                            >
                              {transactionDate.category}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" gutterBottom>
                              {transactionDate.content}
                            </Typography>
                          </Grid>
                          <Grid item xs={4.5}>
                            <Typography
                              // gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              ¥{formatCurrency(transactionDate.amount)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default TransactionMenu;
