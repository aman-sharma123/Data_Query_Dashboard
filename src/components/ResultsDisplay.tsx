import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultsDisplay() {
  const { results, isLoading, error } = useSelector((state: RootState) => state.query);
  const darkMode = useSelector((state: RootState) => state.query.darkMode);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 p-8">
        Enter a query to see results
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Results</h2>
      <div className="h-64">
        <Bar
          data={results.data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  color: darkMode ? '#fff' : '#000',
                },
              },
              title: {
                display: true,
                text: results.query,
                color: darkMode ? '#fff' : '#000',
              },
            },
            scales: {
              x: {
                ticks: {
                  color: darkMode ? '#fff' : '#000',
                },
                grid: {
                  color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
              y: {
                ticks: {
                  color: darkMode ? '#fff' : '#000',
                },
                grid: {
                  color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}