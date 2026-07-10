import React, { useMemo, useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Transaction } from '../types'
import { formatDate } from 'date-fns'
import { Schema } from '../validations/schema'
import useMonthlyTransactions from '../hooks/useMonthlyTransactions'
import { useAppContext } from '../context/AppContext'

// interface HomeProps {
//   monthlyTransactions: Transaction[],
//   setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
//   onSaveTransaction: (transaction:Schema) => Promise<void>;
//   onDeleteTransaction: (transactionId:string | readonly string[]) => Promise<void>;
//   onUpdateTransaction:  (transaction:Schema, transactionId: string) => Promise<void>
// }

const Home = () =>
// {  
//   monthlyTransactions,
//   setCurrentMonth,
//   onSaveTransaction,
//   onDeleteTransaction,
//   onUpdateTransaction,
// }: HomeProps) =>
{
  const { isMobile } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const today = formatDate(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction,setSelectedTransaction] = useState<Transaction | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // 一日分のデータを取得
  const dailyTransactions = useMemo(() => {
    return monthlyTransactions.filter(
      (transaction) => transaction.date === currentDay
    ); 
  },[monthlyTransactions, currentDay]);

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };

  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  };

  //取引が選択されたときの処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
  }

  return (
    <Box sx={{display: "flex"}}>
      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary 
          // monthlyTransactions={monthlyTransactions} 
        />
        <Calendar 
          // monthlyTransactions={monthlyTransactions} 
          // setCurrentMonth={setCurrentMonth} 
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>

      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu 
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
          // open={isMobileDrawerOpen}
          // onClose={handleCloseMobileDrawer}
          // isMobile={isMobile}
        />
        <TransactionForm 
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          // onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          // onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
          // onUpdateTransaction={onUpdateTransaction}
          // isMobile={isMobile}
        />
      </Box>
    </Box>
  )
}

export default Home