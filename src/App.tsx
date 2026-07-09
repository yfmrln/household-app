import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  // Firestoreエラーかどうかを判断する型ガード
  function isFireStoreError(err: unknown):err is {code: string, message: string}  {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  
  format(currentMonth, "yyyy-MM");

  // firestoreのデータをすべて取得
  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData);
      } catch(err) {
        if(isFireStoreError(err)) {
          console.error(err)
          console.error(err.message)
          console.error(err.code)
        } else {
          console.error("一般的なエラーは",err)
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  },[]);

 // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  });

  //取引を保存する処理
  const handleSaveTransaction = async(transaction: Schema) => {
      try {
        //firestoreにデータを登録する
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "Transactions"), transaction);
        console.log("Document written with ID: ", docRef.id);

        const newTransaction = {
          id: docRef.id,
          ...transaction
        } as Transaction;
        setTransactions((prevTransactions) =>[
          ...prevTransactions,
          newTransaction
        ]);
      } catch(err) {
        if(isFireStoreError(err)) {
          console.error("firestoreのエラーは:", err)
        } else {
          console.error("一般的なエラーは",err)
        }
      }
  }

  // 取引を削除する処理
  const handleDeleteTransaction = async(
    transactionIds: string | readonly string[]
  ) => {
    // firestoreのデータを削除
    try {
        const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds];

        for(const id of idsToDelete) {
          // firestoreのデータを削除
          await deleteDoc(doc(db, "Transactions", id));
        }

        // const filteredTransactions = transactions.filter(
        //   (transaction) => transaction.id !== transactionId
        // );

        const filteredTransactions = transactions.filter(
          (transaction) => !idsToDelete.includes(transaction.id)
        );
        setTransactions(filteredTransactions);

    } catch(err) {
        if(isFireStoreError(err)) {
          console.error("firestoreのエラーは:", err)
        } else {
          console.error("一般的なエラーは",err)
        }
    }
  };

  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    try {
        // firestore更新処理
        const docRef= doc(db, "Transactions", transactionId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, transaction);
        setTransactions((prevTransactions) =>
          prevTransactions.map((t) =>
            t.id === transactionId ? { ...t, ...transaction, id: t.id } : t
          )
        );
    } catch(err) {
        if(isFireStoreError(err)) {
          console.error("firestoreのエラーは:", err)
        } else {
          console.error("一般的なエラーは",err)
        }
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction} 
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />
            } 
            />
            <Route path="/report" element={
              <Report
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                isLoading={isLoading}
                onDeleteTransaction={handleDeleteTransaction}
              />
            } 
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );

  

};

export default App;
