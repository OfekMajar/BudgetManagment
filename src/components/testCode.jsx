  //^testing firebase
    // const collectionRef = collection(db, "users");
    // const payload = { tempUser };
    // setDoc(collectionRef, payload);
    //      props.setIsUserLoggedIn(true);
    //     //^

    // {if(props.allSiteUsersData.length==0){
    //     props.setAllSiteUsersData([...props.allSiteUsersData,{...tempUser}])
    //     console.log("new acc");
    // } }
    // {props.allSiteUsersData.map((item)=>{
    //     if(item.userEmail!=tempUser.userEmail){
    //         props.setAllSiteUsersData([...props.allSiteUsersData,{...tempUser}])
    //         console.log("new acc");
    //     }
    //     else{
    //         console.log("already had acc");
    //     }
    // })}



//?this overRights things
// const handleNewUser= async ()=>{
//   const docRef=doc(db,"users","user001")
//   const payload = {userName:"newName01" ,userEmail:"newEmail01@email",userPassword:"newPassword01"}
// await setDoc(docRef,payload)
// }
// const handleNewUser= async ()=>{
//   const userName=prompt("enter name")
//   const userEmail=prompt("enter email")
//   const userPassword=prompt("enter password")
//   const collectionRef= collection(db,"users")
//   const payload = {userName,userEmail,userPassword}

// await  addDoc(collectionRef,payload)
// }
// return(
//   <div>
//     <button onClick={handleNewUser}> new user</button>
//     {users.map((user)=>{
//     return  (<div>
//       <p>{user.userName} </p>
//       <p>{user.userEmail} </p>
//       <p>{user.user} </p>
//       <p>{user.id} </p>
//       </div> 
   
//     )
      
//     })}
//   </div>
// 



//! working auth app code
// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import firebase from "./firebase";
// import {BrowserRouter,Routes,Route,Link, useSearchParams, useFetcher} from "react-router-dom"
// import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
// import Authenticate from "./pages/Authenticate/Authenticate";
// import HomePage from "./pages/Home/HomePage";
// import NavBar from "./components/NavBar/NavBar";
// import './App.css'
// //^ testing! firebase
// import db from "./firebase"
// import {addDoc, collection, onSnapshot,} from "firebase/firestore"
// function App() {
// //^ testing! firebase
// useEffect (()=>{
//  return onSnapshot(collection(db,"users"), (snapshot)=>{
//   setUsers(snapshot.docs.map(doc => { return {...doc.data()}}));
//   })
// },[])
// const [users,setUsers]=useState([{userName:"Loading..." }])



//   const [user,setUser]=useState(null)
 
//   const [isUserLoggedIn,setIsUserLoggedIn]=useState(false)
  
//   return (
//     <BrowserRouter>
//     <NavBar/>
//     <Routes>
//       <Route path="/" element={<HomePage/>}/>
//       <Route path="/Authenticate" element={<Authenticate isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} user={user} setUser={setUser} users={users} Y/>} />
//       <Route path="/Transactions"  element={<TransactionsPage isUserLoggedIn={isUserLoggedIn}/>}/>
//     </Routes>
      
//     </BrowserRouter>
//   );
// }

// export default App;
//!working auth page with auth
// import { useState } from "react";
// import Login from "../../components/AuthComp/Login";
// import SignUp from "../../components/AuthComp/Signup";
// //^testing firebase
// import db from "../../firebase";
// import { setDoc,addDoc, collection, onSnapshot } from "firebase/firestore";
// //^
// //& this is the auth 
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,signOut ,onAuthStateChanged
// } from "firebase/auth";
// //&
// import "./Authenticate.css";
// function Authenticate(props) {

//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [tempUser, setTempUser] = useState({});

//   const toggleMode = () => {
//     setIsLoginMode(!isLoginMode);
//   };

//   const changeHandler = (e) => {
//     e.preventDefault();
//     tempUser[e.target.name] = e.target.value;
//     setTempUser({ ...tempUser });
//   };

//   const signUpHandler = (e) => {
//     e.preventDefault();
//     const auth = getAuth();
//     const { userEmail, userPassword } = tempUser; 
//     createUserWithEmailAndPassword(auth, userEmail, userPassword)
//       .then((userCredential) => {
//         console.log(userCredential.user);
//         const user = userCredential.user;
//     setIsLoginMode(!isLoginMode);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error("Error code:", errorCode);
//         console.error("Error message:", errorMessage);  
//         switch (errorCode) {
//             case "auth/email-already-in-use":
//             alert("email already in use")
//             break
//             case "auth/weak-password":
//                 alert("password to weak")
//                 break;
//             default:
//                 break;
//             }
//           });
//   };
//   const loginHandler = (e) => {
//     e.preventDefault();
//     const auth = getAuth();
//     const { userEmail, userPassword } = tempUser;
//     signInWithEmailAndPassword(auth, userEmail, userPassword)
//       .then((userCredential) => {
        
//         const user = userCredential.user;
//         console.log(user);
//         // alert("welcome")
//         props.setIsUserLoggedIn(true)
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         if(errorCode=="auth/invalid-credential")
//         alert("invalid email or password");
//       });
//   };
// const logOut=()=>{
//     props.setIsUserLoggedIn(false)
// }
//   return (
//     <div>
//         {props.isUserLoggedIn?
//         <div>
//             welcome
//             <button onClick={logOut}>logOut</button>
//         </div>
//         : <div>
//       {isLoginMode ? (
//         <Login
//           toggleMode={toggleMode}
//           changeHandler={changeHandler}
//           sumbitHandler={loginHandler}
//         />
//       ) : (
//         <SignUp
//           toggleMode={toggleMode}
//           changeHandler={changeHandler}
//           sumbitHandler={signUpHandler}
//         />
//       )}
//     </div>}
        
//     </div>
   
//   );
// }
// export default Authenticate;
