import { MyContext } from "@/app/calendar/layout";
import { Props } from "@/types";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addYears } from "date-fns";
import { ja } from "date-fns/locale";
import { useContext } from "react";

const YearSelector = () => {
  const contents = useContext<Props | undefined>(MyContext);

  //DatePicker内の日付をstateで管理
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      contents?.setCurrentYear(newDate);
    }
  };

  //去年を取得
  const handlePreviousYear = () => {
    const previousYear = addYears(contents?.currentYear!, -1);
    contents?.setCurrentYear(previousYear);
    // console.log(previousYear);
  };
  //来年を取得
  const handleNextYear = () => {
    const nextYear = addYears(contents?.currentYear!, 1);
    contents?.setCurrentYear(nextYear);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
      dateFormats={{ year: "yyyy年" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          color={"error"}
          variant="contained"
          onClick={handlePreviousYear}
        >
          去年
        </Button>
        <DatePicker
          onChange={handleDateChange}
          value={contents?.currentYear}
          label="年を選択"
          sx={{ mx: 2, background: "white" }}
          views={["year"]}
          format={`yyyy年`}
          slotProps={{ toolbar: { toolbarFormat: "yyyy年", hidden: false } }}
        />
        <Button color={"primary"} variant="contained" onClick={handleNextYear}>
          来年
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default YearSelector;
