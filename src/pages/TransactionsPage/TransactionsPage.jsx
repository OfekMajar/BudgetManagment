import { useEffect, useState } from "react";
import TransactionCard from "../../components/Transactions";
import UserInputSectionCard from "../../components/UserInputSectionCard";
import "./TransactionsPage.css";
import db from "../../firebase"
import {collection, doc, query,setDoc} from "firebase/firestore"
import {useCollectionData} from "react-firebase-hooks/firestore"
import { uid ,useUID } from 'react-uid';
function TransactionsPage(props) {
  const path=`users/${props.onlineUser.onlineUserUid}/transactions`
  const query= collection(db,path)
  
  const [docs,loading,error] =useCollectionData(query)
  console.log(docs);
  const [showEditTransactions, setShowEditTransactions] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    return docs ;
  });
  const [formData, setformData] = useState({
    title: "Unknown",
    category: "Miscellaneous",
    amount: "0",
    currency: "₪",
    type: "expense",  
  });
  console.log();

  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setformData({ ...formData });
  };
  const sumbitHandler =async(e) => {
    e.preventDefault();
    const transactionId = Math.random() * 1000000;
    // const docRef=doc(db,path,transactionId)
    // await setDoc(docRef,{formData})
    // console.log(doc(db,"users"));
  };
  const clearHandler = (e) => {
    setTransactions([]);
    localStorage.clear();
  };

  const editTransactions = (e) => {
    setShowEditTransactions(!showEditTransactions);
  };

  const removeTransaction = (removedTransaction) => {
    const filtered = transactions.filter((item) => {
      return item.id != removedTransaction.id;
    });
    setTransactions(filtered);
  };
  return (
    <> 
    {props.isUserLoggedIn?
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
    </div>:<h1>SIGN IN PLEASE</h1>}
    </>
  );
}
export default TransactionsPage;
