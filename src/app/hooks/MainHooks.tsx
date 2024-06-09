import { db } from "@/firebase";
import { Transaction } from "@/types";
import { formatMonth, formatYear } from "@/utils/formatting";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateClickArg } from "@fullcalendar/interaction";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Schema } from "../../validations/schema";

const MainHooks = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  //取引データを管理
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  // 今月のデータを管理するState
  const [currentMonth, setCurrentMonth] = useState(new Date());

  //ローディング管理
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);

  //年間のデータを管理するState
  const [currentYear, setCurrentYear] = useState(new Date());

  //今年のデータを取得
  const yearTransactions = transaction.filter((allData) => {
    return allData.date.startsWith(formatYear(currentYear));
  });

  //firebaseエラーかどうかを判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  useEffect(() => {
    try {
      //firebaseのfirestoreからデータを全てのデータを取得する
      const allDate = async () => {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        // console.log(transactionsData);
        setTransaction(transactionsData);
      };
      allDate();
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseに関するエラーは:", err);
        console.error("Firebaseのエラーメッセージは:", err.message);
        console.error("Firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  //今月のデータを取得
  const monthlyTransactions = transaction.filter((allDate) => {
    return allDate.date.startsWith(formatMonth(currentMonth));
  });

  //選択した日付のデータを取得
  const dailyTransactions = monthlyTransactions.filter((data) => {
    return data.date === currentDay;
  });

  //カレンダーの日付を選択した際の処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
    setIsMobileDrawerOpen(true);
  };

  //ウィンドウ幅が1200px以下になったときに適応させる
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  //フォームの開閉処理（内訳追加ボタンを押した時）
  const handleAddTransactionForm = () => {
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      if (selectedTransaction) {
        setSelectedTransaction(null);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    }
  };

  //取引が選択された時の処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    if (isMobile) {
      setIsDialogOpen(true);
    } else {
      setIsEntryDrawerOpen(true);
    }
  };

  //モバイル用のdrawerを閉じる処理
  const handleCloseMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  //クローズボタンで閉じる処理
  const onCloseForm = () => {
    setSelectedTransaction(null);
    if (isMobile) {
      setIsDialogOpen(!isDialogOpen);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  };

  //取引を保存する処理
  const handleSaveTransaction = async (transactionData: Schema) => {
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), {
        ...transactionData,
      });
      // console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transactionData,
      } as Transaction;
      // console.log(newTransaction);
      setTransaction((prevTransaction) => [...prevTransaction, newTransaction]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseに関するエラーは:", err);
        console.error("Firebaseのエラーメッセージは:", err.message);
        console.error("Firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  const handleDeleteTransaction = async (
    transactionIds: string | readonly string[]
  ) => {
    //firestoreのデータを削除
    try {
      //配列でデータを管理する
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }

      //画面上にすぐに反映させる
      // const filterdTransactions = transaction.filter(
      //   (transactionDeleteDate) => transactionDeleteDate.id !== transactionId
      // );
      const filterdTransactions = transaction.filter(
        (transactionDeleteDate) =>
          !idsToDelete.includes(transactionDeleteDate.id)
      );

      setTransaction(filterdTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseに関するエラーは:", err);
        console.error("Firebaseのエラーメッセージは:", err.message);
        console.error("Firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  const handleUpdateTransaction = async (
    transactionUpdata: Schema,
    transactionId: string
  ) => {
    try {
      //firestore更新処理
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transactionUpdata);

      //即反映の処理
      const updatedTransactions = transaction.map((t) =>
        t.id === transactionId ? { ...t, ...transactionUpdata } : t
      ) as Transaction[];

      setTransaction(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firebaseに関するエラーは:", err);
        console.error("Firebaseのエラーメッセージは:", err.message);
        console.error("Firebaseのエラーコードは:", err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  return {
    transaction,
    monthlyTransactions,
    setCurrentMonth,
    setCurrentDay,
    currentDay,
    today,
    handleDateClick,
    dailyTransactions,
    handleAddTransactionForm,
    handleSelectTransaction,
    isMobile,
    isMobileDrawerOpen,
    handleCloseMobileDrawer,
    currentMonth,
    onCloseForm,
    isEntryDrawerOpen,
    handleSaveTransaction,
    selectedTransaction,
    handleDeleteTransaction,
    setSelectedTransaction,
    handleUpdateTransaction,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    yearTransactions,
    currentYear,
    setCurrentYear,
  };
};

export default MainHooks;
