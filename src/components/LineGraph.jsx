import React from 'react'
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
import { useRecoilValue } from 'recoil';
import {numoftestSelector} from "../statemanagement/Getatoms"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineGraph = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'center',
      },
      title: {
        display: true,
        text: 'Response Time',
      },
    },
  };
  
  const labels = Array.from({length:useRecoilValue(numoftestSelector)}).map((i,index)=>"Unit_Test_"+ ++index)

  const data = {
    labels,
    datasets: [
      {
        label: 'Response Time',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(0,0,255,0.8)',
      }
    ],
  };
  
  
  return (
    <Line options={options} data={data} />
  )}

export default LineGraph