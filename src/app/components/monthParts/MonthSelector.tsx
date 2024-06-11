import { MyContext } from "@/app/calendar/layout";
import { Props } from "@/types";
import { Box, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useContext } from "react";
import { addMonths } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ja } from "date-fns/locale";

const MonthSelector = () => {
  const contents = useContext<Props | undefined>(MyContext);

  //DatePicker内の日付をstateで管理
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      contents?.setCurrentMonth(newDate);
    }
  };

  //先月を取得
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(contents?.currentMonth!, -1);
    contents?.setCurrentMonth(previousMonth);
  };
  //次月を取得
  const handleNextMonth = () => {
    const nextMonth = addMonths(contents?.currentMonth!, 1);
    contents?.setCurrentMonth(nextMonth);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
      // dateFormats={{ monthAndYear: "yyyy年 MM月" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          color={"error"}
          variant="contained"
          onClick={handlePreviousMonth}
        >
          先月
        </Button>
        <DatePicker
          onChange={handleDateChange}
          value={contents?.currentMonth}
          label="年月を選択"
          sx={{ mx: 2, background: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{ toolbar: { toolbarFormat: "yyyy/MM", hidden: false } }}
        />
        <Button color={"primary"} variant="contained" onClick={handleNextMonth}>
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
