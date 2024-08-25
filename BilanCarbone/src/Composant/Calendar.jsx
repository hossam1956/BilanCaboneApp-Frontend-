import React,{ useEffect, useState } from 'react';
import CalendarForm from './CalendarForm';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';
const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const Calendar = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDayOfWeek = startOfMonth.getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedDate,setSelectedDate]=useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  const [formatedDate,setFormatedDate]=useState(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate()+1).toISOString().split('T')[0])
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const [existDay,setExistDay]=useState([])
  const [formvisible,setFormVisible]=useState(false)
  const handleFormVisibility=()=>{
    const timer=setTimeout(
          setFormVisible(!formvisible),50
    )
    
  }
  const getExistDate=async()=>{
    const response=await apiClient.get(`data/dates?IdUtilisateur=${localStorage.getItem('idUser')}`)
    const dayList = response.data.map(date => date.split('-')[2]);
    setExistDay(dayList)
  }
  useEffect(()=>{
    getExistDate()
    
  },[])
  
  const handleDayClick = (day) => {
    handleFormVisibility()
    const select = new Date(today.getFullYear(), today.getMonth(), day);
                setSelectedDate(select)
                setFormatedDate(new Date(select.getFullYear(),select.getMonth(),select.getDate()+1).toISOString().split('T')[0])
  }

  return (
    <div className="p-4 w-2/3 h-1/2 mx-auto ">

      <p className='flex justify-center mb-5 text-2xl'>{months[today.getMonth()]+"    "+today.getFullYear()}</p>

      {formvisible && <CalendarForm onClose={()=>{setFormVisible(!formvisible);getExistDate()}} date={formatedDate}/> }

      <div className="grid grid-cols-7 gap-2 text-center font-bold text-xl">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysArray.map((day) => (
          <button
            disabled={day > today.getDate()}
            key={day}
            className={
            (existDay.includes(`${day}`))?` ${
              (day === selectedDate.getDate()) ?'bg-green-950 text-white text-2xl px-2 py-5 rounded-full'
              : 'bg-green-500 text-white text-2xl px-2 py-5 rounded-full'
              }`
              :  
              `text-2xl px-2 py-5 rounded-full ${
              day === selectedDate.getDate() && 'bg-black text-white' 
              } ${day > today.getDate() && 'bg-gray-500 hover:bg-gray-500 '}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
