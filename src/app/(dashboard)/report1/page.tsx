import React from 'react';
import { mockReports } from '@/mocks';

export default function Report1Page() {
  const report = mockReports[0];

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">{report.title}</h1>
      {report.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-6">{report.description}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Financial Overview</h2>
          <ul className="space-y-2">
            {report.data.revenue !== undefined && (
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
                <span className="font-semibold">${report.data.revenue.toLocaleString()}</span>
              </li>
            )}
            {report.data.expenses !== undefined && (
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Expenses:</span>
                <span className="font-semibold">${report.data.expenses.toLocaleString()}</span>
              </li>
            )}
            {report.data.profit !== undefined && (
              <li className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Profit:</span>
                <span className="font-semibold">${report.data.profit.toLocaleString()}</span>
              </li>
            )}
          </ul>
        </div>
        
        {report.data.customerGrowth !== undefined && (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Growth Metrics</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {report.data.customerGrowth}%
            </p>
            <p className="text-gray-600 dark:text-gray-400">Customer Growth</p>
          </div>
        )}
      </div>

      {report.data.topProducts && report.data.topProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Top Performing Products</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <ul className="space-y-2">
              {report.data.topProducts.map((product, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{product.name}</span>
                  <span className="font-semibold">{product.sales.toLocaleString()} units</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Report generated on {report.date} by {report.author}
      </div>
    </div>
  );
}
