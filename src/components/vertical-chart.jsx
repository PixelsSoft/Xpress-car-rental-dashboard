import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Profit & Loss',
      position: 'top',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: [100, 121, 400, 300, 500, 600],
      backgroundColor: 'green',
    },
    {
      label: 'Dataset 2',
      data: [100, 20, 90, 50, 90, 100],
      backgroundColor: 'grey',
    },
  ],
}

export default function VerticalChart() {
  return (
    <div className="w-full mt-10 flex justify-center h-[400px] text-2xl">
      <Bar options={options} data={data} />
    </div>
  )
}
