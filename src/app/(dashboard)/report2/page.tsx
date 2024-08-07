import React from 'react';
import { mockReports } from '@/mocks';

export default function Report2Page() {
  const report = mockReports[1];

  return (
    <div >
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">{report.title}</h1>
      {report.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-6">{report.description}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {report.data.revenue !== undefined && (
          <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Annual Revenue</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              ${report.data.revenue.toLocaleString()}
            </p>
          </div>
        )}
        {report.data.profit !== undefined && (
          <div className="bg-green-100 dark:bg-green-800 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Annual Profit</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-300">
              ${report.data.profit.toLocaleString()}
            </p>
          </div>
        )}
        {report.data.customerGrowth !== undefined && (
          <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">Customer Growth</h2>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
              {report.data.customerGrowth}%
            </p>
          </div>
        )}
      </div>

      {report.data.topProducts && report.data.topProducts.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Market Share Analysis</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our analysis shows a significant increase in market share across all major product categories.
            The introduction of new products and services has been particularly successful this year.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Top Performing Products/Services</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {report.data.topProducts.map((product, index) => (
              <li key={index}>
                {product.name}: {product.sales.toLocaleString()} units sold
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-md">
        <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">Future Outlook</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Based on current trends and market analysis, we project continued growth in the coming year. 
          Key areas of focus should include expanding our service offerings and investing in emerging markets.
        </p>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Report generated on {report.date} by {report.author}
      </div>
    </div>
  );
}
