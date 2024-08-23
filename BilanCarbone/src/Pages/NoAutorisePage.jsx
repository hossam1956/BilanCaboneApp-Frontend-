import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NoAutorisePage=()=>{
    return(
        <div className="flex justify-center items-center">
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vous n'avez pas accès</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Désolé, vous n'avez pas les autorisations nécessaires pour accéder à cette fonctionnalité.</p>
            </a>
        </div>
    )
}

export default NoAutorisePage