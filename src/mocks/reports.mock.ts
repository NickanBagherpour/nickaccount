import { ReportData } from "@/types/report.type";

export const mockReports: ReportData[] = [
  {
    id: '1',
    title: 'Q2 2023 Financial Summary',
    description: 'Comprehensive financial analysis for the second quarter of 2023',
    date: '2023-07-15',
    author: 'Jane Smith',
    data: {
      revenue: 1250000,
      expenses: 875000,
      profit: 375000,
      customerGrowth: 15.3,
      topProducts: [
        { name: 'Product A', sales: 5200 },
        { name: 'Product B', sales: 4800 },
        { name: 'Product C', sales: 3900 },
      ],
    },
  },
  {
    id: '2',
    title: 'Annual Market Analysis 2023',
    description: 'In-depth analysis of market trends and competitor landscape',
    date: '2023-07-30',
    author: 'John Doe',
    data: {
      revenue: 5200000,
      customerGrowth: 22.7,
      topProducts: [
        { name: 'Service X', sales: 15000 },
        { name: 'Product Y', sales: 12000 },
        { name: 'Product Z', sales: 9800 },
      ],
    },
  },
  {
    id: '3',
    title: 'Customer Satisfaction Survey Results',
    date: '2023-08-10',
    author: 'Emily Johnson',
    data: {
      customerGrowth: 5.2,
    },
  },
];
