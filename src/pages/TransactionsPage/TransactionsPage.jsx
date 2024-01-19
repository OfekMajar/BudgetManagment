import { useEffect, useState } from "react";
import TransactionCard from "../../components/Transactions";
import UserInputSectionCard from "../../components/UserInputSectionCard";
import "./TransactionsPage.css";
import db from "../../firebase"
import {collection, doc, query} from "firebase/firestore"
import {useCollectionData} from "react-firebase-hooks/firestore"
function TransactionsPage(props) {
  const query= collection(db,"users",props.onlineUser.onlineUserUid,"transactions")
  
  const [docs,loading,error] =useCollectionData(query)
  console.log(docs);
  const [showEditTransactions, setShowEditTransactions] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("userTransactions"));
    return storedData || [];
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
  const sumbitHandler = (e) => {
    e.preventDefault();
    formData.id = Math.random() * 100000;
    setTransactions([...transactions, { ...formData }]);
    // console.log(doc(db,"users"));
    localStorage.setItem("userTransactions", JSON.stringify(transactions));
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
          {transactions.map((item, index) => {
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
