import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/Components/ui/alert"

  import { Terminal } from "lucide-react"

const Alerts=({alert,alertProblem,titre_succes,message_succes,message_erreur})=>{
    
if(alert){
    return(
        <div className="fixed top-4 right-4 w-60 z-10 transition-transform transform translate-x-0">
            <Alert className="bg-green-400">
                <Terminal className="h-4 w-3" />
                <AlertTitle>{titre_succes}</AlertTitle>
                <AlertDescription>
                    {message_succes}
                </AlertDescription>
            </Alert>
        </div>
    )
}
else if(alertProblem){
    return(
        <div className="fixed top-4 right-4 w-60 z-10 transition-transform transform translate-x-0">
            <Alert className="bg-red-400">
            <Terminal className="h-4 w-3" />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>
                {message_erreur}
            </AlertDescription>
            </Alert>
        </div>
    )
}
    
}
export default Alerts;