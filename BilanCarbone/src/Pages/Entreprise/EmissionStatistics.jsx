import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const EmissionsStatistics = () => {
  const [emissionData, setEmissionData] = useState([]);

  useEffect(() => {
    const fetchEmissionData = async () => {
      try {
        const response = await fetch('http://localhost:8088/api/emissions'); // API to fetch emission data
        const data = await response.json();
        setEmissionData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'émissions:', error);
      }
    };

    fetchEmissionData();
  }, []);

  const lineChartData = {
    labels: emissionData.map(item => item.year),
    datasets: [
      {
        label: 'Émissions totales (tonnes de CO2)',
        data: emissionData.map(item => item.totalEmissions),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: emissionData.map(item => item.year),
    datasets: [
      {
        label: 'Émissions par électricité (tonnes de CO2)',
        data: emissionData.map(item => item.electricityEmissions),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Émissions par transport (tonnes de CO2)',
        data: emissionData.map(item => item.transportEmissions),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Émissions par autres sources (tonnes de CO2)',
        data: emissionData.map(item => item.otherEmissions),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Émissions de CO2 de l\'entreprise',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Émissions totales au fil des ans</h2>
        <Line data={lineChartData} options={chartOptions} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Émissions par source</h2>
        <Bar data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EmissionsStatistics;
