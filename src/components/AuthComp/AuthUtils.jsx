const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };
 export const changeHandler = (e) => {
    e.preventDefault();
    tempUser[e.target.name] = e.target.value;
    setTempUser({ ...tempUser });
  };
  const signUpHandler =async  (e) => {
    e.preventDefault();
    //^testing firebase
    const collectionRef = collection(db, "users");
    const payload = { tempUser };
//    {props.users.map(item=>{
//     console.log(item);
//     if(item.userName==tempUser.userName &&item.userEmail==tempUser.userEmail &&item.userPassword==tempUser.userPassword){
//         alert("user already exsits")
//     }
//    })}
     props.setIsUserLoggedIn(true);
    await addDoc(collectionRef, payload);
    //^
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
    // localStorage.setItem("allSiteUsersData",JSON.stringify([...props.allSiteUsersData]))
  };
  const loginHandler = (e) => {
    e.preventDefault();
    props.setIsUserLoggedIn(false);
    props.allSiteUsersData.forEach((item) => {
      if (
        item.userEmail == tempUser.userEmail &&
        item.userPassword == tempUser.userPassword
      ) {
        props.setIsUserLoggedIn(true);
        alert("welcome");
      }
    });
    if (props.isUserLoggedIn == false) {
      alert("you need to sign up");
    }
  };

  export default {loginHandler,signUpHandler,changeHandler,toggleMode}