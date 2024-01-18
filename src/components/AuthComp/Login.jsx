function Login(props){
    return(
        <div className="authContainer">
            <h1>Login</h1>
        <form onSubmit={props.sumbitHandler}>
        <label htmlFor="">Email:</label>
            <input onChange={props.changeHandler} type="email" name="userEmail" id="userEmailInput" />
            <label htmlFor="">Password:</label>
            <input onChange={props.changeHandler} type="password" name="userPassword" id="userPasswordInput"/>
            <button type="submit">Login</button>
        </form>
        <button onClick={props.toggleMode}>Don't have an accout? click here</button>
        </div>
    )
}
export default Login