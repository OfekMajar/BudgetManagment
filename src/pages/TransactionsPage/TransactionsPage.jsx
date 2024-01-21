import { useEffect, useState } from "react";
import TransactionCard from "../../components/Transactions";
import UserInputSectionCard from "../../components/UserInputSectionCard";
import "./TransactionsPage.css";
import db from "../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
function TransactionsPage(props) {
  const path = `users/${props.onlineUser.onlineUserUid}/transactions`;
  const queryCollection = collection(db, path);
  const [docs, loading, error] = useCollectionData(queryCollection);
  const [showEditTransactions, setShowEditTransactions] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    return docs;
  });
  const [formData, setformData] = useState({
    title: "Unknown",
    category: "Miscellaneous",
    amount: "0",
    currency: "₪",
    type: "expense",
  });

  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setformData({ ...formData });
  };
  const sumbitHandler = async (e) => {
    e.preventDefault();
    const transactionId = Math.random();
    const docRef = doc(db, path, `${transactionId} `);
    await setDoc(docRef, { ...formData, transactionId });
  };
  const clearHandler = async (e) => {
    if (confirm("are you sure you want to delete all of your transactions?")) {
      const collectionRef = collection(db, path);

      try {
        const querySnapshot = await getDocs(collectionRef);

        // Delete each document in the collection
        querySnapshot.forEach(async (item) => {
          const docRef = doc(db, path, item.id);
          await deleteDoc(docRef);
        });

        console.log(`Collection "${path}" deleted successfully.`);
      } catch (error) {
        console.error("Error deleting collection:", error);
      }
    }
  };

  const editTransactions = (e) => {
    setShowEditTransactions(!showEditTransactions);
  };

  const removeTransaction = async (e, deletedTransaction) => {
    let confimDelete = false;
    if (e.shiftKey) {
      console.log("used shift");
      confimDelete = true;
    } else {
      confimDelete = confirm(
        "are you sure you want to delete this transaction, you can press shift while clicking the button to skip this confirmation"
      );
    }
    if (confimDelete) {
      const transId = deletedTransaction.transactionId;
      const collectionRef = collection(db, path);
      const q = query(
        collectionRef,
        where("transactionId", "==", Number(transId))
      );

      try {
        const snapshot = await getDocs(q);

        if (snapshot.size === 0) {
          console.log("No matching document found.");
          return;
        }

        snapshot.forEach(async (item) => {
          const docRef = doc(db, path, item.id); // Use the document ID from the snapshot
          await deleteDoc(docRef);
        });

        console.log("Transaction(s) deleted successfully.");
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };
  return (
    <>
      {props.isUserLoggedIn ? (
        <div id="homeContainer">
          <h1>Budget Manager </h1>
          <UserInputSectionCard
            sumbitHandler={sumbitHandler}
            changeHandler={changeHandler}
            clearHandler={clearHandler}
            editTransactions={editTransactions}
          />
          <table id="userTransactionInfo">
            <thead>
              <th>title</th> <th>category</th> <th>amount</th> <th>type</th>
            </thead>
            <tbody>
              <div>{loading ? <h1> loading...</h1> : null}</div>
              {docs?.map((item, index) => {
                return (
                  <TransactionCard
                    removeTransaction={removeTransaction}
                    isEditAvailable={showEditTransactions}
                    transaction={item}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>SIGN IN PLEASE</h1>
      )}
    </>
  );
}
export default TransactionsPage;
