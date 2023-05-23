import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: '',
      borderColor: 'black',
      borderWidth: 2,
      fill: true,
      pointBackgroundColor: 'white',
      data: [100, 200, 500, 800, 1000, 1200],
    },
    {
      type: 'bar',
      label: 'Inflow',
      backgroundColor: 'green',
      data: [125, 200, 600, 800, 1200, 1500],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Outflow',
      backgroundColor: 'grey',
      data: [-120, -220, -330, -500, -150, -250],
    },
  ],
}

export default function BarChart() {
  return (
    <div className="w-full flex justify-center h-[400px] text-2xl">
      <Chart options={options} type="bar" data={data} />
    </div>
  )
}
