import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Title)
const options = {
  plugins: {
    title: {
      display: true,
      text: 'Expense Breakdown',
      color: '#222',
      position: 'top',
    },
  },
  responsive: true,
}

export const data = {
  labels: ['green', 'grey', 'blue', 'skyblue'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'green',
        'rgb(138,162,178)',
        'rgb(19,106,205)',
        'rgb(120,195,252)',
      ],
      borderWidth: 0,
    },
  ],
}

export function DoughnutChart() {
  return (
    <div className="w-full mt-8 flex justify-center h-[400px] text-2xl">
      <Doughnut options={options} data={data} />
    </div>
  )
}
