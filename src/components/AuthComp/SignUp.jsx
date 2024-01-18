function SignUp(props){
    return(
        <div className="authContainer">
            <h1>Sign up</h1>
        <form onSubmit={props.sumbitHandler}>
            <label htmlFor="userNameInput">username:</label>
            <input onChange={props.changeHandler} type="text" name="userName" id="userNameInput" />
            <label htmlFor="">Email:</label>
            <input onChange={props.changeHandler} type="Email" name="userEmail" id="userEmailInput" />
            <label htmlFor="userPasswordInput">Password</label>
            <input onChange={props.changeHandler} type="password" name="userPassword" id="userPasswordInput"/>
            <button type="submit" >Sign up</button>
        </form>
        <button type="button" onClick={props.toggleMode}>already have an account? click here</button>
        </div>
    )
}
export default SignUp