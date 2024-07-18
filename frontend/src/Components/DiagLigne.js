import React, { useRef, useEffect,createContext } from 'react';
import { Chart,LineController,LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import { DownloadChartLigne } from './DownloadChart';
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
const labels = ["May","June","July"];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const config = {
    type: 'line',
    data: data,
  };

  export const ChartLigneCxt=new createContext(null)

const DiagLigne=()=>{
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
    const DiagrLineRef=useRef(null)
    useEffect(
        ()=>{
            const context=DiagrLineRef.current.getContext("2d")
            const lineDiagr=new Chart(context,config)
            return ()=>{
                lineDiagr.destroy()
            }
        },[]
    );
    return(
    <div>
      <div className='flex justify-center text-xs md:text-base'>
        <button ref={yearRef} className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodYear}>Cette Année</button>
        <button ref={mounthRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodMounth}>Ce mois</button>
        <button ref={weekRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodWeek}> Cette Semaine</button>
      </div>
      <canvas ref={DiagrLineRef}></canvas>
      <ChartLigneCxt.Provider value={DiagrLineRef}>
        <canvas ref={DiagrLineRef}></canvas>
        <DownloadChartLigne/>
      </ChartLigneCxt.Provider>
    </div>)
}
export default DiagLigne