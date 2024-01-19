import { useState } from "react";
import Login from "../../components/AuthComp/Login";
import SignUp from "../../components/AuthComp/Signup";
//^testing firebase
import db from "../../firebase";
import {
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
//^
//& this is the auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
//&
import "./Authenticate.css";
function Authenticate(props) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [tempUser, setTempUser] = useState({});

  //get user from database
  const getDocumentById = async (collectionName, documentId) => {
    const collectionRef = collection(db, collectionName);
    const documentRef = doc(collectionRef, documentId);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        // Document exists, you can access its data
        const documentData = documentSnapshot.data();
        const onlineUsername=documentData.userName
        const onlineUseremail=documentData.userEmail
        const onlineUserrole=documentData.userRole
       
        const onlineUserUid=documentRef.id
        props.setOnlineUser({onlineUsername,onlineUseremail,onlineUserrole,onlineUserUid});
       
        return documentData;
      } else {
        // Document does not exist
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    tempUser[e.target.name] = e.target.value;
    setTempUser({ ...tempUser });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { userEmail, userPassword } = tempUser;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userCredential) => {
        const userName = tempUser.userName;
        const userEmail = tempUser.userEmail;
        const userPassword = tempUser.userPassword;
        const userRole = "regular";

        const user = userCredential.user;
        const userUID = user.uid; // Get the UID

        const collectionRef = collection(db, "users");
        const userDocRef = doc(collectionRef, userUID); // Use UID as document ID

        const payload = { userName, userEmail, userPassword, userRole };

        await setDoc(userDocRef, payload);
        setIsLoginMode(!isLoginMode);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error code:", errorCode);
        console.error("Error message:", errorMessage);
        switch (errorCode) {
          case "auth/email-already-in-use":
            alert("email already in use");
            break;
          case "auth/weak-password":
            alert("password to weak");
            break;
          default:
            break;
        }
      });

    await addDoc(collectionRef, payload);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { userEmail, userPassword } = tempUser;
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // props.setOnlineUser()
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            getDocumentById("users", uid);
            props.setIsUserLoggedIn(true);

          } else {
            console.log("no user is signed in");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode == "auth/invalid-credential")
          alert("invalid email or password");
      });
  };

  const logOut = () => {
    props.setIsUserLoggedIn(false);
    props.setOnlineUser({onlineUsername:"guest"})
  };
  const checkUserInfo = () => {
    console.log(props.onlineUser);
  };
  return (
    <div>
      {props.isUserLoggedIn ? (
        <div>
          welcome  <h1>{props.onlineUser.onlineUsername}</h1>
          <button onClick={checkUserInfo}>check my data</button>
          <button onClick={logOut}>logOut</button>
        </div>
      ) : (
        <div>
          {isLoginMode ? (
            <Login
              toggleMode={toggleMode}
              changeHandler={changeHandler}
              sumbitHandler={loginHandler}
            />
          ) : (
            <SignUp
              toggleMode={toggleMode}
              changeHandler={changeHandler}
              sumbitHandler={signUpHandler}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default Authenticate;
