import * as React from "react"
import Calendar from "@/Composant/Calendar"
import NoAutorisePage from "./NoAutorisePage"
const FormulaireEmloye=()=>{
return (
    (sessionStorage.getItem("roleUser")!="ADMIN")?( <Calendar/>):<NoAutorisePage/>
) 
}
export default FormulaireEmloye