import React, { useRef, useEffect, createContext, Children } from 'react';
import { Chart,BarController,BarElement,LinearScale, CategoryScale,Tooltip,Legend} from 'chart.js';
import Dashboard from '../Pages/Dashboard';
import {DownloadChartBar} from './DownloadChart';

Chart.register(BarController,BarElement,LinearScale, CategoryScale,Tooltip,Legend);
const labels = ['Red', 'Blue', 'Yellow'];
const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1
    }]
  };

const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
 export const ChartBarCxt=new createContext(null)

const DiagBar = () => {
  const yearRef=useRef(null)
  const mounthRef=useRef(null)
  const weekRef=useRef(null)

  
  const handlePeriodYear=()=>{
      yearRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
  }
  const handlePeriodMounth=()=>{
      yearRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
  }
  const handlePeriodWeek=()=>{
      yearRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      mounthRef.current.className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md'
      weekRef.current.className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md'
  }
  const DiagBarRef=useRef(null)
  useEffect(
    ()=>{
        const context=DiagBarRef.current.getContext("2d")
        const barDiag=new Chart(context,config)
        return ()=>{
            barDiag.destroy()
            
        }
    },[]
  
);
return(
<div className='text-xs md:text-base'>
    <button ref={yearRef} className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodYear}>Cette Année</button>
    <button ref={mounthRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodMounth}>Ce mois</button>
    <button ref={weekRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodWeek}> Cette Semaine</button>
    <ChartBarCxt.Provider value={DiagBarRef}>
            <canvas ref={DiagBarRef} className='h-2/3'></canvas>
            <DownloadChartBar/>
    </ChartBarCxt.Provider>

</div>
)

}

export default DiagBar;
