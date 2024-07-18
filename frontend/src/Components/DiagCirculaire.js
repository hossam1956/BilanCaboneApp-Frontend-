import React, { useRef, useEffect,createContext } from 'react';
import { Chart, DoughnutController,ArcElement,Tooltip,Legend} from 'chart.js';
import { DownloadChartCercle } from './DownloadChart';
Chart.register(DoughnutController,ArcElement,Tooltip,Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 100, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 1
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};
export const ChartCerlCxt=new createContext(null)

const DiagCirculaire = () => {
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

  const DigrCircRef=useRef(null)
  useEffect(
    ()=>{
        const context=DigrCircRef.current.getContext("2d")
        const doughnutDiagr=new Chart(context,config)
        return ()=>{
            doughnutDiagr.destroy()
        }
    },[]
);
return(
  <div className='text-xs md:text-base w-fit'>
    <button ref={yearRef} className='border-solid border-transparent bg-black text-white mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodYear}>Cette Année</button>
    <button ref={mounthRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodMounth}>Ce mois</button>
    <button ref={weekRef} className='border-solid border-transparent bg-white text-black mx-0 md:mx-3 p-2 rounded-md ' onClick={handlePeriodWeek}> Cette Semaine</button>
    <ChartCerlCxt.Provider value={DigrCircRef}>
    <canvas ref={DigrCircRef}></canvas>
    <DownloadChartCercle/>
    </ChartCerlCxt.Provider>
  </div>

)
}

export default DiagCirculaire;
