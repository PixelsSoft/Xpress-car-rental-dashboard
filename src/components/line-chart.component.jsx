import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Cash Flow',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Inflow',
      data: [2332, 2313, 21321, 30233, 12322, 12331,34213, 2132, 21333, 12312, 42300, 50000],
      borderColor: 'green',
      backgroundColor: 'green',
      pointRadius: 6,
      borderWidth: 5,
      pointBackgroundColor: 'darkgreen'
    },
    {
      label: 'Outflow',
      data: [13213, 2132, 3332, 14244, 2030, 2133, 42738, 33200, 32888, 3211, 23234, 29939],
      borderColor: 'gray',
      backgroundColor: 'gray',
      borderWidth: 5,
      pointRadius: 6,
      pointBackgroundColor: 'black'
    },
  ],
};

export default function LineChart() {
  return (
    <div className='w-full h-[400px] text-2xl'>
      <Line options={options} data={data} />
    </div>
  )
}
