function UserInputSectionCard(props){
    return <section id="userInputSection">
    <form onSubmit={props.sumbitHandler}>
        <div id="lableAndInputSection">
    <div className="labelAndInput">
      <label htmlFor="titleInput">Title:</label>
      <input onChange={props.changeHandler} type="text"name="title" id="titleInput" />
    </div>
    <div className="labelAndInput">
      <label htmlFor="categorySelector">Category:</label>
      <select onChange={props.changeHandler} name="category" id="categorySelector">
        <option value="Misc">Miscellaneous</option>
        <option value="Pay check"> Pay check</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Transportaion">Transportaion</option>
        <option value="Gas">Gas</option>
        <option value="Food">Food</option>
      </select>
    </div>
    <div className="labelAndInput">
      <label htmlFor="amountInput">Amount:</label>
      <input onChange={props.changeHandler} type="text" name="amount" id="amountInput"  pattern="[0-9]*"
inputMode="numeric" title="Please enter only numbers."/>
    </div>
    <div className="labelAndInput">
      <label htmlFor="currencySelector">Currency:</label>
      <select onChange={props.changeHandler} name="currency" id="currencySelector">
        <option value="₪">₪</option>
        <option value="$">$</option>
      </select>
    </div>
    <div className="labelAndInput">
      <label htmlFor="typeSelector">Expense/Income:</label>
      <select onChange={props.changeHandler} name="type" id="typeSelector">
        <option value="expense">expense</option>
        <option value="income">income</option>
      </select>
    </div>
    </div>
    <div id="btnSection">
    <button onSubmit={props.sumbitHandler}>Add transaction</button>
    <button type="button" onClick={props.clearHandler}>Clear all</button>
    <button type="button" onClick={props.editTransactions}>Edit</button>
    </div>
    </form>
  </section>
}
export default UserInputSectionCard