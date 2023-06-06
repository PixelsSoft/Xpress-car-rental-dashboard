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
  Title,
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
  Title,
)

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Cash Flow',
      color: '#222',
      position: 'top',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    // y: {
    //   stacked: true,
    // },
  },
  responsive: true,
}

export default function BarChart({ inflow, outflow }) {
  const inflows = inflow.map((obj) => obj.totalAmount)
  const outflows = outflow.map((obj) => Number('-' + obj.totalAmount))
  const netchange = inflow.map(
    (obj, idx) => obj.totalAmount - outflow[idx]?.totalAmount,
  )
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
        label: 'Net Change',
        borderColor: 'black',
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: 'white',
        data: netchange,
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
