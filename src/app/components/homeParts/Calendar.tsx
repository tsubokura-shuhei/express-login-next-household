import React, { useContext, useEffect } from "react";
import { MyContext } from "@/app/calendar/layout";
import { Props, Balance, CalendarContent, Transaction } from "@/types";
import MainHooks from "@/app/hooks/MainHooks";
import { useTheme } from "@mui/material";
import { calculateDailyBalances } from "../../../utils/financeCalculations";
import { formatCurrency } from "../../../utils/formatting";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { isSameMonth } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../calendar.css";

const Calendar = () => {
  const theme = useTheme();

  const contents = useContext<Props | undefined>(MyContext);

  const setCurrentMonth = contents?.setCurrentMonth;

  const events = [
    // { title: "Meeting", start: new Date() },
    { title: "Meeting", start: "2024-03-06" },
    {
      title: "sleeping",
      start: "2024-03-12",
      income: 300,
      expense: 200,
      balance: 100,
    },
  ];

  //日付ごとの支出を算出
  const dailyBalances = calculateDailyBalances(contents?.monthlyTransactions!);

  //2.FullCalendar用のイベントを生成する関数
  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const calendarEvents = createCalendarEvents(dailyBalances);

  const backgroundEvent = {
    start: contents?.currentDay,
    display: "background",
    backgroundColor: theme.palette.mainColor.main,
  };

  const renderEvent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;

    contents?.setCurrentMonth(datesetInfo.view.currentStart);

    //今日の日付のデータを取得
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      contents?.setCurrentDay(contents?.today);
    }
    contents?.setCurrentDay(contents?.today);
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEvent}
      datesSet={handleDateSet}
      dateClick={contents?.handleDateClick}
      contentHeight="auto"
    />
  );
};

export default Calendar;
