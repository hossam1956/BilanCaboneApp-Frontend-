import * as React from "react"
import Calendar from "@/Composant/Calendar"
import NoAutorisePage from "./NoAutorisePage"
import { isAdmin } from "@/hooks/useUserRole"
const FormulaireEmloye=()=>{
    const isAdminuser=isAdmin()
return (
    (!isAdmin)?( <Calendar/>):<NoAutorisePage/>
) 
}
export default FormulaireEmloye