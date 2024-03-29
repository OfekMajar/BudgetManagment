import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import firebase from "./config/firebase";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useSearchParams,
  useFetcher,
} from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import Authenticate from "./pages/Authenticate/Authenticate";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
//^ testing! firebase
import db from "./config/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
function App() {
  //^ testing! firebase
  // useEffect (()=>{
  //  return onSnapshot(collection(db,"users"), (snapshot)=>{
  //   setUsers(snapshot.docs.map(doc => { return {...doc.data()}}));
  //   })
  // },[])
  const [users, setUsers] = useState([{ userName: "Loading..." }]);

  const [onlineUser, setOnlineUser] = useState({
    onlineUsername: "guest",
    onlineUserUid: "0",
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (onlineUser.onlineUsername == "guest") {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar onlineUser={onlineUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Authenticate"
          element={
            <Authenticate
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              onlineUser={onlineUser}
              setOnlineUser={setOnlineUser}
              users={users}
              Y
            />
          }
        />
        <Route
          path="/Transactions"
          element={
            <TransactionsPage
              onlineUser={onlineUser}
              isUserLoggedIn={isUserLoggedIn}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
