import React,{ useState } from 'react';
const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const Calendar = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startDayOfWeek = startOfMonth.getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedDate,setSelectedDate]=useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  console.log(selectedDate);
  return (
    <div className="p-4 w-2/3 h-1/2 mx-auto ">

      <p className='flex justify-center mb-5 text-2xl'>{months[today.getMonth()]+"    "+today.getFullYear()}</p>

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
            className={`text-2xl px-2 py-5 rounded-full ${
            day === selectedDate.getDate() && 'bg-black text-white' 
            } ${day > today.getDate() && 'bg-gray-500 hover:bg-gray-500 '}`}
            onClick={()=>{
              const s = new Date(today.getFullYear(), today.getMonth(), day);
              setSelectedDate(s)
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
