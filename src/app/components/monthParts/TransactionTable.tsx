import * as React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import { compareDesc, parseISO } from "date-fns";
import { Props, Transaction } from "@/types";
import { financeCalculations } from "@/utils/financeCalculations";
import { formatCurrency } from "@/utils/formatting";
import IconComponents from "../common/IconComponents";
import { MyContext } from "@/app/calendar/layout";

interface TransactionTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;

  rowCount: number;
}

//テーブルヘッド
function TransactionTableHead(props: TransactionTableHeadProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        <TableCell align="left">日付</TableCell>
        <TableCell align="left">カテゴリ</TableCell>
        <TableCell align="left">金額</TableCell>
        <TableCell align="left">内容</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface TransactionTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}

// ツールバー
function TransactionTableToolbar(props: TransactionTableToolbarProps) {
  const { numSelected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} 件 選択中
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          月の収支
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface FinancialItemProps {
  title: string;
  value: string;
  color: string;
}

// FinancialItem(コンポーネントの作成)
function FinancialItem({ title, value, color }: FinancialItemProps) {
  return (
    <Grid item xs={4} textAlign={"center"}>
      <Typography variant="subtitle1" component={"div"}>
        {title}
      </Typography>
      <Typography
        component={"span"}
        fontWeight={"fontWeightBold"}
        sx={{
          color: color,
          fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
          wordBreak: "break-word",
        }}
      >
        {value}円
      </Typography>
    </Grid>
  );
}

interface TransactionTableProps {
  monthlyTransactions: Transaction[];
  onDeleteTransaction: (
    transactionId: string | readonly string[]
  ) => Promise<void>;
}

// テーブル本体
export const TransactionTable = () => {
  const contents = React.useContext<Props | undefined>(MyContext);
  const theme = useTheme();
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = contents?.monthlyTransactions!.map((n) => n.id);
      setSelected(newSelected!);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - contents?.monthlyTransactions.length!
        )
      : 0;

  const visibleRows = React.useMemo(() => {
    const sortedMonthlyTransactions = [...contents?.monthlyTransactions!].sort(
      (a, b) => compareDesc(parseISO(a.date), parseISO(b.date))
    );
    return sortedMonthlyTransactions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, contents?.monthlyTransactions]);

  const { income, expense, balance } = financeCalculations(
    contents?.monthlyTransactions!
  );

  //選択したリストを削除する関数
  const handleDelete = () => {
    contents?.handleDeleteTransaction(selected);
    setSelected([]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* 収支の合計 */}
        <Grid container sx={{ borderBottom: "1px solid rgba(224,224,224,1)" }}>
          <FinancialItem
            title={"収入"}
            value={formatCurrency(income)}
            color={theme.palette.incomeColor.main}
          />
          <FinancialItem
            title={"支出"}
            value={formatCurrency(expense)}
            color={theme.palette.expenseColor.main}
          />
          <FinancialItem
            title={"残高"}
            value={formatCurrency(balance)}
            color={theme.palette.balanceColor.main}
          />

          {/* <Grid item>
            <Typography>収入</Typography>
            <Typography sx={{ color: theme.palette.incomeColor.main }}>
              ¥{income}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>支出</Typography>
            <Typography sx={{ color: theme.palette.expenseColor.main }}>
              ¥{expense}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>残高</Typography>
            <Typography sx={{ color: theme.palette.balanceColor.main }}>
              ¥{balance}
            </Typography>
          </Grid> */}
        </Grid>

        {/* ツールバー */}
        <TransactionTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
        />

        {/* 取引一覧 */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TransactionTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={contents?.monthlyTransactions.length!}
            />

            {/* 取引内容 */}
            <TableBody>
              {visibleRows.map((transactionDate, index) => {
                const isItemSelected = isSelected(transactionDate.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, transactionDate.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transactionDate.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {transactionDate.date}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {IconComponents[transactionDate.category]}
                      {transactionDate.category}
                    </TableCell>
                    <TableCell align="left">
                      {formatCurrency(transactionDate.amount)}円
                    </TableCell>
                    <TableCell align="left">
                      {transactionDate.content}
                    </TableCell>
                    {/* <TableCell align="right">{transactionDate.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* テーブル下部 */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contents?.monthlyTransactions.length!}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="1ページあたりの表示数"
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};
