import { ArrowDownToLine } from "lucide-react"
import { useContext } from "react"
import { ChartBarCxt } from "./DiagBar"
import { saveAs } from "file-saver"
import { ChartCerlCxt } from "./DiagCirculaire"
import { ChartLigneCxt } from "./DiagLigne"
export const DownloadChartBar=()=>{
    const ChartBar =useContext(ChartBarCxt)
    const Download=()=>{
        const canvas=ChartBar.current
        saveAs(canvas.toDataURL('image/png'),'chartBar.png')

    }
    return(
        <div className="flex justify-center my-2">
            <button onClick={Download} className=" flex justify-between border-solid border-transparent bg-black text-white rounded-full text-sm py-2 px-3  w-fit ">Télécharger<ArrowDownToLine size={20} strokeWidth={2.25}/></button>
        </div>
    )
}

export const DownloadChartCercle=()=>{
    const ChartCerl =useContext(ChartCerlCxt)
    const Download=()=>{
        const canvas=ChartCerl.current
        saveAs(canvas.toDataURL('image/png'),'chartCercle.png')

    }
    return(
        <div className="flex justify-center my-2">
            <button onClick={Download} className=" flex justify-between border-solid border-transparent bg-black text-white rounded-full text-sm py-2 px-3  w-fit ">Télécharger<ArrowDownToLine size={20} strokeWidth={2.25}/></button>
        </div>
    )

    
}
export const DownloadChartLigne=()=>{
    const ChartLigne =useContext(ChartLigneCxt)
    const Download=()=>{
        const canvas=ChartLigne.current
        saveAs(canvas.toDataURL('image/png'),'chartLigne.png')

    }
    return(
        <div className="flex justify-center my-2">
            <button onClick={Download} className=" flex justify-between border-solid border-transparent bg-black text-white rounded-full text-sm py-2 px-3  w-fit ">Télécharger<ArrowDownToLine size={20} strokeWidth={2.25}/></button>
        </div>
    )
}
