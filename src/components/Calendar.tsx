import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core/index.js'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string,
  today: string,
}

const Calendar = ({
  monthlyTransactions, 
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {

  const theme = useTheme()

  // 1.各日付の収支を計算する関数(呼び出し)
  const dailyBalances = calculateDailyBalances(monthlyTransactions)

  // 2.FullCalendar用のイベントを生成する関数
  const createCalendarEvents = (dailyBalance: Record<string,Balance>):CalendarContent[] => {
    return Object.keys(dailyBalance).map((date) => {
      const {income, expense, balance} = dailyBalance[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  // カレンダーイベントの見た目を作る関数
  const renderEventContent = (eventInfo: EventContentArg) => {
    return(
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  // 月の日付取得
  const handleDateSet = (datesSetInfo:DatesSetArg) => {
    const currentMonth = datesSetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if(isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  }

  // 日付を選択したときの処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  )
}

export default Calendar