import React, { useEffect, useState } from 'react'; // Reactで使用する機能（useEffect, useState）を読み込む
import './App.css'; // アプリ全体のCSS
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // 画面遷移（ルーティング）に必要な機能を読み込む

// 画面遷移（ルーティング）に必要な機能を読み込む
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';

import AppLayout from './components/layout/AppLayout'; // 共通レイアウト（ヘッダーやサイドバーなど）

// MUI（Material UI）のテーマ設定
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { Transaction } from './types/index'; // 型定義

// Firestore（Firebaseのデータベース）の操作に必要な関数
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from './firebase'; // Firestore（Firebaseのデータベース）の操作に必要な関数
import { format } from 'date-fns'; // 日付フォーマット用ライブラリ
import { formatMonth } from './utils/formatting'; // 月表示用の自作関数
import { Schema } from './validations/schema'; // 入力データのバリデーション用の型
import { AppContextProvider} from './context/AppContext'; // アプリ全体で状態を共有するContext

function App() {

  /** 
    * Firestore専用のエラーかどうかを判定する関数（型ガード） 
    * 
    * unknown型のエラーはそのままではcodeプロパティを使えないため、
    * Firestoreのエラーなのか確認してから使用する。 
    */
  function isFireStoreError(err: unknown):err is {code: string, message: string}  {
    return typeof err === "object" && err !== null && "code" in err
  }

  // ========================== 
  // 以下はContextへ移動したためコメントアウトされている処理 
  // ==========================

  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);
  // format(currentMonth, "yyyy-MM");

  // Firestoreエラー判定（旧コード）
  // function isFirestoreError(
  //     err: unknown
  // ): err is { code: string; message: string } {
  //     return typeof err === "object" && err !== null && "code" in err;
  // }

  /** 
   * ========================== 
   * 取引を追加する処理 
   * ========================== 
   */
  // const handleSaveTransaction = async(transaction: Schema) => {
  //     try {
  //       // FirestoreのTransactionsコレクションへデータを追加
  //       // Add a new document with a generated id.
  //       const docRef = await addDoc(collection(db, "Transactions"), transaction);
  
  //       // 登録されたドキュメントIDを確認
  //       console.log("Document written with ID: ", docRef.id);

  //       // Firestoreで発行されたIDを追加してReact側のデータを作成
  //       const newTransaction = {
  //         id: docRef.id,
  //         ...transaction
  //       } as Transaction;
  
  //       // 画面表示用のデータへ追加
  //       setTransactions((prevTransactions) =>[
  //         ...prevTransactions,
  //         newTransaction
  //       ]);
  //     } catch(err) {
  //       
  //       // Firestoreエラーなら専用メッセージ
  //       if(isFireStoreError(err)) {
  //         console.error("firestoreのエラーは:", err)
  //       } else {
  //         console.error("一般的なエラーは",err)
  //       }
  //     }
  // }

  /** 
   * ========================== 
   * 取引を削除する処理 
   * ========================== 
   */
  // const handleDeleteTransaction = async(
  //   transactionIds: string | readonly string[]
  // ) => {
  //   // firestoreのデータを削除
  //   try {
  //       // 配列でなければ配列へ変換
  //       const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds];

  //       // Firestoreから対象データを削除
  //       for(const id of idsToDelete) {
  //         await deleteDoc(doc(db, "Transactions", id));
  //       }

  //       // React側のデータも削除
  //       // const filteredTransactions = transactions.filter(
  //       //   (transaction) => transaction.id !== transactionId
  //       // );

  //       const filteredTransactions = transactions.filter(
  //         (transaction) => !idsToDelete.includes(transaction.id)
  //       );
  //       setTransactions(filteredTransactions);

  //   } catch(err) {
  //       if(isFireStoreError(err)) {
  //         console.error("firestoreのエラーは:", err)
  //       } else {
  //         console.error("一般的なエラーは",err)
  //       }
  //   }
  // };

  /** 
   * ========================== 
   * 取引を更新する処理 
   * ========================== 
   */
  // const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
  //   try {
  //       // firestore更新処理
  //       const docRef= doc(db, "Transactions", transactionId);

  //       // Set the "capital" field of the city 'DC'
  //       await updateDoc(docRef, transaction);
  //       setTransactions((prevTransactions) =>
  //         prevTransactions.map((t) =>
  //           t.id === transactionId ? { ...t, ...transaction, id: t.id } : t
  //         )
  //       );
  //   } catch(err) {
  //       if(isFireStoreError(err)) {
  //         console.error("firestoreのエラーは:", err)
  //       } else {
  //         console.error("一般的なエラーは",err)
  //       }
  //   }
  // };

  /** 
   * ========================== 
   * 画面表示（JSX） 
   * ========================== 
   */
  return (
    // Contextでアプリ全体の状態を共有
    <AppContextProvider>
      {/* Material UIのテーマを適用 */}
      <ThemeProvider theme={theme}>
        {/* ブラウザごとの差をなくすCSS */}
        <CssBaseline />
        {/* React Router開始 */}
        <Router>
          <Routes>
            {/* 共通レイアウトを表示 */}
            <Route path="/" element={<AppLayout />}>
              {/* トップページ */}
              <Route index element={
                <Home />
              } 
              />
              {/* レポート画面 */}
              <Route path="/report" element={
                <Report />
              } 
              />
              {/* 存在しないURLへアクセスした場合 */}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );

  

};

// Appコンポーネントを他のファイルから利用できるようにする
export default App;
