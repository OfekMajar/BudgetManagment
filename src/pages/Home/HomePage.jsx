import {useState,useEffect} from "react"
import Testemonies from "../../components/Testemonies"
import About from "../../components/About"
import "./HomePage.css"
function HomePage(){
    return(
        <div>
            <Testemonies/>
            <About/>
        </div>
    )
}
export default HomePage