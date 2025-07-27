import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: string;
  title: string;
  unit?: string;
  data: Array<{
    label: string;
    value: number;
  }>;
}

const DynamicChart: React.FC<ChartProps> = ({ type, title, unit = '', data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: title,
        data: data.map(item => item.value),
        backgroundColor: type === 'bar' ? 'rgba(53, 197, 242, 0.8)' : 'rgba(53, 197, 242, 0.2)',
        borderColor: '#35c5f2',
        borderWidth: 2,
        fill: type === 'line',
        tension: type === 'line' ? 0.4 : undefined,
        pointBackgroundColor: '#35c5f2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: type === 'line' ? 6 : undefined,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y}${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#ffffff',
          callback: function(value: any) {
            return `${value}${unit}`;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div className="h-64 w-full">
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default DynamicChart;