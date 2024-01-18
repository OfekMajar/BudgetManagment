
function TransactionCard(props){

    const showDeleteBtn=()=>{
       return 
}
    let typeIcon,categoryIcon
    if(props.transaction.type=="income")typeIcon="plus"
        else typeIcon="minus"
    switch (props.transaction.category) {
        case "Gas":
            categoryIcon="gas-pump"
            break;
        case "Pay check":
            categoryIcon= "receipt"
            break
        case "Entertainment":
            categoryIcon= "gamepad"
        break
        case "Miscellaneous":
        categoryIcon="shuffle"
        break
        case "Transportaion":
            categoryIcon="train-subway"
            break
        case "Food":
            categoryIcon="utensils"
            break
        default:
            break;
    }
return (<tr> <td>{props.transaction.title}</td> 
            <td> <div className="iconTableBox">{props.transaction.category} <i className={`fa-solid fa-${categoryIcon}`}></i></div></td> 
            <td>{props.transaction.amount}{props.transaction.currency}</td>
             <td><div className="iconTableBox">{props.transaction.type} <i className={`fa-solid fa-circle-${typeIcon}`}></i></div>{props.isEditAvailable?<button onClick={()=>{props.removeTransaction(props.transaction)}}>delete</button>:null}</td>
             </tr>

)
}
export default TransactionCard