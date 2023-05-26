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

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
}

export default function BarChart({ inflow, outflow }) {
  const inflows = inflow.map((obj) => obj.totalAmount)
  const outflows = outflow.map((obj) => obj.totalAmount)
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

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
        data: [125, 200, 500, 800, 1000, 1200],
      },
      {
        type: 'bar',
        label: 'Inflow',
        backgroundColor: 'green',
        data: inflows,
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Outflow',
        backgroundColor: 'grey',
        data: outflows,
      },
    ],
  }

  return (
    <div className="w-full flex justify-center h-[400px] text-2xl">
      <Chart options={options} type="bar" data={data} />
    </div>
  )
}
